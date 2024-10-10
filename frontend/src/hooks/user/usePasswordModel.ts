import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/apis/profileApi';
import { AxiosError } from 'axios';
import { useProfileObject, useProfileSet } from '@/store/useMyProfile';
import { postPINApi } from '@/apis/passwordApi';
import { usePrevPathStore } from '@/store/usePath';

enum PasswordChangeStep {
  CURRENT,
  NEW,
  CONFIRMNEW,
}
// TODO : 기존 유저의 경우 비밀번호를 받아오는 로직을 구현해야합니다.
export default function usePasswordChange(needNewPassword: boolean, realPassword?: string) {
  const router = useRouter();
  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const profile = useProfileObject();
  const setProfile = useProfileSet();
  const prevPath = usePrevPathStore();

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

          if (needNewPassword) {
            const fetchProfile = async () => {
              try {
                await postPINApi({ password: newPassword, checkPassword: inputPassword });
              } catch (error) {
                console.error('비밀번호 등록에 실패했습니다:', error);
              }
              try {
                const profileResponse = await getProfile();
                console.group('profileResponse');
                console.log(profileResponse);
                setProfile({
                  id: profile.id!,
                  profileImage: profileResponse.data.body.profileImage!,
                  nickname: profileResponse.data.body.nickname,
                  phoneNumber: profileResponse.data.body.phoneNumber,
                  email: profileResponse.data.body.email,
                  name: profileResponse.data.body.name,
                  isAuthenticated: profileResponse.data.body.isAuthenticated,
                });
                console.groupEnd();
              } catch (error) {
                console.log(error);
                if (error instanceof AxiosError) {
                  alert(error.response?.data.header.message);
                }
              }
            };
            fetchProfile();
            router.push(prevPath);
          } else {
            setTimeout(() => router.replace('/mypage'));
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
