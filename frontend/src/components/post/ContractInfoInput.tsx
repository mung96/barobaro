import Button from '@/components/shared/Button';
import Radio from '@/components/shared/Radio';
import SelectableItem from '@/components/shared/SelectableItem';
import { CONTRACT_YN } from '@/constants/product';
import { ContractConditionRequest } from '@/types/apis/productRequest';
import { useState } from 'react';

type Props = {
  onNext: (data: ContractConditionRequest) => void;
  onPrev: () => void;
};
const RETURN_TYPE = [
  { label: '미작성', value: 'DIRECT' },
  { label: '작성', value: 'DELIVERY' },
];
function ContractInfoInput({ onNext, onPrev }: Props) {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col">
      <h2>전자계약서 작성 여부</h2>
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
