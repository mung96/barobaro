import useNicknameModel from '@/hooks/user/useNicknameModel';

export default function useProfileNicknameModel() {
  const { inputNickname, valid, nicknameValid } = useNicknameModel();
  const handleNicknameChange = (value: string) => {
    nicknameValid(value);
  };

  return {
    inputNickname,
    valid,
    handleNicknameChange,
  };
}
