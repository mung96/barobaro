package baro.baro.domain.contract.service;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.entity.RentalStatus;
import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.contract.dto.ContractApplicationDto;
import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractApproveReq;
import baro.baro.domain.contract.dto.request.ProductTakeBackReq;
import baro.baro.domain.contract.dto.request.SignatureAddReq;
import baro.baro.domain.contract.dto.response.*;
import baro.baro.domain.contract.entity.Contract;
import baro.baro.domain.contract.entity.SignatureInformation;
import baro.baro.domain.contract.repository.ContractRepository;
import baro.baro.domain.contract.repository.SignatureInformationRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.entity.Pin;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.member.repository.PinRepository;
import baro.baro.domain.noti.entity.NotiType;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.entity.ProductStatus;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.dto.PdfCreateDto;
import baro.baro.global.event.FcmEvent;
import baro.baro.global.event.UnlockEvent;
import baro.baro.global.exception.CustomException;
import baro.baro.global.s3.PdfS3Service;
import baro.baro.global.utils.CertificateUtils;
import baro.baro.global.utils.PdfUtils;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.*;
import java.security.cert.X509Certificate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static baro.baro.domain.contract.validator.ContractValidator.validateContractRequestDto;
import static baro.baro.global.statuscode.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

	private final RedisUtils redisUtils;
	private final ApplicationEventPublisher eventPublisher;
	private final ChatRoomRepository chatRoomRepository;
	private final ContractRepository contractRepository;
	private final PinRepository pinRepository;
	private final PdfUtils pdfUtils;
	private final CertificateUtils certificateUtils;
	private final MemberRepository memberRepository;
	private final PdfS3Service pdfS3Service;
	private final SignatureInformationRepository signatureInformationRepository;

	@Transactional
	public void addContractRequest(ContractRequestDto contractRequestDto, Long rentalId) {

		//유효하지 않은 날짜, 유효하지 않은 ReturnType 검증
		validateContractRequestDto(contractRequestDto);

		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(contractRequestDto.getChatRoomId())
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//채팅방의 참여자가 아님
		if (!Objects.equals(chatRoom.getRental().getId(), rentalId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		//분산락 획득
		if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
			throw new CustomException(CONFLICT_WITH_OTHER);
		}

		//다른 사람 간에 진행중인 계약이 존재
		Contract contract = product.getContract();

		if (contract != null || !product.getProductStatus().equals(ProductStatus.AVAILABLE)) {
			throw new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS);
		}

		//해당 채팅방 거래 상태 업데이트
		chatRoom.updateRentalStatus(RentalStatus.APPLICATION);

		//레디스에 거래 정보 집어넣기
		ContractApplicationDto contractApplicationDto = ContractApplicationDto.builder()
			.chatRoomId(chatRoom.getId())
			.rentalId(rentalId)
			.ownerId(product.getMember().getId())
			.productId(product.getId())
			.desiredStartDate(contractRequestDto.getDesiredStartDate())
			.desiredEndDate(contractRequestDto.getDesiredEndDate())
			.returnType(ReturnType.valueOf(contractRequestDto.getReturnType())).build();
		redisUtils.addListData("contract_" + product.getId(), contractApplicationDto); //거래정보);

		eventPublisher.publishEvent(new FcmEvent(this, chatRoom.getRental(), chatRoom.getOwner(),
			NotiType.CONTRACT_REQUEST, "새로운 계약 요청이 있어요!", "님이 계약 요청을 하셨습니다."));
		//분산락 풀기. Transaction 내부에 unlock이 있을 경우, 동시성 이슈 발생 가능.
		//after_completion을 통해 트랜젝션이 종료된 후, 락 해제를 보장
		eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));
	}

	@Transactional(readOnly = true)
	public ContractRequestDto findContractRequestDetail(Long chatRoomId, Long ownerId) {

		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//채팅방의 참여자가 아님
		if (!Objects.equals(chatRoom.getOwner().getId(), ownerId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		List<Object> contractRequestList = redisUtils.getListData("contract_" + product.getId());

		//redis에서 ContractRequest 못찾을 때
		ContractApplicationDto contractApplicationDto = contractRequestList.stream()
			.map(item -> (ContractApplicationDto)item)
			.filter(contractRequest -> contractRequest.getChatRoomId().equals(chatRoomId))
			.findFirst()
			.orElseThrow(() -> new CustomException(CONTRACT_REQUEST_NOT_FOUND));

		return ContractRequestDto.from(contractApplicationDto);
	}

	@Transactional(readOnly = true)
	public ContractOptionDetailRes findContractOptionDetail(Long chatRoomId, Long memberId) {

		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//채팅방의 참여자가 아님
		if (!Objects.equals(chatRoom.getRental().getId(), memberId)
			&& !Objects.equals(chatRoom.getOwner().getId(), memberId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		boolean isUsingContract = product.getContractCondition() != null;

		ContractOptionDetailRes contractOptionDetailRes;

		if (isUsingContract) { //전자계약서 작성한 경우
			ContractConditionDto contractConditionDto = ContractConditionDto.toDto(product.getContractCondition());
			contractOptionDetailRes = ContractOptionDetailRes.builder()
				.isWriteContract(true)
				.returnTypes(product.getReturnTypes())
				.contractCondition(contractConditionDto)
				.build();

		} else { //전자계약서 작성하지 않은 경우
			contractOptionDetailRes = ContractOptionDetailRes.builder()
				.isWriteContract(false)
				.returnTypes(product.getReturnTypes())
				.contractCondition(null)
				.build();
		}

		return contractOptionDetailRes;
	}

	@Transactional
	public ContractApproveRes approveRequestWithContract(ContractApproveReq contractApproveReq, Long ownerId) {
		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(contractApproveReq.getChatRoomId())
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//대여물품 소유자가 아님
		if (!Objects.equals(chatRoom.getOwner().getId(), ownerId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		//분산락 획득
		if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
			throw new CustomException(CONFLICT_WITH_OTHER);
		}

		//이미 해당 상품에 진행중인 계약이 있음
		Contract contract = product.getContract();

		if (contract != null) {
			if (contract.getRental().getId().equals(chatRoom.getRental().getId())) {
				return ContractApproveRes.builder()
					.chatRoomId(contractApproveReq.getChatRoomId())
					.fileUrl(contract.getContractUrl())
					.build();
			}
			if (!product.getProductStatus().equals(ProductStatus.AVAILABLE)) {
				throw new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS);
			}
		}

		//계약 요청을 찾을 수 없는 경우 처리
		ContractApplicationDto contractApplicationDto = redisUtils.getListData("contract_" + product.getId())
			.stream()
			.map(item -> (ContractApplicationDto)item)
			.filter(contractRequest ->
				contractRequest.getChatRoomId()
					.equals(contractApproveReq.getChatRoomId())
			)
			.findFirst()
			.orElseThrow(() -> new CustomException(CONTRACT_REQUEST_NOT_FOUND));

		ContractApproveRes result;

		if(product.getContractCondition() == null) {

			if (!product.getProductStatus().equals(ProductStatus.AVAILABLE)) {
				throw new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS);
			}

			//상품 대여 상태 업데이트
			product.updateProductStatus(ProductStatus.APPROVED);

			chatRoom.updateRentalStatus(RentalStatus.APPROVED);

			redisUtils.deleteData("contract_" + product.getId());

			result = ContractApproveRes.builder()
					.chatRoomId(contractApproveReq.getChatRoomId())
					.fileUrl(null)
					.build();
		}
		else {

            //상품 대여 상태 업데이트
			product.updateProductStatus(ProductStatus.IN_PROGRESS);

			//채팅방의 거래 상태 업데이트
			chatRoom.updateRentalStatus(RentalStatus.NEED_OWNER_SIGN);

			//내 정보 불러오기
			Member me = chatRoom.getOwner();

			//상대 정보 불러오기
			Member opponent = chatRoom.getRental();

			String generatedS3PdfUrl;
			String uuid = UUID.randomUUID().toString();
			try {
				PdfCreateDto pdfCreateDto = PdfCreateDto.toDto(contractApproveReq.getChatRoomId(),
						uuid, me, opponent, product, contractApplicationDto, product.getContractCondition());
				generatedS3PdfUrl = pdfUtils.createPdf(pdfCreateDto);
				log.info(generatedS3PdfUrl);
			} catch (Exception e) {
				log.info(Arrays.toString(e.getStackTrace()));
				log.info("에러에러" + e.getMessage());
				throw new CustomException(PDF_GENERATE_FAILED);
			}
			log.info("여기까지 잘 들옴 ㅇㅇ");
			LocalDateTime lastModified = pdfS3Service.lastModified(generatedS3PdfUrl);
			log.info("lastModified 성공");
			Contract newContract = Contract.builder()
					.product(product)
					.createdAt(lastModified)
					.contractUrl(generatedS3PdfUrl)
					.rental(chatRoom.getRental())
					.build();

			contractRepository.save(newContract);

			log.info("계약 생성완료");

			result = ContractApproveRes.builder()
					.chatRoomId(contractApproveReq.getChatRoomId())
					.fileUrl(generatedS3PdfUrl)
					.build();
		}

		eventPublisher.publishEvent(new FcmEvent(this, chatRoom.getOwner(), chatRoom.getRental(),
				NotiType.CONTRACT_ACCEPTANCE, "계약 요청이 수락되었습니다!", "님이 계약 요청을 수락하셨습니다."));
		//분산락 해제
		eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));

		return result;
	}

//	@Transactional
//	public ContractApproveRes approveRequestWithoutContract(ContractApproveReq contractApproveReq, Long ownerId) {
//		//존재하지 않는 채팅방
//		ChatRoom chatRoom = chatRoomRepository.findById(contractApproveReq.getChatRoomId())
//			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));
//
//		//대여물품 소유자가 아님
//		if (!Objects.equals(chatRoom.getOwner().getId(), ownerId)) {
//			throw new CustomException(CHATROOM_NOT_ENROLLED);
//		}
//
//		Product product = chatRoom.getProduct();
//
//		//상품이 존재하지 않음
//		if (product == null) {
//			throw new CustomException(PRODUCT_NOT_FOUND);
//		}
//
//		//분산락 획득
//		if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
//			throw new CustomException(CONFLICT_WITH_OTHER);
//		}
//
//		if (!product.getProductStatus().equals(ProductStatus.AVAILABLE)) {
//			throw new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS);
//		}
//
//		//계약 요청을 찾을 수 없는 경우 처리
//		ContractApplicationDto contractApplicationDto = redisUtils.getListData("contract_" + product.getId())
//			.stream()
//			.map(item -> (ContractApplicationDto)item)
//			.filter(contractRequest ->
//				contractRequest.getChatRoomId()
//					.equals(contractApproveReq.getChatRoomId())
//			)
//			.findFirst()
//			.orElseThrow(() -> new CustomException(CONTRACT_REQUEST_NOT_FOUND));
//
//		//상품 대여 상태 업데이트
//		product.updateProductStatus(ProductStatus.APPROVED);
//
//		//채팅방의 거래 상태 업데이트
//		chatRoom.updateRentalStatus(RentalStatus.APPROVED);
//
//		redisUtils.deleteData("contract_" + product.getId());
//
//		eventPublisher.publishEvent(new FcmEvent(this, chatRoom.getOwner(), chatRoom.getRental(),
//			NotiType.CONTRACT_ACCEPTANCE, "계약 요청이 수락되었습니다!", "님이 계약 요청을 수락하셨습니다."));
//		eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));
//
//	}

	@Transactional
	public String generatePdf(PdfCreateDto pdfCreateDto) {
		String generatedS3PdfUrl;
		try {
			generatedS3PdfUrl = pdfUtils.createPdf(pdfCreateDto);
		} catch (Exception e) {
			log.info(Arrays.toString(e.getStackTrace()));
			log.info("에러에러" + e.getMessage());
			throw new CustomException(PDF_GENERATE_FAILED);
		}
		return generatedS3PdfUrl;
	}

	public ContractSignedRes addOwnerSignature(SignatureAddReq signatureAddReq, Long ownerId) {

		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(signatureAddReq.getChatRoomId())
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//대여물품 소유자가 아님
		if (!Objects.equals(chatRoom.getOwner().getId(), ownerId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		//pin이 설정되지 않거나 유효하지 않은 경우
		Pin pin = pinRepository.findByMemberId(ownerId)
			.orElseThrow(() -> new CustomException(PIN_NOT_FOUND));

		if (!pin.getPinNumber().equals(signatureAddReq.getPinNumber())) {
			throw new CustomException(NOT_VALID_PIN_NUMBER);
		}

		//분산락 획득
		if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
			throw new CustomException(CONFLICT_WITH_OTHER);
		}

		//이미 해당 상품에 진행중인 계약이 없음
		Contract contract = product.getContract();

		if (contract == null || !chatRoom.getRentalStatus().equals(RentalStatus.NEED_OWNER_SIGN)
			|| !product.getProductStatus().equals(ProductStatus.IN_PROGRESS)) {
			throw new CustomException(CONTRACT_NOT_FOUND);
		}

		PrivateKey ownerPk;
		try {
			ownerPk = certificateUtils.getPrivateKey(Long.toString(ownerId), pin.getKeystorePassword());
		} catch (UnrecoverableKeyException | KeyStoreException | NoSuchAlgorithmException e) {
			throw new CustomException(PRIVATE_KEY_EXCEPTION);
		}

		X509Certificate ownerCert;
		try {
			ownerCert = certificateUtils.getCertificate(Long.toString(ownerId));
		} catch (KeyStoreException e) {
			throw new CustomException(CERTIFICATE_EXCEPTION);
		}

		String signedPdfUrl;
		try {
			signedPdfUrl = pdfUtils.signPdfAndSaveUsingBase64Signature(signatureAddReq.getS3FileUrl(), "ownerSignature",
				ownerPk, ownerCert, signatureAddReq.getSignatureData());
		} catch (IOException | GeneralSecurityException e) {
			throw new CustomException(EXCEPTION_DURING_SIGNING);
		}
		LocalDateTime signedAt = pdfS3Service.lastModified(signedPdfUrl.substring(signedPdfUrl.lastIndexOf("/") + 1));
		//채팅방의 거래 상태 업데이트. 상품 상태의 경우, 소유자의 서명과 함께 업데이트됨.
		chatRoom.updateRentalStatus(RentalStatus.OWNER_SIGNED);

		//signature_information테이블에 서명정보 추가
		SignatureInformation signatureInformation = SignatureInformation.builder()
			.contract(contract)
			.memberId(ownerId)
			.signedAt(signedAt)
			.build();
		signatureInformationRepository.save(signatureInformation);

		contract.updateContractUrl(signedPdfUrl);
		contractRepository.save(contract);

		//redis 에서 계약 요청들 삭제
		redisUtils.deleteData("contract_" + product.getId());

		eventPublisher.publishEvent(new FcmEvent(this, chatRoom.getOwner(), chatRoom.getRental(),
			NotiType.SIGNATURE_REQUEST, "계약서 서명 요청이 있습니다!", "님이 계약서 서명을 요청하셨습니다."));
		//분산락 해제
		eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));
		return ContractSignedRes.builder()
			.chatRoomId(signatureAddReq.getChatRoomId())
			.fileUrl(signedPdfUrl)
			.signedAt(signedAt)
			.build();
	}

	public ContractSignedRes addRentalSignature(final SignatureAddReq signatureAddReq, final Long rentalId) {
		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(signatureAddReq.getChatRoomId())
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//채팅 참여자가 아님
		if (!Objects.equals(chatRoom.getRental().getId(), rentalId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		//pin이 설정되지 않거나 유효하지 않은 경우
		Pin pin = pinRepository.findByMemberId(rentalId)
			.orElseThrow(() -> new CustomException(PIN_NOT_FOUND));
		if (!pin.getPinNumber().equals(signatureAddReq.getPinNumber())) {
			throw new CustomException(NOT_VALID_PIN_NUMBER);
		}

		//분산락 획득
		if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
			throw new CustomException(CONFLICT_WITH_OTHER);
		}

		//이미 해당 상품에 진행중인 계약이 없음
		Contract contract = product.getContract();

		if (contract == null || !chatRoom.getRentalStatus().equals(RentalStatus.OWNER_SIGNED)
			|| !product.getProductStatus().equals(ProductStatus.IN_PROGRESS)) {
			throw new CustomException(CONTRACT_NOT_FOUND);
		}

		PrivateKey rentalPk;

		try {
			rentalPk = certificateUtils.getPrivateKey(Long.toString(rentalId), pin.getKeystorePassword());
		} catch (UnrecoverableKeyException | KeyStoreException | NoSuchAlgorithmException e) {
			throw new CustomException(PRIVATE_KEY_EXCEPTION);
		}

		X509Certificate rentalCert;
		try {
			rentalCert = certificateUtils.getCertificate(Long.toString(rentalId));
		} catch (KeyStoreException e) {
			throw new CustomException(CERTIFICATE_EXCEPTION);
		}

		String signedPdfUrl;
		try {
			signedPdfUrl = pdfUtils.signPdfAndSaveUsingBase64Signature(signatureAddReq.getS3FileUrl(),
				"rentalSignature", rentalPk, rentalCert, signatureAddReq.getSignatureData());
		} catch (IOException | GeneralSecurityException e) {
			throw new CustomException(EXCEPTION_DURING_SIGNING);
		}
		LocalDateTime signedAt = pdfS3Service.lastModified(signedPdfUrl.substring(signedPdfUrl.lastIndexOf("/") + 1));
		//채팅방의 거래 상태 업데이트. 상품 상태의 경우, 소유자의 서명과 함께 업데이트됨.
		chatRoom.updateRentalStatus(RentalStatus.APPROVED);
		product.updateProductStatus(ProductStatus.APPROVED);

		//signature_information테이블에 서명정보 추가
		SignatureInformation signatureInformation = SignatureInformation.builder()
			.contract(contract)
			.memberId(rentalId)
			.signedAt(signedAt)
			.build();
		signatureInformationRepository.save(signatureInformation);
		contract.updateContractUrl(signedPdfUrl);
		contractRepository.save(contract);
		eventPublisher.publishEvent(new FcmEvent(this, chatRoom.getRental(), chatRoom.getOwner(),
			NotiType.SIGNATURE_REQUEST, "계약서 서명이 완료되었습니다.", "님이 계약서 서명을 완료했습니다."));
		//분산락 해제
		eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));
		return ContractSignedRes.builder()
			.chatRoomId(signatureAddReq.getChatRoomId())
			.fileUrl(signedPdfUrl)
			.signedAt(signedAt)
			.build();
	}

	public ContractTerminatedRes confirmProductTakeBack(ProductTakeBackReq productTakeBackReq, Long ownerId) {
		//존재하지 않는 채팅방
		ChatRoom chatRoom = chatRoomRepository.findById(productTakeBackReq.getChatRoomId())
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		//채팅 참여자가 아님
		if (!Objects.equals(chatRoom.getRental().getId(), ownerId)) {
			throw new CustomException(CHATROOM_NOT_ENROLLED);
		}

		Product product = chatRoom.getProduct();

		//상품이 존재하지 않음
		if (product == null) {
			throw new CustomException(PRODUCT_NOT_FOUND);
		}

		//분산락 획득
		if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
			throw new CustomException(CONFLICT_WITH_OTHER);
		}

		//이미 해당 상품에 진행중인 계약이 없음
		Contract contract = product.getContract();

		if (contract == null || !chatRoom.getRentalStatus().equals(RentalStatus.APPROVED) || !product.getProductStatus()
			.equals(ProductStatus.APPROVED)) {
			throw new CustomException(CONTRACT_NOT_FOUND);
		}

		//채팅방의 거래 상태 업데이트. 상품 상태의 경우, 소유자의 서명과 함께 업데이트됨.
		chatRoom.updateRentalStatus(RentalStatus.FINISH);
		product.updateProductStatus(ProductStatus.FINISH);

		eventPublisher.publishEvent(new FcmEvent(this, chatRoom.getOwner(), chatRoom.getRental(),
			NotiType.RECEIPT_CONFIRMATION, "물품 수령확인이 완료되었습니다.", "님이 물품 수령확인을 하셨습니다."));
		//분산락 해제
		eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));

		return ContractTerminatedRes.builder()
			.chatRoomId(productTakeBackReq.getChatRoomId())
			.build();
	}

	@Override
	public PresentPdfRes findPresentPdf(Long chatRoomId, Long memberId) {
		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

		if (chatRoom.getProduct().getContract() == null) {
			throw new CustomException(CONTRACT_NOT_FOUND);
		}

		if (!chatRoom.getOwner().getId().equals(memberId) ||
			!chatRoom.getRental().getId().equals(memberId)) {
			throw new CustomException(PDF_NOT_MINE);
		}

		return new PresentPdfRes(chatRoom.getProduct().getContract().getContractUrl());
	}

}
