package baro.baro.global.utils;

import baro.baro.domain.contract.entity.Contract;
import baro.baro.domain.contract.entity.SignatureInformation;
import baro.baro.domain.contract.repository.ContractRepository;
import baro.baro.domain.contract.repository.SignatureInformationRepository;
import baro.baro.global.dto.PdfCreateDto;
import baro.baro.global.exception.CustomException;
import baro.baro.global.s3.PdfS3Service;

import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfSignatureFormField;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.StampingProperties;
import com.itextpdf.kernel.pdf.canvas.parser.PdfTextExtractor;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.AreaBreak;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Tab;
import com.itextpdf.layout.element.TabStop;
import com.itextpdf.layout.property.TabAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.signatures.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Locale;

import static baro.baro.global.statuscode.ErrorCode.NOT_MADE_FROM_BAROBARO;

@Slf4j
@Component
@RequiredArgsConstructor
public class PdfUtils {
	private static final String COMPANY_BASE64_SIGNATURE = "data:image/png;base64,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";
	private static final String BAROBARO_ALIAS = "barobaro";
	private static final String BAROBARO_PASSWORD = "ssafya401";

	private final SignatureInformationRepository signatureInformationRepository;
	private final PdfS3Service pdfS3Service;
	private final CertificateUtils certificateUtils;
	private final String[] units = {
		"", "만", "억", "조", "경"
	};

	private final String[] digits = {
		"영", "일", "이", "삼", "사",
		"오", "육", "칠", "팔", "구"
	};
	// private final PdfFont koreanFont;
	private final ContractRepository contractRepository;

	private String convert2Korean(Long price) {
		if (price == 0) {
			return digits[0]; // "영"
		}

		StringBuilder result = new StringBuilder();
		int unitIndex = 0;

		while (price > 0) {
			long chunk = price % 10000; // 1만 단위로 나눔
			if (chunk > 0) {
				StringBuffer chunkStr = new StringBuffer();
				int digitIndex = 0;

				while (chunk > 0) {
					int digit = (int)(chunk % 10);
					if (digit > 0) {
						chunkStr.insert(0, digits[digit] + (digitIndex > 0 ? units[digitIndex] : ""));
					}
					chunk /= 10;
					digitIndex++;
				}

				result.insert(0, chunkStr + units[unitIndex]);
			}
			price /= 10000;
			unitIndex++;
		}

		return result.toString() + "원"; // "원" 추가
	}

	private String formatNumber(long number) {
		// Locale.US를 사용하여 미국식 천 단위 구분자 사용
		NumberFormat formatter = NumberFormat.getInstance(Locale.US);
		return formatter.format(number);
	}

	private String telFormat(String tel) {
		String First = tel.substring(0, 3);
		String Second = tel.substring(3, 8);
		String Third = tel.substring(8);
		return First + "-" + Second + "-" + Third;
		// return tel;
	}

	public String createPdf(PdfCreateDto pdfCreateDto) throws IOException, GeneralSecurityException {

		ClassPathResource fontResource = new ClassPathResource("PretendardVariable.ttf");
		String fontPath = fontResource.getPath();
		PdfFont koreanFont = PdfFontFactory.createFont(fontPath, "Identity-H",true);
		// 문서 상단에 ID 추가
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		PdfDocument pdfDocument = new PdfDocument(writer);
		Document document = new Document(pdfDocument).setFont(koreanFont);
		String pdfUrl = "";
		try {
			document.add(new Paragraph("문서 ID: " + pdfCreateDto.getDocumentSerialNumber()).setFontSize(10)
				.setTextAlignment(TextAlignment.RIGHT));
			document.add(new Paragraph("임대계약서").setTextAlignment(TextAlignment.CENTER).setFontSize(20));
			document.add(new Paragraph(pdfCreateDto.getOwnerName() + "(이하 ‘갑’이라 함)과(와) " + pdfCreateDto.getRentalName()
				+ "(이하 ‘을’이라 함)과(와) 바로바로(이하 '병'이라 함)은 다음과 같이 임대계약을 체결한다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 1조] 계약의 성립").setFontSize(12));
			if (pdfCreateDto.getProductSerialNumber().trim().isEmpty()) {
				document.add(new Paragraph("① 본 계약에서 대여 제품, 대여비, 대여 기간이라 함은 " + pdfCreateDto.getProductName() + ", " +
					"금 " + convert2Korean(pdfCreateDto.getTotalRentalPrice()) + "(" + formatNumber(
					pdfCreateDto.getTotalRentalPrice()) + "), " +
					pdfCreateDto.getRentalStartDate() + " ~ " + pdfCreateDto.getRentalEndDate() + "으로 진행한다."));
			} else {
				document.add(new Paragraph("① 본 계약에서 대여 제품, 대여비, 대여 기간이라 함은 " + pdfCreateDto.getProductName() +
					"(" + pdfCreateDto.getProductSerialNumber() + "), " +
					"금 " + convert2Korean(pdfCreateDto.getTotalRentalPrice()) + "(" + formatNumber(
					pdfCreateDto.getTotalRentalPrice()) + "), " +
					pdfCreateDto.getRentalStartDate() + " ~ " + pdfCreateDto.getRentalEndDate() + "으로 진행한다."));
			}
			document.add(new Paragraph(
				"②‘갑’은 대여 서비스를 제공하는 선량한 개인으로써 정직하고 책임감 있게 대여 서비스를 제공하여야하며, ‘을’은 대여 서비스를 받는 선량한 개인으로써 대여 제품의 사용 및 책임의 주체가 된다. ‘병’은 대여 서비스만을 중개하는 업체로써, ‘갑’과 ‘을’간의 분쟁 발생 시에 법적 책임을 지지 않는다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 2조] (대여 제품 녹화)").setFontSize(12));
			document.add(new Paragraph(
				"택배로 대여 제품을 반납할 경우, ‘을’은 대여 제품의 점검, 포장, 택배 발송 등의 정황을 CCTV 및 영상기기 등을 활용하여 녹화하고 이를 ‘병’에게 제공해야 한다. ‘병’은 해당 영상을 계약이 종료되고 14일까지 보관할 수 있다. 법적 분쟁 발생 시에 ‘병’에게 증거자료를 요청할 수 있고 ‘병’은 영상 편집하지 않고 원본으로 수사기관 및 사법기관에 제출한다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 3조] (일방적 계약 취소)").setFontSize(12));
			document.add(new Paragraph("""
				①’갑’이 일방적으로 계약을 취소했을 경우에 ’갑’은 ‘을’에게 보상 의무가 있다. 이 때, 대여 기간 시작일을 기준으로 한다.
				7일 전 취소 시, 보상 의무 없음
				3일 전 취소 시, 대여금의 50%
				3일 이후 취소 시, 대여금의 100%
				②‘을’이 일방적으로 계약을 취소했을 경우에 ’을’은 ‘갑’에게 보상 의무가 있다. 이 때, 대여 기간 시작일을 기준으로 한다.
				7일 전 취소 시, 보상 의무 없음
				3일 전 취소 시, 대여금의 50%
				3일 이후 취소 시, 대여금의 100%"
				"""
			));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 4조] (대여 제품 수령 후 하자 발견 및 사용 중 갑작스러운 고장)").setFontSize(12));
			document.add(new Paragraph("""
				①‘을’은 대여 제품을 수령한 당일에 하자 유무를 확인하여야 하며, 하자 발견 즉시 ‘갑’에게 보고를 하고 협의 하에 조치를 취하도록 한다. 단, 하자가 아님에도 물건을 반송한 경우에는 ‘갑’의 과실이 아닌 ‘을’의 과실이므로 반송 과정 중 발생한 비용(택배비나 퀵비용 등)은 ‘갑’이 지불한다. ‘갑’이 제품 수령일에 ‘을’에게 하자에 대한 보고를 하지 않는다면, 정상 제품을 수령한 것으로판단한다.
				②‘을’의 과실이 아닌 상황으로, 갑작스러운 고장으로 인해 사용이 불가능해질 경우 ‘을’은 ‘갑’에게 즉시 해당내용을 알리며 반납조치를 취하고 조기반납으로 인한 일수만큼의 환불을 보장받는다.
				"""
			));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 5조] (수리)").setFontSize(12));
			document.add(new Paragraph(
				"대여 제품 손상 시, 수리는 제조사 또는 공식 수입사의 AS 센터에서 처리하도록 하며 ‘갑’과 ‘을’은 대여 제품을 자체적으로 개조하지 않고 수리하지 않는다. 수리가 진행될 경우, ‘갑’은 ‘을’에게 수리센터에서 발급한 수리비 견적서나 영수증을 제출해야 한다. 이는 ‘갑’, ‘을’ 모두 부정행위를 저지르지 않게 하기 위함이다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 6조] (수리 가능한 수준의 제품 손상 및 부분 분실의 경우)").setFontSize(12));
			document.add(new Paragraph("""
				①‘을’은 대여 제품의 손상 및 부분 분실한 경우, 즉시 ‘갑’에게 보고한다.
				②반납 후 대여 제품의 손상 및 부분 분실이 발견되었을 경우, ‘갑’은 ‘을’에게 보고한다.
				③해당 사안의 경우, ‘을’은 영업손실 비용을 ‘갑’에게 지불한다. 영업손실 비용은 수리비용 또는 분실품 구매 비용과 수리 또는 구매 기간 중 대여료를 합한 비용을 뜻한다.
				"""
			));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 7조] (도난, 분실, 수리불가 수준의 손상의 경우)").setFontSize(12));
			document.add(new Paragraph(
				"‘을’이 대여 제품을 도난, 분실하였거나 수리 불가 수준으로 손상하였을 경우, ‘갑’은 새 제품을 구매하여 대여를 지속하고 ‘을’은 새 제품 구매 비용을 ‘갑’에게 지불한다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 8조] (무단 연체)").setFontSize(12));
			document.add(new Paragraph("①‘을’은 대여 기간 종료 후 " + pdfCreateDto.getOverdueCriteria()
				+ "일 안에 대여 제품을 ‘갑’에게 반환해야 한다. 이를 어길 시에, 대여 기간에 따른 무단 연체료가 발생한다. 무단 연체료는 연체된 날마다 대여 제품 1일 가격의 " +
				pdfCreateDto.getOverdueFee() + "배로 계산한다. 예를 들어, 1일 가격이 1만 5천원일 때, 1일 연체되었을 경우 " + convert2Korean(
				15000L * pdfCreateDto.getOverdueFee()) + "의 연체료가 발생한다.\n" +
				"②무단 연체료는 정상 반납이 될 때까지 부과되는 요금이지만, ‘을’이 무단 연체를 " + pdfCreateDto.getTheftCriteria()
				+ "일 이상 지속할 경우 도난으로 취급하고 새 제품 구매 비용을 청구한다. 이는 새제품 구매 비용보다 연체료가 크게 나오는 것을 방지하기 위함이다.\n" +
				"③‘을’과 연락이 지속되는 경우라도, " + pdfCreateDto.getTheftCriteria()
				+ "일 이상 무단 연체를 지속한다면 해당 사안을 도난으로 취급한다. 이는 ‘을’이 악의적으로 연락만 지속하고 반납을 하지않아 ‘갑’에게 더 큰 영업 손실을 안기는 것을 방지하기 위함이다."

			));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 9조] (청구 비용의 지불)").setFontSize(12));
			document.add(new Paragraph("‘을’은 ‘갑’이 청구한 비용을 청구한 시점 기준 " + pdfCreateDto.getRefundDeadline()
				+ "일 내에 지불해야 한다. ‘을’이 이를 어길 시, ‘갑’은 ‘을’을 민형사상 고소 할 수 있으며 법원에 지불하는 인지대, 송달비 등 도 ‘갑’에게 추가로 청구 할 수 있으며 법정이자 또한 추가로 청구 할 수 있다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 10조] (대여 계약의 종료)").setFontSize(12));
			document.add(new Paragraph("대여 제품이 정상 반납된 것을 ‘갑’이 직접 확인하여야, 대여 과정 자체가 완료된 것이다."));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 11조] (거래 기록 및 데이터 보관)").setFontSize(12));
			document.add(new Paragraph(""));
			document.add(
				new Paragraph("①'병'은 ‘갑’과 ‘을’ 간의 거래 내역을 포함한 데이터(거래 일시, 금액, 계약서 사본 등)를 보관하며, 이는 계약 종료 후 1년 동안 저장된다.\n" +
					"②거래 내역은 법적 분쟁 발생 시 증거로 활용될 수 있으며, 당사자가 요청하는 경우 해당 기록을 제공할 수 있다."
				));
			document.add(new Paragraph(""));
			document.add(new Paragraph("[제 12조] (전자 서명 및 효력)").setFontSize(12));
			document.add(new Paragraph("""
				① 전자 서명 방식
				본 계약은 ‘갑’, ‘을’, 및 ‘병’의 전자 서명으로 체결된다. 전자 서명은 각 당사자가 본 계약서 상의 내용을 충분히 숙지하고 동의하였음을 증명하는 방법으로, 법적 효력을 갖는다. 전자 서명 방식으로는 공인된 전자 서명 시스템 또는 본 플랫폼에서 제공하는 인증 시스템을 사용한다.
				② 서명 절차
				계약 당사자는 본 계약서의 내용을 확인한 후, 전자 서명을 하기 전에 본인 인증 절차를 거쳐야 한다. 본인 인증은 휴대폰 인증, 이메일 인증, 공인 인증서 또는 기타 신뢰할 수 있는 인증 방법으로 진행된다. 서명은 각 당사자가 계약서 확인 후 전자적으로 서명 버튼을 클릭함으로써 완료된다.
				③ 서명 확인 및 보관
				각 당사자가 전자 서명을 완료한 후, 본 계약서는 자동으로 ‘병’이 운영하는 서버에 저장되며, 서명된 계약서의 원본 사본은 ‘갑’과 ‘을’에게 이메일 또는 기타 디지털 방식으로 제공된다. 전자 서명이 완료된 계약서는 수정할 수 없으며, 법적 분쟁 시 증거 자료로 사용될 수 있다.
				④ 전자 서명의 법적 효력
				본 계약서에 사용된 전자 서명은 전자 문서 및 전자 거래 기본법에 의거하여 법적 효력을 가지며, 본 계약서에 서명한 당사자들은 전자 서명이 본인의 서명임을 인정한다. 전자 서명은 자필 서명과 동일한 법적 효력을 가지며, 계약 당사자들은 이를 법적 분쟁 시 증거로 제출할 수 있다.
				"""
			));
			document.add(new Paragraph("[제 13조] (전자 서명 시스템의 안정성)").setFontSize(12));
			document.add(new Paragraph(
				"본 계약에 사용되는 전자 서명 시스템은 안정적이고 신뢰할 수 있는 방식으로 운영되며, 서명 절차 중 발생하는 오류나 문제에 대해서는 ‘병’이 그 시스템의 안정성을 보장한다. 전자 서명 중 발생한 기술적 오류가 있을 경우, ‘갑’, ‘을’은 즉시 ‘병’에게 알리고, 문제를 해결한 후 다시 서명 절차를 진행한다."));

			//페이지 변경
			document.add(new AreaBreak());
			//탭 위치 조정을 통해 콜론들의 세로 정렬 보장
			float tabPosition = 150f;

			document.add(new Paragraph(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일"))));

			//갑
			document.add(new Paragraph()
				.addTabStops(new TabStop(tabPosition, TabAlignment.LEFT))
				.add("(갑) 성명\t: " + pdfCreateDto.getOwnerName())
				.add(new Tab())
				.add("\n연락처\t: " + telFormat(pdfCreateDto.getOwnerTel()))
				.add(new Tab())
				.add("\nE-mail\t: " + pdfCreateDto.getOwnerEmail())
				.add(new Tab())
				.add("\n서명\t: "));

			PdfAcroForm form = PdfAcroForm.getAcroForm(pdfDocument, true);

			PdfSignatureFormField ownerSignatureField = PdfSignatureFormField.createSignature(pdfDocument,
				new Rectangle(100, 670, 50, 30));
			ownerSignatureField.setFieldName("ownerSignature");
			form.addField(ownerSignatureField);

			//을
			document.add(new Paragraph()
				.addTabStops(new TabStop(tabPosition, TabAlignment.LEFT))
				.add("(을) 성명\t: " + pdfCreateDto.getRentalName())
				.add(new Tab())
				.add("\n연락처\t: " + telFormat(pdfCreateDto.getRentalTel()))
				.add(new Tab())
				.add("\nE-mail\t: " + pdfCreateDto.getRentalEmail())
				.add(new Tab())
				.add("\n서명\t: "));

			PdfSignatureFormField rentalSignatureField = PdfSignatureFormField.createSignature(pdfDocument,
				new Rectangle(100, 570, 50, 30));
			rentalSignatureField.setFieldName("rentalSignature");
			form.addField(rentalSignatureField);

			//병
			document.add(new Paragraph()
				.addTabStops(new TabStop(tabPosition, TabAlignment.LEFT))
				.add("(병) 성명\t: 바로바로(주)")
				.add(new Tab())
				.add("\n연락처\t: 010-1234-5678")
				.add(new Tab())
				.add("\nE-mail\t: barobaro@gmail.com")
				.add(new Tab())
				.add("\n서명\t: "));
			PdfSignatureFormField companySignatureField = PdfSignatureFormField.createSignature(pdfDocument,
				new Rectangle(100, 470, 50, 30));
			companySignatureField.setFieldName("companySignature");
			form.addField(companySignatureField);

			document.close();
			//서명하기 위해 불러오기
			ByteArrayOutputStream signedOutputStream = new ByteArrayOutputStream();
			PdfReader pdfReader = new PdfReader(new ByteArrayInputStream(byteArrayOutputStream.toByteArray()));
			PdfSigner signer = new PdfSigner(pdfReader, signedOutputStream, new StampingProperties().useAppendMode());

			//바로바로 측 PrivateKey,인증서 가져오기
			PrivateKey companyPK = certificateUtils.getPrivateKey(BAROBARO_ALIAS, BAROBARO_PASSWORD);
			Certificate companyCertificate = certificateUtils.getCertificate(BAROBARO_ALIAS);

			signer.setFieldName("companySignature");

			PdfSignatureAppearance appearance = signer.getSignatureAppearance();
			// 서명 이미지 추가
			appearance.setRenderingMode(PdfSignatureAppearance.RenderingMode.GRAPHIC);
			ImageData imageData = convertBase64ToPngImage(COMPANY_BASE64_SIGNATURE);
			appearance.setSignatureGraphic(imageData);

			//전자서명 추가
			PrivateKeySignature pkSignature = new PrivateKeySignature(companyPK, DigestAlgorithms.SHA256, "BC");
			IExternalDigest digest = new BouncyCastleDigest();
			Certificate[] certificateChain = new Certificate[] {companyCertificate};
			signer.signDetached(digest, pkSignature, certificateChain,
				null, null, null, 0, PdfSigner.CryptoStandard.CMS);

			//파일 byteArray 화
			//        byte[] pdfBytes = signedOutputStream.toByteArray();
			byte[] pdfBytes = signedOutputStream.toByteArray();
			signedOutputStream.close();
			byteArrayOutputStream.close();

			pdfUrl = pdfS3Service.upload(pdfBytes);
		} finally {
			if (document != null) {
				document.close();
			}
			if (pdfDocument != null) {
				pdfDocument.close();
			}
			if (writer != null) {
				writer.close();
			}
		}

		return pdfUrl;
	}

	/**
	 * @param s3FileUrl          pdf 가 저장된 s3주소
	 * @param signatureFieldName 서명할 필드 이름. ownerSignature / rentalSignature 로 구분
	 * @param privateKey         서명하는 사람의 privateKey 값
	 * @param certificate        서명하는 사람의 인증서.
	 * @param imageData          서명 이미지데이터(ImageData 포맷)
	 * @return 서명된 pdf 파일을 접근 가능한 s3 url
	 */
	public String signPdfAndSave(String s3FileUrl, String signatureFieldName, PrivateKey privateKey,
		X509Certificate certificate, ImageData imageData) throws IOException, GeneralSecurityException {
		String s3FileName = s3FileUrl.substring(s3FileUrl.lastIndexOf("/") + 1);
		InputStream pdfInputStream = pdfS3Service.download(s3FileName);
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfSigner signer = new PdfSigner(new PdfReader(pdfInputStream), new PdfWriter(byteArrayOutputStream),
			new StampingProperties().useAppendMode());

		//서명할 필드네임 설정.
		//이미 있는 필드네임이며, 해당 필드에 서명이 이미 있는 경우 -> 에러 발생
		//이미 있는 필드네임이며, 해당 필드에 서명이 없는 경우 -> 해당 필드에 서명 진행
		//없는 필드네임이며, 해당 필드에 서명이 없는 경우 -> 필드 생성 및 서명 진행
		signer.setFieldName(signatureFieldName);
		PdfSignatureAppearance appearance = signer.getSignatureAppearance();
		// 서명 이미지 추가
		appearance.setRenderingMode(PdfSignatureAppearance.RenderingMode.GRAPHIC);
		appearance.setSignatureGraphic(imageData);

		// 서명 추가
		PrivateKeySignature pkSignature = new PrivateKeySignature(privateKey, "SHA-256", "BC");

		IExternalDigest digest = new BouncyCastleDigest();
		Certificate[] certificateChain = new Certificate[] {certificate};

		signer.signDetached(digest, pkSignature, certificateChain,
			null, null, null, 0, PdfSigner.CryptoStandard.CMS);
		byte[] pdfBytes = byteArrayOutputStream.toByteArray();
		if (pdfInputStream != null) {
			pdfInputStream.close();
		}
		return pdfS3Service.upload(pdfBytes);
	}

	/**
	 * @param s3FileName         기존 s3에 저장된 keyName
	 * @param signatureFieldName 서명할 필드 이름. ownerSignature / rentalSignature 로 구분
	 * @param privateKey         서명하는 사람의 privateKey 값
	 * @param certificate        서명하는 사람의 인증서.
	 * @param base64Image        서명 이미지데이터(base64 포맷)
	 * @return 서명된 pdf 파일을 접근 가능한 s3 url
	 */
	public String signPdfAndSaveUsingBase64Signature(String s3FileName, String signatureFieldName,
		PrivateKey privateKey, X509Certificate certificate, String base64Image) throws
		IOException,
		GeneralSecurityException {
		ImageData imgData = convertBase64ToPngImage(base64Image);
		return signPdfAndSave(s3FileName, signatureFieldName, privateKey, certificate, imgData);
	}

	public static ImageData convertBase64ToPngImage(String base64Image) {
		String prefixRemovedBase64 = base64Image.split(",")[1];
		byte[] imageBytes = Base64.getDecoder().decode(prefixRemovedBase64);
		return ImageDataFactory.create(imageBytes);
	}

	public boolean verifySignatures(String pdfPath) throws Exception {
		// 서명 검증을 위한 PDF 문서 열기
		String s3FileName = pdfPath.substring(pdfPath.lastIndexOf("/") + 1);
		InputStream pdfInputStream = pdfS3Service.download(s3FileName);
		PdfDocument pdfDocument = new PdfDocument(new PdfReader(pdfInputStream));

		// 서명 유틸리티 생성
		SignatureUtil signatureUtil = new SignatureUtil(pdfDocument);

		// PDF 문서의 모든 서명 필드 가져오기
		List<String> signatureNames = signatureUtil.getSignatureNames();

		// 각 서명 필드를 순차적으로 검증
		for (String name : signatureNames) {
			// 서명 객체 가져오기
			PdfPKCS7 pkcs7 = signatureUtil.verifySignature(name);
			System.out.println(name);

			// 서명이 유효한지 확인
			boolean isSignatureValid = pkcs7.verifySignatureIntegrityAndAuthenticity();
			if (!isSignatureValid) {
				System.out.println("서명이 유효하지 않습니다: " + name);
				return false;
			}

			// 서명한 인증서 확인
			Certificate[] certificates = pkcs7.getSignCertificateChain();
			X509Certificate signingCertificate = (X509Certificate)certificates[0];
			System.out.println("서명자: " + signingCertificate.getSubjectDN());
		}
		pdfDocument.close();
		System.out.println("모든 서명이 유효합니다.");
		return true;
	}

	public boolean verifySignatures(MultipartFile file) throws Exception {
		// 서명 검증을 위한 PDF 문서 열기

		PdfReader reader = new PdfReader(file.getInputStream());
		PdfDocument pdfDocument = new PdfDocument(reader);
		String documentId = "";
		String firstPageText = PdfTextExtractor.getTextFromPage(pdfDocument.getPage(1));

		documentId = extractDocumentId(firstPageText);
		SignatureUtil signatureUtil = new SignatureUtil(pdfDocument);
		Contract contract = contractRepository.findByInitialDocumentSerialNum(documentId)
			.orElseThrow(() -> new CustomException(NOT_MADE_FROM_BAROBARO));
		List<SignatureInformation> signatureInformations = signatureInformationRepository.findByContractId(
			contract.getId());
		List<String> names = List.of(new String[] {"companySignature", "ownerSignature", "rentalSignature"});
		for (String name : names) {
			PdfPKCS7 pkcs7;
			try {
				pkcs7 = signatureUtil.readSignatureData(name);
			} catch (Exception e) {
				throw new CustomException(NOT_MADE_FROM_BAROBARO);
			}

			boolean isVerified = pkcs7.verifySignatureIntegrityAndAuthenticity();
			if (!isVerified) {
				throw new CustomException(NOT_MADE_FROM_BAROBARO);
			}

			Certificate[] certificates = pkcs7.getSignCertificateChain();
			X509Certificate signCert = (X509Certificate)certificates[0];
			signatureInformations.stream()
				.filter(signatureInformation -> {
					Long memberId = signatureInformation.getMemberId();
					try {
						X509Certificate certificate = certificateUtils.getCertificate(Long.toString(memberId));
						// signCert와 일치하는지 확인
						return signCert.equals(certificate);
					} catch (Exception e) {
						throw new CustomException(NOT_MADE_FROM_BAROBARO);
					}
				})
				.findFirst()
				.orElseThrow(() -> new CustomException(NOT_MADE_FROM_BAROBARO));
		}
		if (pdfDocument != null) {
			pdfDocument.close();
		}
		if (reader != null) {
			reader.close();
		}
		return true;
	}

	private static String extractDocumentId(String text) {
		// 문서 ID가 "문서 ID: " 뒤에 있다고 가정하고 추출
		String prefix = "문서 ID: ";
		if (text.contains(prefix)) {
			int startIndex = text.indexOf(prefix) + prefix.length();
			int endIndex = text.indexOf("\n", startIndex); // 다음 줄로 끝나는 경우
			if (endIndex == -1) { // 다음 줄이 없으면 끝까지 읽음
				endIndex = text.length();
			}
			return text.substring(startIndex, endIndex).trim();
		}
		return null; // 문서 ID를 찾지 못한 경우
	}

}
