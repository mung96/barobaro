import ErrorMessage from '@/components/shared/ErrorMessage';
import Input from '@/components/shared/Input';

type RentalFeeInputProps = {
  value: number;
  onChange: (fee: string) => void;
  isInvalid: boolean;
  message: string;
};

const RentalFeeInput = ({ value, onChange, isInvalid, message }: RentalFeeInputProps) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <h3 className="text-base">
        대여가격 <span className="text-2xs text-gray-300">(원/일)</span>
      </h3>
      <Input
        width="100%"
        height="40px"
        placeholder="가격을 입력해주세요."
        value={value.toString()}
        onChange={onChange}
        type="number"
      />
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
};

export default RentalFeeInput;
