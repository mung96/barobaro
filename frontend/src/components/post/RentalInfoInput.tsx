import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnAddressInput from '@/components/post/ReturnAddressInput';
import ReturnPlaceInput from '@/components/post/ReturnPlaceInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import { RentalInfo, ReturnType } from '@/types/domains/product';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
type Props = {
  onPrev: () => void;
  onNext: (data: RentalInfo) => void;
};

function RentalInfoInput({ onNext }: Props) {
  const [ways, setWays] = useState<string[]>([]);
  const [fee, setFee] = useState('');
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [place, setPlace] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <RentalDurationInput selected={range} onSelect={setRange} />
      <RentalFeeInput value={fee} onChange={setFee} />

      <ReturnPlaceInput />

      <ReturnTypeList values={ways} onChange={setWays} />
      {ways.includes('DELIVERY') && <ReturnAddressInput />}

      <Button
        onClick={() =>
          onNext({
            startDate: range?.from!,
            endDate: range?.to!,
            rentalFee: Number(fee),
            place: place,
            latitude: latitude,
            longitude: longitude,
            returnTypeList: ways,
            returnAddress: address,
          })
        }
        width="100%"
        height="36px"
      >
        다음 스탭으로 가기
      </Button>
    </div>
  );
}
export default RentalInfoInput;
