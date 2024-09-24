import { Dispatch, SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Input from '@/components/shared/Input';
import DateRangePicker from '@/components/post/DateRangePicker';
import DropDownAnimation from '@/components/post/DropDownAnimation';

type RentalDurationInputProps = {
  selected: DateRange | undefined;
  onSelect: Dispatch<SetStateAction<DateRange | undefined>>;
};

function RentalDurationInput({ selected, onSelect }: RentalDurationInputProps) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  return (
    <>
      <div className="flex gap-2 relative">
        <Input
          placeholder={'대여 날짜'}
          value={selected ? format(selected.from!, 'yyyy-MM-dd') : ''}
          width="104px"
          height="24px"
          icon={<IoCalendarClearOutline className="w-3 h-3" />}
          readOnly
          onFocus={() => setIsOpenCalendar(true)}
        />
        <p>~</p>
        <Input
          placeholder={'반납 날짜'}
          value={selected ? format(selected.to!, 'yyyy-MM-dd') : ''}
          width="104px"
          height="24px"
          icon={<IoCalendarClearOutline className="w-3 h-3" />}
          readOnly
          onFocus={() => setIsOpenCalendar(true)}
        />
      </div>
      <DropDownAnimation isOpen={isOpenCalendar}>
        <DateRangePicker
          selected={selected}
          onSelect={onSelect}
          open={setIsOpenCalendar}
        />
      </DropDownAnimation>
    </>
  );
}

export default RentalDurationInput;
