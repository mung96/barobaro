import Button from '@/components/shared/Button';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import Radio from '@/components/shared/Radio';
import SelectableItem from '@/components/shared/SelectableItem';
import { CONTRACT_YN } from '@/constants/product';
import { totalStepByContractYN } from '@/services/post/regist';
import { ContractConditionRequest } from '@/types/apis/productRequest';
import { useEffect, useState } from 'react';

type Props = {
  onTotalStepChange: (step: number) => void;
  onNext: (data: ContractConditionRequest) => void;
  onPrev: () => void;
};

function ContractInfoInput({ onTotalStepChange, onNext, onPrev }: Props) {
  const [value, setValue] = useState('YES');
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const totalStep = totalStepByContractYN(value);
    onTotalStepChange(totalStep);
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      <h2 onClick={() => setIsOpen(true)}>전자계약서 작성 여부</h2>
      <Radio.Group
        fieldSetName="전자계약서 작성 여부"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex gap-4"
      >
        {CONTRACT_YN.map((yn) => (
          <SelectableItem type={'radio'} value={yn.value} label={yn.label} />
        ))}
      </Radio.Group>

      <DropDownAnimation isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>물건 소유자 및 대여정보</div>
      </DropDownAnimation>

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
