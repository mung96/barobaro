import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Control, useWatch } from 'react-hook-form';
import Input from '@/components/shared/Input';
import DateRangePicker from '@/components/shared/DateRangePicker';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import { RentalInfo } from '@/types/domains/product';

type Props = {
  control: Control<RentalInfo>;
  onSelect: (dateRange: DateRange) => void;
};

function RentalDurationInput({ control, onSelect }: Props) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const rentalDuration = useWatch({ control, name: 'rentalDuration' });
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">대여정보</h3>
      <div className="flex gap-2 relative">
        <Input
          placeholder="대여 날짜"
          value={
            rentalDuration ? format(rentalDuration.from!, 'yyyy-MM-dd') : ''
          }
          width="108px"
          height="32px"
          icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
          readOnly
          onFocus={() => setIsOpenCalendar(true)}
        />
        <p>~</p>
        <Input
          placeholder="반납 날짜"
          value={rentalDuration ? format(rentalDuration.to!, 'yyyy-MM-dd') : ''}
          width="108px"
          height="32px"
          icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
          readOnly
          onFocus={() => setIsOpenCalendar(true)}
        />
      </div>
      <DropDownAnimation isOpen={isOpenCalendar}>
        <DateRangePicker
          selected={rentalDuration}
          onSelect={onSelect}
          onClose={() => setIsOpenCalendar(false)}
        />
      </DropDownAnimation>
    </div>
  );
}

export default RentalDurationInput;
