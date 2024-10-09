import { useContext, ChangeEvent, ReactNode } from 'react';
import { RadioContext, RadioProvider } from '@/contexts/RadioContext';

type RadioProps = {
  children: ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  label?: string;
  children: ReactNode;
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldSetName?: string;
};

function RadioGroup({
  label,
  children,
  className,
  value,
  onChange,
  fieldSetName,
}: RadioGroupProps) {
  return (
    <fieldset name={fieldSetName} className={className}>
      <legend>{label}</legend>
      <RadioProvider value={{ value, onChange }}>{children}</RadioProvider>
    </fieldset>
  );
}

function RadioItem({ children, value, className, disabled }: RadioProps) {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error('Provider가 없는 곳에서 context를 사용했습니다.');
  }

  const { value: selectedValue, onChange } = context;

  return (
    <label className={className} htmlFor={value}>
      <input
        id={value}
        className="hidden peer"
        type="radio"
        value={value}
        checked={value === selectedValue}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </label>
  );
}

const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
};

export default Radio;
