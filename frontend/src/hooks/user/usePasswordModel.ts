import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

enum PasswordChangeStep {
  CURRENT,
  NEW,
  CONFIRMNEW,
}
// TODO : 기존 유저의 경우 비밀번호를 받아오는 로직을 구현해야합니다.
export default function usePasswordChange(needNewPassword: boolean, realPassword?: string, onSuccess?: () => void) {
  const router = useRouter();
  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<PasswordChangeStep>(
    needNewPassword ? PasswordChangeStep.NEW : PasswordChangeStep.CURRENT,
  );
  const [passwordMessage, setPasswordMessage] = useState<string>(
    needNewPassword ? '사용하실 비밀번호를 입력해주세요' : '현재 비밀번호를 입력해주세요',
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handlePasswordSubmit = useCallback(() => {
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
        setPasswordMessage('사용하실 비밀번호를 다시 한 번 입력해주세요');
        break;
      case PasswordChangeStep.CONFIRMNEW:
        if (inputPassword === newPassword) {
          setIsFinished(true);
          setPasswordMessage(
            needNewPassword ? '비밀번호가 성공적으로 등록되었습니다.' : '비밀번호가 성공적으로 변경되었습니다.',
          );
          {
            onSuccess ? onSuccess() : setTimeout(() => router.replace('/mypage'), 1000);
          }
        } else {
          setStep(PasswordChangeStep.NEW);
          setPasswordMessage('일치하지 않습니다. 비밀번호를 다시 입력해주세요');
        }
        break;
      default:
    }
    setInputPassword('');
  }, [inputPassword, newPassword, realPassword, step, needNewPassword, router]);

  useEffect(() => {
    if (inputPassword.length === 6) {
      handlePasswordSubmit();
    }
  }, [inputPassword, handlePasswordSubmit]);

  return {
    newPassword,
    inputPassword,
    setInputPassword,
    passwordMessage,
    isFinished,
    step,
  };
}
