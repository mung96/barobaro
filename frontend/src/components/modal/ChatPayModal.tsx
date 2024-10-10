import ReactModal from 'react-modal';
import React, { useState } from 'react';
import { banks, findBankNameByBankValue } from '@/constants/banks';
import ModalClose from '../(SVG_component)/ModalClose';
import PasswordCheckModal from './PasswordCheckModal';

type ChatAlertModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
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

const ChatPayModal = ({ isOpen, onRequestClose }: ChatAlertModalParams) => {
  const [accountNumber, setAccountNumber] = useState<string>(); // 계좌번호 : 문자열 타입
  // const [accountNumber, setAccountNumber] = useState<number>(); // 계좌번호 : 일단 숫자 타입

  const [bankName, setBankName] = useState<string>();
  const [viewInput, setViewInput] = useState(true); // 계좌번호 / 은행 선택창 보이기
  const [moneyInput, setMoneyInput] = useState<number>();

  const [isOpenPwdModal, setIsOpenPwdModal] = useState(false);
  // 송금 위한 비밀번호 체크 모달 띄우기

  const handlePressed = (value: boolean) => {
    setViewInput(value);
  };

  const checkNumbers = (input: string) => {
    const filteredValue = input.replace(/[^0-9]/g, '');
    //   return Number(filteredValue);
    return filteredValue;
  };

  const onChangeBankName = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setBankName(value);
  };

  const onChangeAccountNumber = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(checkNumbers(value));
  };

  const onChangeMoneyInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyInput(Number(checkNumbers(value)));
  };

  const requestPay = () => {
    // 송금 로직

    setIsOpenPwdModal(true);
    // 비밀번호 체크 모달을 현제 송금 모달 '위에' 띄워야 함
    // 비밀번호 체크 성공하면 비밀번호 체크 모달 닫히면서 송금 진행
    // 송금 완료 시에는 프로세스 바꾸고 송금 모달까지 닫기
  };

  const closeRequest = () => {
    setBankName(undefined);
    setAccountNumber(undefined);
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="signature"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex flex-col w-[100vw] h-[85vh] items-center justify-between gap-1">
        {viewInput ? (
          <>
            <div className="flex flex-col items-center w-full">
              <div
                className="pl-3 pt-3 h-[4vh] self-start"
                onClick={closeRequest}
                role="presentation"
              >
                <ModalClose />
              </div>
              <div className="flex h-[4vh] text-base font-bold mt-3 mb-[3vh]">
                계좌번호 입력
              </div>
              {/* 은행 / 증권사 선택 */}
              <select
                className="flex mb-[1vh] bg-gray-100 w-[70vw] h-[8vh] justify-center rounded-2xl border border-gray-500 p-2.5"
                onChange={onChangeBankName}
              >
                <option value="" disabled selected>
                  은행/증권사 선택
                </option>
                {banks.map((each) => (
                  <option value={each.value}>{each.name}</option>
                ))}
              </select>

              {/* 계좌번호 입력 */}
              <input
                type="text"
                inputMode="numeric"
                className="flex bg-gray-100 w-[70vw] h-[8vh] justify-center rounded-2xl border border-b-gray-500 p-2.5 appearance-none"
                placeholder="계좌번호 입력"
                onChange={onChangeAccountNumber}
                value={accountNumber} // 입력된 값은 accountNumber로 관리
              />
            </div>
            {/* 버튼 */}
            <button
              type="button"
              className="w-[90vw] h-[6vh] rounded-xl text-white text-sm mt-3 bg-blue-100 mb-[3vh]"
              onClick={() => handlePressed(false)}
            >
              다음
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center w-full">
              <div
                className="pl-3 pt-3 h-[4vh] self-start"
                onClick={closeRequest}
                role="presentation"
              >
                <ModalClose />
              </div>
              <div className="flex items-center flex-col">
                <div className="flex h-[4vh] text-base font-bold mt-3 mb-[3vh]">
                  금액 입력
                </div>
                {/* 이전 화면에서 선택한 정보 출력 */}
                <div
                  className="  text-lg font-bold text-black-100"
                  onClick={() => handlePressed(true)}
                  role="presentation"
                >
                  {findBankNameByBankValue(bankName)} {accountNumber}
                </div>
                <div className="text-lg text-black-100 mt-[1vh]">이 계좌로</div>

                <div className="flex justify-center gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="flex bg-gray-100 text-lg font-bold text-right w-[60vw] h-[7vh] justify-center rounded-2xl border border-b-gray-500 p-2.5 appearance-none"
                    placeholder="송금할 금액 입력"
                    onChange={onChangeMoneyInput}
                    value={moneyInput} // 입력된 값은 accountNumber로 관리
                  />
                  <span className="flex text-lg items-end">원을</span>
                </div>
              </div>
              <div className="text-lg text-black-100 mt-[1vh]">송금할래요.</div>
            </div>

            {/* 버튼 */}

            <div className="flex gap-2">
              <button
                type="button"
                className="w-[40vw] h-[6vh] rounded-xl bg-gray-500 text-sm mt-3 text-gray-300 mb-[3vh]"
                onClick={() => handlePressed(true)}
              >
                이전
              </button>
              <button
                type="button"
                className="w-[40vw] h-[6vh] rounded-xl text-white text-sm mt-3 bg-blue-100 mb-[3vh]"
                onClick={requestPay}
              >
                송금하기
              </button>
              {/*  여기에 비밀번호 체크 모달 로드, isOpen(트리거)을 isOpenPwdModal */}
              {isOpenPwdModal && (
                <PasswordCheckModal
                  isOpen={isOpenPwdModal}
                  onRequestClose={onRequestClose}
                  purpose="beforePay"
                />
              )}
            </div>
          </>
        )}
      </div>
    </ReactModal>
  );
};
export default ChatPayModal;
