import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import ModalClose from '../(SVG_component)/ModalClose';
import ContractContent from '../message/chat/ContractContent';
import SignatureArea from '../message/chat/SignatureArea';

type SignatureModalParam = {
  onRequestClose: () => void;
  isOpen: boolean;
};

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경색
    zIndex: 1000, // 다른 요소 위에 오도록 설정
  },
  content: {
    position: 'fixed', // 'absolute' 대신 'fixed'로 변경
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 'none',
    borderRadius: '0',
    padding: '0',
  },
};

const SignatureModal = ({ isOpen, onRequestClose }: SignatureModalParam) => {
  const [pressed, setPressed] = useState(false); // '확인' 버튼이 눌렸는지

  const handlePressed = () => {
    setPressed(true);
  };

  const [dataUrl, setDataUrl] = useState('');

  const handleSignature = (signatureUrl: string) => {
    setDataUrl(signatureUrl);
  };

  useEffect(() => {
    // 버튼 눌리면 수행할 로직
    // 비동기 -> 서명 그래픽 정보 서버로 보내기
    // 응답 오면 -> 모달 닫기, 프로세스 상태 업데이트하기
    // 프로세스 상태 넘어가면? -> 서명하기 버튼 disabled 되어야 함
    onRequestClose(); // 모달 닫기
    setPressed(false);

    console.log(dataUrl);
  }, [pressed]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="signature"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex flex-col w-[100vw] h-[100vh] items-center">
        <div
          className="pl-3 pt-3 h-[4vh] self-start"
          onClick={onRequestClose}
          role="presentation"
        >
          <ModalClose />
        </div>
        <div className="flex h-[4vh] text-base font-bold mt-3 mb-3">
          전자계약서 확인 및 서명
        </div>
        <div className="flex h-[45vh] w-[98vw] overflow-y-auto rounded-xl border border-gray-500">
          {/* 계약서 영역 */}
          <ContractContent />
        </div>
        <div className="flex h-[30vh] w-[98vw] rounded-xl border border-gray-500 mt-3">
          {/* 서명 라이브러리 영역 */}
          <SignatureArea
            handleSignature={handleSignature}
            saveTrigger={pressed}
          />
        </div>
        <button
          type="button"
          className={`w-[90vw] h-[6vh] rounded-xl text-white text-sm mt-3 ${pressed ? 'bg-blue-100 ' : 'bg-blue-500'}`}
          onClick={handlePressed}
        >
          완료
        </button>
      </div>
    </ReactModal>
  );
};

export default SignatureModal;
