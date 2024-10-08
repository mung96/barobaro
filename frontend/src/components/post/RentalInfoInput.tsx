import { useController, useForm } from 'react-hook-form';
import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import { RentalInfo } from '@/types/domains/product';
import RentalAddressInput from '@/components/post/RentalAddressInput';
import ReturnAddressInput from '@/components/post/ReturnAddressInput';
import { DateRange } from 'react-day-picker';
import { Location } from '@/types/domains/location';

type Props = {
  onPrev: () => void;
  onNext: (data: RentalInfo) => void;
};

function RentalInfoInput({ onNext, onPrev }: Props) {
  const {
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<RentalInfo>({ mode: 'onChange' });
  const { field: rentalDuration, fieldState: rentalDurationState } =
    useController<RentalInfo>({
      control,
      name: 'rentalDuration',
      defaultValue: '',
      rules: {
        required: '대여 날짜를 골라주세요.',
      },
    });
  const { field: rentalFee, fieldState: rentalFeeState } =
    useController<RentalInfo>({
      control,
      name: 'rentalFee',
      defaultValue: '',
      rules: {
        required: '대여 금액을 입력해주세요.',
      },
    });
  const { field: rentalAddress, fieldState: rentalAddressState } =
    useController<RentalInfo>({
      control,
      name: 'rentalAddress',
      defaultValue: '',
      rules: {
        required: '대여 장소를 입력해주세요.',
      },
    });
  const { field: returnTypeList, fieldState: returnTypeListState } =
    useController<RentalInfo>({
      control,
      name: 'returnTypeList',
      defaultValue: '',
      rules: {
        required: '반납 방법을 정해주세요.',
      },
    });
  const { field: returnAddress, fieldState: returnAddressState } =
    useController<RentalInfo>({
      control,
      name: 'returnAddress',
      defaultValue: '',
      rules: {
        required: '반납 장소를 입력해주세요.',
      },
    });
  return (
    <div className="flex flex-col gap-4">
      <RentalDurationInput
        value={rentalDuration.value as DateRange}
        onSelect={rentalDuration.onChange}
        isInvalid={rentalDurationState.invalid}
        message={errors.rentalDuration?.message!}
      />
      <RentalFeeInput
        value={rentalFee.value as number}
        onChange={rentalFee.onChange}
        isInvalid={rentalFeeState.invalid}
        message={errors.rentalFee?.message!}
      />

      <RentalAddressInput
        value={rentalAddress.value as Location}
        onChange={rentalAddress.onChange}
        isInvalid={rentalAddressState.invalid}
        message={errors.rentalAddress?.message!}
      />

      <ReturnTypeList
        value={returnTypeList.value as string[]}
        onChange={returnTypeList.onChange}
        isInvalid={returnTypeListState.invalid}
        message={errors.returnTypeList?.message!}
      />
      {(returnTypeList.value as string[])?.includes('DELIVERY') && (
        <ReturnAddressInput
          value={returnAddress.value as Location}
          onChange={returnAddress.onChange}
          isInvalid={returnAddressState.invalid}
          message={errors.returnAddress?.message!}
        />
      )}

      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>

        <Button
          disabled={!isValid}
          onClick={() => onNext(getValues())}
          width="100%"
          height="36px"
        >
          <p className="text-xs">다음</p>
        </Button>
      </div>
    </div>
  );
}
export default RentalInfoInput;
