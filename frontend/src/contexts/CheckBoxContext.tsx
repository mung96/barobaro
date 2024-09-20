import { createContext, ReactNode } from 'react';

interface CheckboxContextProps {
  isChecked: (value: string) => boolean;
  toggleValue: ({
    checked,
    value,
  }: {
    checked: boolean;
    value: string;
  }) => void;
  isDisabled: (disabled: boolean) => boolean;
}

const CheckboxContext = createContext<CheckboxContextProps | null>(null);

interface ProviderProps {
  children: ReactNode;
  value: CheckboxContextProps;
}

function CheckboxProvider({ children, value }: ProviderProps) {
  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  );
}

export { CheckboxContext, CheckboxProvider };
