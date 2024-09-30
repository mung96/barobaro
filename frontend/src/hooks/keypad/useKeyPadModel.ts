import { Dispatch, SetStateAction, useCallback } from 'react';

function useKeypad(setInputPassword: Dispatch<SetStateAction<string>>) {
  const passwordHandler = useCallback(
    (press: string) => {
      setInputPassword((prev) => (prev.length !== 6 ? prev + press : prev));
    },
    [setInputPassword],
  );

  const deleteHandler = useCallback(() => {
    setInputPassword((prev) => prev.slice(0, -1));
  }, [setInputPassword]);

  return {
    passwordHandler,
    deleteHandler,
  };
}

export default useKeypad;
