import { ContractConditionRequest } from '@/types/apis/productRequest';

type Props = {
  onNext: (data: ContractConditionRequest) => void;
  onPrev: () => void;
};

function ContractInfoInput({ onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col">
      <h2>게시글 등록 두번째 스탭</h2>
      <button type="button" onClick={() => onPrev()}>
        이전 스탭으로 가기
      </button>
      <button
        type="button"
        onClick={() =>
          onNext({
            productName: '',
            serialNumber: '',
            repairVendor: '',
            overdueCriteria: 0,
            overdueFee: 0,
            theftCriteria: 0,
            refundDeadline: 0,
          })
        }
      >
        다음 스탭으로 가기
      </button>
    </div>
  );
}

export default ContractInfoInput;
