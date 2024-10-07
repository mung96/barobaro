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
    <div className="flex gap-2 relative">
      <Input
        placeholder="대여 날짜"
        value={selected ? format(selected.from!, 'yyyy-MM-dd') : ''}
        width="108px"
        height="32px"
        icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
        readOnly
        onClick={
          () => setCalendarModalOpen(true)
          // onFocus => onClick으로 변경한 이유
          // 날짜 선택 캘린더를 별도의 모달로 구현했는데
          // onFocus에서 캘린더모달을 열어놓도록 지정하면
          // Focus가 되어있는 동안에는 캘린더가 계속 열려 있게 됨(닫기 눌러도 안 닫힘)
        }
      />
      <p>~</p>
      <Input
        placeholder="반납 날짜"
        value={selected ? format(selected.to!, 'yyyy-MM-dd') : ''}
        width="108px"
        height="32px"
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
