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
import { ContractInfoStep, ContractPreviewStep, PostInfoStep, RentalInfoStep } from '@/types/domains/product';

type Props = {
  onTotalStepChange: (step: number) => void;
  onNext: (data: ContractConditionRequest) => void;
  onPrev: () => void;
} & StepProps<ContractFormFields>;

export type InputProps = {
  fields: ContractFormFields;
  context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
}

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
          <RentalInfoCard fields={fields} context={context} />
          <ProductRepairInfoCard fields={fields} context={context} />
          <OverdueInfoCard fields={fields} context={context} />
          <RefundInfoCard fields={fields} context={context} />
          <OwnerInfoCard />
        </div>
      )}

      <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] bg-white z-50">
        <Button onClick={onPrev} width="30%" height="48px" color="gray">
          <p className="text-base">뒤로</p>
        </Button>

        <Button disabled={false} onClick={() =>
          onNext({
            productName: '',
            serialNumber: '',
            repairVendor: '',
            overdueCriteria: 0,
            overdueFee: 0,
            theftCriteria: 0,
            refundDeadline: 0,
          })
        } width="100%" height="48px">
          <p className="text-base">다음으로 가기</p>
        </Button>
      </div>

    </div>
  );
}

export default ContractInfoInput;
