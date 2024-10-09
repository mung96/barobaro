import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/shared/Button';
import Radio from '@/components/shared/Radio';
import SelectableItem from '@/components/shared/SelectableItem';
import { CONTRACT_YN } from '@/constants/product';
import RentalInfoCard from '@/components/post/RentalInfoCard';
import OverdueInfoCard from '@/components/post/OverdueInfoCard';
import ProductRepairInfoCard from '@/components/post/ProductRepairInfoCard';
import RefundInfoCard from '@/components/post/RefundInfoCard';
import OwnerInfoCard from '@/components/post/OwnerInfoCard';
import { ContractFormFields, StepProps } from '@/hooks/post/usePostFormModel';

type Props = {
  onTotalStepChange: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  onSubmit: () => void;
  isFormValid: boolean;
  isSubmitting: boolean;
} & StepProps<ContractFormFields>;

export type InputProps = StepProps<ContractFormFields>;
type ButtonType = "button" | "submit";
function ContractInfoInput({ onTotalStepChange, onNext, onPrev, context, fields, errors, isValid, onSubmit, isSubmitting }: Props) {
  const [isContractWrite, setIsContractWrite] = useState('YES');
  useEffect(() => {
    if (isContractWrite === 'YES') {
      onTotalStepChange(4);
    } else {
      onTotalStepChange(3);
    }
  }, [isContractWrite])

  const buttonProps = useMemo(() => {
    const type: ButtonType = isContractWrite === 'YES' ? 'button' : 'submit';
    const disabled = isContractWrite === 'YES' ? !isValid : isSubmitting;
    const onClick = isContractWrite === 'YES' ? onNext : onSubmit;
    const text = isContractWrite === 'YES' ? '다음으로 가기' : '작성 완료하기';
    return { type, disabled, onClick, text }
  }, [isContractWrite, isValid, isSubmitting])

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <h2>전자계약서 작성 여부</h2>
      <Radio.Group
        fieldSetName="전자계약서 작성 여부"
        value={isContractWrite}
        onChange={(e) => setIsContractWrite(e.target.value)}
        className="flex gap-4"
      >
        {CONTRACT_YN.map((item) => (
          <SelectableItem type="radio" value={item.value} label={item.label} />
        ))}
      </Radio.Group>
      {isContractWrite === 'YES' && (
        <div className="flex flex-col gap-3">
          <RentalInfoCard fields={fields} context={context} errors={errors}
          />
          {/* 예외처리해야해 */}
          <ProductRepairInfoCard fields={fields} context={context} errors={errors} />
          <OverdueInfoCard fields={fields} context={context} errors={errors} />
          <RefundInfoCard fields={fields} context={context} errors={errors} />
          <OwnerInfoCard />
        </div>
      )}

      <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] bg-white z-50">
        <Button onClick={onPrev} width="30%" height="48px" color="gray">
          <p className="text-base">뒤로</p>
        </Button>

        <Button type={buttonProps.type} disabled={buttonProps.disabled} onClick={buttonProps.onClick} width="100%" height="48px">
          <p className="text-base">{buttonProps.text}</p>
        </Button>
      </div>
    </form >
  );
}

export default ContractInfoInput;
