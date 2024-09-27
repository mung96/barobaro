import { useCallback } from 'react';

export function useKeypad(
  setInputPassword: React.Dispatch<React.SetStateAction<string>>,
) {
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
