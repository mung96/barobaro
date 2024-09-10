'use client';

import { useState, useEffect } from 'react';
import KeyPadDelete from '@/components/(SVG_component)/(mypage)/KeyPadDelete';
import DisplayPassword from '@/components/(user)/DisplayPassword';

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

  useEffect(() => {
    if (inputPassword.length === 6) {
      handlePasswordSubmit();
    }
  }, [inputPassword]);

  const passwordHandler = (press: string) => {
    if (inputPassword.length !== 6) {
      setInputPassword((prev) => prev + press);
    }
  };
  const deleteHandler = () => {
    setInputPassword((prev) => prev.slice(0, -1));
    // console.log(inputPassword);
  };

  const handlePasswordSubmit = () => {
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
  };

  return (
    <div className="flex flex-col h-[93dvh]">
      <header className="flex flex-col text-center font-bold">비밀번호 변경</header>
      <main className="flex flex-col justify-center items-center flex-1">
        <p className="text-[14px] text-black-100">{passwordMessage}</p>
        <div className="mt-9">
          <DisplayPassword length={inputPassword.length} />
        </div>
      </main>
      <section className="w-full max-w-[500px] mx-auto text-gray-600">
        <div className="grid grid-cols-3 gap-1">
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('1')}
          >
            1
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('2')}
          >
            2
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('3')}
          >
            3
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('4')}
          >
            4
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('5')}
          >
            5
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('6')}
          >
            6
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <button
            className="w-full text-2xl flex items-center justify-center"
            onClick={() => passwordHandler('7')}
          >
            7
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('8')}
          >
            8
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('9')}
          >
            9
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <div className="w-full bg-transparent" />
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => passwordHandler('0')}
          >
            0
          </button>
          <button
            className="w-full text-2xl h-[10dvh] flex items-center justify-center"
            onClick={() => deleteHandler()}
          >
            <KeyPadDelete />
          </button>
        </div>
      </section>
    </div>
  );
}
