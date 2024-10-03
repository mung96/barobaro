import { useForm } from 'react-hook-form';
import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import { RentalInfo } from '@/types/domains/product';
import RentalAddressInput from '@/components/post/RentalAddressInput';
import ReturnAddressInput from '@/components/post/ReturnAddressInput';

type Props = {
  onPrev: () => void;
  onNext: (data: RentalInfo) => void;
};

function RentalInfoInput({ onNext, onPrev }: Props) {
  // place: string;
  // latitude: number;
  // longitude: number;

  const { control, setValue, getValues } = useForm<RentalInfo>({
    defaultValues: {
      rentalDuration: { from: new Date(), to: new Date() },
      rentalFee: 0,
      returnTypeList: [],
      returnAddress: {
        placeName: '',
        latitude: '',
        longitude: '',
        addressName: '',
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <RentalDurationInput
        control={control}
        onSelect={(value) => setValue('rentalDuration', value)}
      />
      <RentalFeeInput
        control={control}
        onChange={(value) => setValue('rentalFee', Number(value))}
      />

      <RentalAddressInput
        control={control}
        onChange={(value) => setValue('returnAddress', value)}
      />

      <ReturnTypeList
        control={control}
        onChange={(values) => setValue('returnTypeList', values)}
      />
      {getValues('returnTypeList').includes('DELIVERY') && (
        <ReturnAddressInput
          control={control}
          onChange={(value) => setValue('rentalAddress', value)}
        />
      )}

      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>

        <Button onClick={() => onNext(getValues())} width="100%" height="36px">
          <p className="text-xs">다음</p>
        </Button>
      </div>
    </div>
  );
}
export default RentalInfoInput;
