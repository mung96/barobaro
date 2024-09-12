'use client';

import { useState, useEffect, useCallback } from 'react';
import KeyPadDelete from '@/components/(SVG_component)/(mypage)/KeyPadDelete';
import DisplayPassword from '@/components/(user)/DisplayPassword';
import Header from '@/components/Header';

enum PasswordChangeStep {
  CURRENT,
  NEW,
  CONFIRMNEW,
}

export default function PasswordChange() {
  const realPassword = '112233';
  // 추후 진짜 비밀번호는 다른곳에서 가져올 예정.
  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<PasswordChangeStep>(PasswordChangeStep.CURRENT);
  const [passwordMessage, setPasswordMessage] = useState('현재 비밀번호를 입력해주세요');

  const passwordHandler = (press: string) => {
    if (inputPassword.length !== 6) {
      setInputPassword((prev) => prev + press);
    }
  };

  const deleteHandler = () => {
    setInputPassword((prev) => prev.slice(0, -1));
  };

  const handlePasswordSubmit = useCallback(() => {
    // eslint-disable-next-line default-case
    switch (step) {
      case PasswordChangeStep.CURRENT:
        if (inputPassword === realPassword) {
          setStep(PasswordChangeStep.NEW);
          setPasswordMessage('새로운 비밀번호를 입력해주세요');
        } else {
          setPasswordMessage('비밀번호가 일치하지 않습니다. 다시 입력해주세요');
        }
        break;
      case PasswordChangeStep.NEW:
        setNewPassword(inputPassword);
        setStep(PasswordChangeStep.CONFIRMNEW);
        setPasswordMessage('새로운 비밀번호를 다시 한 번 입력해주세요');
        break;
      case PasswordChangeStep.CONFIRMNEW:
        if (inputPassword === newPassword) {
          setPasswordMessage('비밀번호가 성공적으로 변경되었습니다');
          // 여기에 비밀번호 변경 API 호출 로직을 추가할 수 있습니다.
        } else {
          setStep(PasswordChangeStep.NEW);
          setPasswordMessage('일치하지 않습니다. 새로운 비밀번호를 다시 입력해주세요');
        }
        break;
    }
    setInputPassword('');
  }, [inputPassword, newPassword, realPassword, step]);

  useEffect(() => {
    if (inputPassword.length === 6) {
      handlePasswordSubmit();
    }
  }, [inputPassword, handlePasswordSubmit]);

  return (
    <div className="flex flex-col h-[93dvh]">
      <header className="flex flex-col text-center font-bold">
        <Header pageName="" hasPrevBtn hasSearchBtn={false} hasAlertBtn/>
        비밀번호 변경
      </header>
      <main className="flex flex-col justify-center items-center flex-1">
        <p className="text-[14px] text-black-100">{passwordMessage}</p>
        <div className="mt-9">
          <DisplayPassword length={inputPassword.length} />
        </div>
      </main>
      <section className="w-full max-w-[500px] mx-auto text-gray-600">
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              className="w-full text-2xl h-[10dvh] flex items-center justify-center"
              onClick={() => passwordHandler(num.toString())}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <div className="w-full bg-transparent" />
          <button
            type="button"
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('0')}
          >
            0
          </button>
          <button
            type="button"
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={deleteHandler}
          >
            <KeyPadDelete />
          </button>
        </div>
      </section>
    </div>
  );
}
