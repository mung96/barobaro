import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './calendar.css';
import Button from '@/components/shared/Button';
import { ko } from 'react-day-picker/locale';

type DateRangePickerProps = {
  selected: DateRange | undefined;
  onSelect: Dispatch<SetStateAction<DateRange | undefined>>;
  open: Dispatch<SetStateAction<boolean>>;
};

function DateRangePicker({ selected, onSelect, open }: DateRangePickerProps) {
  return (
    <div className="rounded-xl bg-white relative flex flex-col items-center h-96 justify-center shadow-md border-gray-300 border-[1px] w-[300px]">
      <p className="font-bold text-xl py-4 px-4" onClick={() => open(false)}>
        대여날짜를 선택해주세요
      </p>
      <tr className="flex gap-[22px]">
        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
          <th key={day} className="text-gray-300 text-sm font-semibold h-6">
            {day}
          </th>
        ))}
      </tr>
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
      <div className="flex py-2 justify-between w-full border-t-[1px] px-4">
        <div className="flex items-center" onClick={() => onSelect(undefined)}>
          <p className="text-xs underline">재설정</p>
        </div>
        <Button width="100px" height="40px" onClick={() => open(false)}>
          다음
        </Button>
      </div>
    </div>
  );
}

export default DateRangePicker;
