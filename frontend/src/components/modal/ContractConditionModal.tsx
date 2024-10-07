import ReactModal from 'react-modal';

type ContractCondition = {
  repairVendor: string; // 수리업체
  overdueCriteria: number; // 연체기준
  overdueFee: number; // 연체비용
  theftCriteria: number; // 무단연체 기준
  refundDeadline: number; // 환불 기한?
};

type ResponseType = {
  isWriteContact: boolean; // 계약서 작성 여부
  returnTypes: string[]; // 반납 희망 방법
  detailConditions: ContractCondition;
};

const detailTempValue: ContractCondition = {
  repairVendor: '제조사 또는 공식 수입사의 AS 센터',
  overdueCriteria: 5,
  overdueFee: 6,
  theftCriteria: 7,
  refundDeadline: 8,
};
const tempValue: ResponseType = {
  detailConditions: detailTempValue,
  isWriteContact: true,
  returnTypes: ['direct', 'delivery'],
};

// props로 받지 말고, axios로 받아서 타입 매치

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // 어두운 배경
    zIndex: 1000, // 다른 요소 위에 오도록 설정
  },
  content: {
    position: 'absolute',
    top: '50%', // 수직 중앙
    left: '50%', // 수평 중앙
    transform: 'translate(-50%, -50%)', // 모달을 자신의 크기만큼 위로 및 왼쪽으로 이동
    width: '320px',
    height: '320px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
  },
};

type ContractConditionModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
};
const ContractConditionModal = ({
  isOpen,
  onRequestClose,
}: ContractConditionModalParams) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="contractCondition"
      ariaHideApp={false}
      style={modalStyle}
    >
      {/* 모달 전체 감싸는 태그 */}
      <div className="flex flex-col ">
        <div className="font-bold self-center mb-[1.5vh]">계약 상세 조건</div>
        <div className="bg-gray-400 flex flex-col rounded-xl mb-[1.5vh] p-3">
          <div className="text-black-100 text-sm">전자계약서 작성 여부</div>
          <div className="text-gray-300 text-xs">
            전자계약서 작성 {tempValue.isWriteContact ? 'O' : 'X'}
          </div>
          {/* 물품손상 텍스트 300, 배경 500  */}
          <div className="text-black-100 text-sm">반납 희망 방법</div>
          <div className="text-gray-300 text-xs">
            {tempValue.returnTypes.join(', ')}
          </div>

          <div className="text-black-100 text-sm">계약 조건</div>

          <div className="text-gray-300 bg-gray-500 text-sm rounded-2xl text-center w-[30%] p-0.5 ml-[2vw]">
            물품 손상
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col ml-[2vw] max-w-[45%]">
              <div className="text-gray-300 text-sm">수리 업체</div>
              <div className="text-black-100 text-xs">
                {tempValue.detailConditions.repairVendor}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-gray-300 text-sm">청구 비용</div>
              <div className="text-black-100 text-xs">
                청구 시점 기준 {tempValue.detailConditions.overdueFee}일 이내
                지급
              </div>
            </div>
          </div>

          <div className="text-gray-300 bg-gray-500 text-sm rounded-2xl text-center w-[30%] p-0.5 ml-[2vw]">
            무단 연체
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col ml-[2vw] max-w-[45%]">
              <div className="text-gray-300 text-sm">기준</div>
              <div className="text-black-100 text-xs">
                대여 기간 종료 후 {tempValue.detailConditions.theftCriteria}일
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-gray-300 text-sm">가격</div>
              <div className="text-black-100 text-xs">
                대여 제품 1일 가격의 {tempValue.detailConditions.overdueFee}배
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="  bg-blue-100 rounded-xl text-white pt-2 pb-2 w-[55%]"
            onClick={onRequestClose}
          >
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ContractConditionModal;
