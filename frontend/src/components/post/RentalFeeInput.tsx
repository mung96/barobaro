import { Control, useWatch } from 'react-hook-form';
import Input from '@/components/shared/Input';
import { RentalInfo } from '@/types/domains/product';

type RentalFeeInputProps = {
  control: Control<RentalInfo>;
  onChange: (fee: string) => void;
};

const RentalFeeInput = ({ control, onChange }: RentalFeeInputProps) => {
  const rentalFee = useWatch({ control, name: 'rentalFee' });
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">
        대여가격 <span className="text-2xs text-gray-300">(원/일)</span>
      </h3>
      <Input
        width="100%"
        height="32px"
        placeholder="가격을 입력해주세요."
        value={rentalFee.toString()}
        onChange={onChange}
        type="number"
      />
    </div>
  );
};

export default RentalFeeInput;
