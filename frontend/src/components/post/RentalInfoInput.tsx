import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import RentalAddressInput from '@/components/post/RentalAddressInput';
import ReturnAddressInput from '@/components/post/ReturnAddressInput';
import { DateRange } from 'react-day-picker';
import { Location } from '@/types/domains/location';
import { RentalFormFields, StepProps } from '@/types/domains/product';

type Props = {
  onPrev: () => void;
  onNext: () => void;
  isValid: boolean;
  getValues: any;

} & StepProps<RentalFormFields>;

function RentalInfoInput({ onNext, onPrev, context, fields, errors, getValues, isValid }: Props) {
  return (
    <form className="flex flex-col gap-4 pb-12">
      <RentalDurationInput
        value={fields.rentalDuration.field.value as DateRange}
        onSelect={fields.rentalDuration.field.onChange}
        isInvalid={fields.rentalDuration.fieldState.invalid}
        message={errors.rentalDuration?.message!}
      />
      <RentalFeeInput
        value={fields.rentalFee.field.value as number}
        onChange={fields.rentalFee.field.onChange}
        isInvalid={fields.rentalFee.fieldState.invalid}
        message={errors.rentalFee?.message!}
      />

      <RentalAddressInput
        value={fields.rentalAddress.field.value as Location}
        onChange={fields.rentalAddress.field.onChange}
        isInvalid={fields.rentalAddress.fieldState.invalid}
        message={errors.rentalAddress?.message!}
      />

      <ReturnTypeList
        value={fields.returnTypeList.field.value as string[]}
        onChange={fields.returnTypeList.field.onChange}
        isInvalid={fields.returnTypeList.fieldState.invalid}
        message={errors.returnTypeList?.message!}
      />
      {
        (fields.returnTypeList.field.value as string[])?.includes('DELIVERY') && (
          <ReturnAddressInput
            value={fields.returnAddress.field.value as Location}
            onChange={fields.returnAddress.field.onChange}
            isInvalid={fields.returnAddress.fieldState.invalid}
            message={errors.returnAddress?.message!}
          />)
      }

      <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] bg-white z-50">
        <Button onClick={onPrev} width="30%" height="48px" color="gray">
          <p className="text-base">뒤로</p>
        </Button>

        <Button disabled={!isValid} onClick={onNext} width="100%" height="48px">
          <p className="text-base">다음으로 가기</p>
        </Button>
      </div>
    </form >
  );
}
export default RentalInfoInput;
