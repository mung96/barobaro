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
import { RentalFormFields, StepProps } from '@/hooks/post/usePostFormModel';

type Props = {
  onPrev: () => void;
  onNext: (data: RentalInfo) => void;

  getValues:any;
  handleSubmit:any;

} & StepProps<RentalFormFields>;

function RentalInfoInput({ onNext, onPrev ,context,fields,errors,getValues,handleSubmit}: Props) {
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const convertProductDataToRequest = ()=>{
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
    <form className="flex flex-col gap-4 pb-12" onSubmit={handleSubmit(()=>postProduct(convertProductDataToRequest(),context.images! as File[]))}>
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
      {(fields.returnTypeList.field.value as string[])?.includes('DELIVERY') && (
        <ReturnAddressInput
        value={fields.returnAddress.field.value as Location}
          onChange={fields.returnAddress.field.onChange}
          isInvalid={fields.returnAddress.fieldState.invalid}
          message={errors.returnAddress?.message!}
        />
      )}

      {/* <div className="flex  gap-6">*/}
        <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] bg-white z-50">
        <Button onClick={onPrev} width="30%" height="48px" color="gray">
          <p className="text-base">뒤로</p>
        </Button>

        {/* <Button type="submit"  disabled={!isValid} onClick={() => onNext(getValues())} width="100%" height="48px"> */}
          
        <Button type="submit"  disabled={false} width="100%" height="48px">        
          <p className="text-base">다음으로 가기</p>
        </Button>
      </div>
    </form>
  );
}
export default RentalInfoInput;
