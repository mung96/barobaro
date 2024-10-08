import { useController, useForm } from 'react-hook-form';
import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import { ContractInfoStep, ContractPreviewStep, PostInfoStep, RentalInfo, RentalInfoStep } from '@/types/domains/product';
import RentalAddressInput from '@/components/post/RentalAddressInput';
import ReturnAddressInput from '@/components/post/ReturnAddressInput';
import { DateRange } from 'react-day-picker';
import { Location } from '@/types/domains/location';
import { postProduct } from '@/apis/productApi';

type Props = {
  onPrev: () => void;
  onNext: (data: RentalInfo) => void;
context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
};

function RentalInfoInput({ onNext, onPrev ,context}: Props) {
  const { control, getValues, formState:{isValid,errors},handleSubmit } = useForm<RentalInfo>({mode: 'onChange'});
  const { field: rentalDuration, fieldState: rentalDurationState } = useController<RentalInfo>({
    control,
    name: 'rentalDuration',
    defaultValue:'',
    rules: {
      required: '대여 날짜를 골라주세요.',
    },
  });
  const { field: rentalFee, fieldState: rentalFeeState } = useController<RentalInfo>({
    control,
    name: 'rentalFee',
    defaultValue:'',
    rules: {
      required: '대여 금액을 입력해주세요.',
    },
  });
  const { field: rentalAddress, fieldState: rentalAddressState } = useController<RentalInfo>({
    control,
    name: 'rentalAddress',
    defaultValue:'',
    rules: {
      required: '대여 장소를 입력해주세요.',
    },
  });
  const { field: returnTypeList, fieldState: returnTypeListState } = useController<RentalInfo>({
    control,
    name: 'returnTypeList',
    defaultValue:'',
    rules: {
      required: '반납 방법을 정해주세요.',
    },
  });
  const { field: returnAddress, fieldState: returnAddressState } = useController<RentalInfo>({
    control,
    name: 'returnAddress',
    defaultValue:'',
    rules: {
      required: '반납 장소를 입력해주세요.',
    },
  });
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const convertDataToRequest = ()=>{
    //undefined type가드를 활용해야하는데 시간이없네
    return {
    title: context.title!,
    startDate: formatDate(getValues().rentalDuration?.from!),
    endDate: formatDate(getValues().rentalDuration?.to!),
    rentalFee: getValues().rentalFee!,
    place: getValues().rentalAddress?.addressName!,
    latitude: Number(getValues().rentalAddress?.latitude!),
    longitude: Number(getValues().rentalAddress?.longitude!),
    returnTypeList: getValues().returnTypeList!,
    returnAddress: getValues().returnAddress?.addressName!,
    content: context.body!,
    category: context.category!}
  }
  return (
    <form className="flex flex-col gap-4 pb-12" onSubmit={handleSubmit(()=>postProduct(convertDataToRequest(),context.images! as File[]))}>
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

      {/* <div className="flex  gap-6">*/}
        <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] bg-white z-50">
        <Button onClick={onPrev} width="30%" height="48px" color="gray">
          <p className="text-base">뒤로</p>
        </Button>

        {/* <Button type="submit"  disabled={!isValid} onClick={() => onNext(getValues())} width="100%" height="48px"> */}
          
        <Button type="submit"  disabled={!isValid} width="100%" height="48px">        
          <p className="text-base">다음으로 가기</p>
        </Button>
      </div>
    </form>
  );
}
export default RentalInfoInput;
