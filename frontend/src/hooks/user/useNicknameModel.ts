import { useState, useCallback } from 'react';

type NicknameModelReturnType = {
  valid: boolean;
  inputNickname: string;
  nicknameValid: (value: string) => void;
};

export default function useNicknameModel(): NicknameModelReturnType {
  const [valid, setValid] = useState(false);
  const [inputNickname, setInputNickname] = useState('');

  const nicknameValid = useCallback((value: string) => {
    const regex = /^[a-zA-Z가-힣0-9]{1,10}$/;
    const isValid = regex.test(value);
    setValid(isValid);
    setInputNickname(value);
  }, []);

  return { inputNickname, valid, nicknameValid };
}
