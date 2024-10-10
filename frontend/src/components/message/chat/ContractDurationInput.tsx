import { Dispatch, SetStateAction, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { format } from 'date-fns';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Input from '@/components/shared/Input';
import InputCalendarModal from '@/components/modal/InputCalendarModal';

type ContractDurationInputParams = {
  selected: DateRange | undefined;
  onSelect: Dispatch<SetStateAction<DateRange | undefined>>;
};

const ContractDurationInput = ({
  selected,
  onSelect,
}: ContractDurationInputParams) => {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const onRequestClose = () => {
    setCalendarModalOpen(false);
  };

  return (
    <div className="flex gap-2 relative items-center">
      <Input
        placeholder="대여 날짜"
        value={selected ? format(selected.from!, 'yyyy-MM-dd') : ''}
        width="120px"
        height="40px"
        icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
        readOnly
        onClick={
          () => setCalendarModalOpen(true)
        }
      />
      <p>~</p>
      <Input
        placeholder="반납 날짜"
        value={selected ? format(selected.to!, 'yyyy-MM-dd') : ''}
        width="120px"
        height="40px"
        icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
        readOnly
        onClick={() => setCalendarModalOpen(true)}
      />

      <InputCalendarModal
        isOpen={calendarModalOpen}
        selected={selected}
        onSelect={onSelect}
        isClose={onRequestClose}
      />
    </div>
  );
};

export default ContractDurationInput;
