import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Input from '@/components/shared/Input';
import DateRangePicker from '@/components/shared/DateRangePicker';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import ErrorMessage from '@/components/shared/ErrorMessage';

type Props = {
  value: DateRange;
  onSelect: (dateRange: DateRange) => void;
  isInvalid:boolean;
  message:string;
};

function RentalDurationInput({ value, onSelect,isInvalid,message }: Props) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  return (
    <div className="flex flex-col gap-1 relative">
      <h3 className="text-base">대여정보</h3>
      <div className="flex gap-2 relative">
        <Input
          placeholder="대여 날짜"
          value={
            value ? format(value.from!, 'yyyy-MM-dd') : ''
          }
          width="108px"
          height="40px"
          icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
          readOnly
          onFocus={() => setIsOpenCalendar(true)}
        />
        <p>~</p>
        <Input
          placeholder="반납 날짜"
          value={value ? format(value.to!, 'yyyy-MM-dd') : ''}
          width="108px"
          height="32px"
          icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
          readOnly
          onFocus={() => setIsOpenCalendar(true)}
        />
      </div>
      <DropDownAnimation isOpen={isOpenCalendar}>
        <DateRangePicker
          selected={value}
          onSelect={onSelect}
          onClose={() => setIsOpenCalendar(false)}
        />
      </DropDownAnimation>
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
}

export default RentalDurationInput;
