import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnAddressInput from '@/components/post/ReturnAddressInput';
import ReturnPlaceInput from '@/components/post/ReturnPlaceInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import { RentalInfo } from '@/types/domains/product';

type Props = {
  onPrev: () => void;
  onNext: (data: RentalInfo) => void;
};

function RentalInfoInput({ onNext, onPrev }: Props) {
  const [ways, setWays] = useState<string[]>([]);
  const [fee, setFee] = useState('');
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [place] = useState('');
  const [latitude] = useState(0);
  const [longitude] = useState(0);
  const [address] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <RentalDurationInput selected={range} onSelect={setRange} />
      <RentalFeeInput value={fee} onChange={setFee} />

      <ReturnPlaceInput />

      <ReturnTypeList values={ways} onChange={setWays} />
      {ways.includes('DELIVERY') && <ReturnAddressInput />}

      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>

        <Button
          onClick={() =>
            onNext({
              startDate: range?.from!,
              endDate: range?.to!,
              rentalFee: Number(fee),
              place,
              latitude,
              longitude,
              returnTypeList: ways,
              returnAddress: address,
            })
          }
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
