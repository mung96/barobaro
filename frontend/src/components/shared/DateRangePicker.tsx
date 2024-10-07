import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './calendar.css';
import { ko } from 'react-day-picker/locale';
import Button from '@/components/shared/Button';

type DateRangePickerProps = {
  selected: DateRange | undefined;
  onSelect: (dateRange: DateRange) => void;

  onClose: () => void;
};

function DateRangePicker({
  selected,
  onSelect,
  onClose,
}: DateRangePickerProps) {
  return (
    <div className="rounded-xl bg-white relative flex flex-col items-center h-96 justify-center shadow-md border-gray-300 border-[1px] w-[300px]">
      <button
        type="button"
        className="font-bold text-xl py-4 px-4"
        onClick={onClose}
      >
        대여날짜를 선택해주세요
      </button>

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
        excludeDisabled
        selected={selected}
        onSelect={onSelect}
        numberOfMonths={12}
        startMonth={new Date()}
        required
      />
      <div className="flex py-2 justify-between w-full border-t-[1px] px-4">
        <button
          type="button"
          className="flex items-center"
          onClick={() => onSelect({ from: new Date(), to: new Date() })}
        >
          <p className="text-xs underline">재설정</p>
        </button>
        <Button width="100px" height="40px" onClick={onClose}>
          다음
        </Button>
      </div>
    </div>
  );
}

export default DateRangePicker;
