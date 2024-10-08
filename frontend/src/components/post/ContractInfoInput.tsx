import { useEffect, useState } from 'react';
import Button from '@/components/shared/Button';
import Radio from '@/components/shared/Radio';
import SelectableItem from '@/components/shared/SelectableItem';
import { CONTRACT_YN } from '@/constants/product';
import { ContractConditionRequest } from '@/types/apis/productRequest';
import RentalInfoCard from '@/components/post/RentalInfoCard';
import OverdueInfoCard from '@/components/post/OverdueInfoCard';
import ProductRepairInfoCard from '@/components/post/ProductRepairInfoCard';
import RefundInfoCard from '@/components/post/RefundInfoCard';
import OwnerInfoCard from '@/components/post/OwnerInfoCard';
import { ContractFormFields, StepProps } from '@/hooks/post/usePostFormModel';

type Props = {
  onTotalStepChange: (step: number) => void;
  onNext: (data: ContractConditionRequest) => void;
  onPrev: () => void;
} & StepProps<ContractFormFields>;

function ContractInfoInput({ onTotalStepChange, onNext, onPrev, context, fields }: Props) {
  const [value, setValue] = useState('YES');
  useEffect(() => {
    if (value === 'YES') {
      onTotalStepChange(4);
    } else {
      onTotalStepChange(3);
    }
  }, [value])

  return (
    <div className="flex flex-col gap-2">
      <h2>전자계약서 작성 여부</h2>
      <Radio.Group
        fieldSetName="전자계약서 작성 여부"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex gap-4"
      >
        {CONTRACT_YN.map((item) => (
          <SelectableItem type="radio" value={item.value} label={item.label} />
        ))}
      </Radio.Group>
      {value === 'YES' && (
        <div className="flex flex-col gap-3">
          <RentalInfoCard />
          <ProductRepairInfoCard />
          <OverdueInfoCard />
          <RefundInfoCard />
          <OwnerInfoCard />
        </div>
      )}
      <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] z-10 bg-white">
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
