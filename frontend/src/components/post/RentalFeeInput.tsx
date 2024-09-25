import Input from '@/components/shared/Input';

type RentalFeeInputProps = {
  value: string;
  onChange: (fee: string) => void;
};

const RentalFeeInput = ({ value, onChange }: RentalFeeInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">
        대여가격 <span className="text-2xs text-gray-300">(원/일)</span>
      </h3>
      <Input
        width="100%"
        height="32px"
        placeholder="가격을 입력해주세요."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RentalFeeInput;
