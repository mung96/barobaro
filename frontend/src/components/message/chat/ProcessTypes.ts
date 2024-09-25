const ProcessTypes = {
  // 거래 진행 프로세스

  CONTACT: 1, // 거래 진행 중이 아님
  REQUESTED: 2, // 대여자가 거래 요청을 보냄
  MODIFIED: 3, // 소유자가 계약 조건을 수정함 (선택)
  ACCEPTED_DIRECT: 4, // 소유자가 계약을 수락함 (직거래)
  ACCEPTED_PACK: 5, // 소유자가 계약을 수락함 (택배거래)
  SIGNED_DIRECT: 6, // 대여자가 서명함 (직거래)
  SIGNED_PACK: 7, // 대여자가 서명함 (택배거래)
  RECEIVED_DIRECT: 8, // 대여자가 물품 수령 확인함 (직거래)
  RECEIVED_PACK: 9, // 대여자가 물품 수령 확인함 (택배거래)
  PAID_DIRECT: 10, // 대여자가 송금함 (직거래)
  PAID_PACK: 11, // 대여자가 송금함 (택배거래)
  FINISHED: 12, // 소유자가 물품 수령 확인함 (거래가 종료됨)
};

export default ProcessTypes;
