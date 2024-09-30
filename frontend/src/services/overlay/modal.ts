import ReactModal from 'react-modal';

export const messageList = [
  '로그인이 필요합니다',
  '이미 거래가 완료되었습니다.',
  '오직 작성자만 수정 가능합니다.',
];

export const modalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // 어두운 배경
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    width: '320px',
    height: '250px',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
    zIndex: '1000',
  },
};
