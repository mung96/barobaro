import Button from '@/components/shared/Button';
import { ContractConditionRequest } from '@/types/apis/productRequest';

type Props = {
  onNext: (data: ContractConditionRequest) => void;
  onPrev: () => void;
};

function ContractInfoInput({ onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col">
      <h2>계약서</h2>
      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>
        <Button
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
          width="100%"
          height="36px"
          color="blue"
        >
          <p className="text-xs">다음</p>
        </Button>
      </div>
    </div>
  );
}

export default ContractInfoInput;
