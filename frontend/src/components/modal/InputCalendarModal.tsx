import { DateRange } from 'react-day-picker';
import { Dispatch, SetStateAction } from 'react';
import ReactModal from 'react-modal';
import DateRangePicker from '../shared/DateRangePicker';

type InputCalendarModalParams = {
  isOpen: boolean;
  selected: DateRange | undefined;
  onSelect: Dispatch<SetStateAction<DateRange | undefined>>;
  isClose: () => void;
};

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', // 투명한 배경
    zIndex: 2000, // 다른 요소 위에 오도록 설정
  },
  content: {
    position: 'absolute',
    top: '50%', // 수직 중앙
    left: '50%', // 수평 중앙
    transform: 'translate(-50%, -50%)', // 모달을 자신의 크기만큼 위로 및 왼쪽으로 이동
    width: '350px',
    height: '430px',
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
  },
};

const InputCalendarModal = ({
  isOpen,
  selected,
  onSelect,
  isClose,
}: InputCalendarModalParams) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={isClose}
      contentLabel="request"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex justify-center items-center">
        <DateRangePicker
          selected={selected}
          onSelect={onSelect}
          onClose={isClose}
        />
      </div>
    </ReactModal>
  );
};

export default InputCalendarModal;
