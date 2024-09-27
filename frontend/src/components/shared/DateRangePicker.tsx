import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './calendar.css';
import Button from '@/components/shared/Button';
import { ko } from 'react-day-picker/locale';

type DateRangePickerProps = {
  selected: DateRange | undefined;
  onSelect: Dispatch<SetStateAction<DateRange | undefined>>;
};

function DateRangePicker({ selected, onSelect }: DateRangePickerProps) {
  return (
    <>
      <div className="flex gap-[22px]">
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <div key={day} className="text-gray-300 text-sm font-semibold h-6">
            {day}
          </div>
        ))}
      </div>
      <DayPicker
        locale={ko}
        mode="range"
        className="overflow-y-scroll scrollbar-hide"
        disabled={{ before: new Date() }}
        excludeDisabled={true}
        selected={selected}
        onSelect={onSelect}
        numberOfMonths={12}
        startMonth={new Date()}
        required
      />
    </>
  );
}

export default DateRangePicker;
