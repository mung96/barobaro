import { ReactNode } from 'react';

type InputProps = {
  width: string;
  height: string;
  onChange?: (value: string) => void;
  value: string;
  placeholder: string;
  disabled?: boolean;
  icon?: ReactNode;
  [key: string]: any;
};

function Input({
  width,
  height,
  value,
  placeholder,
  onChange,
  disabled,
  icon,
  ...rest
}: InputProps) {
  return (
    <div
      className="relative flex"
      style={{ width: `${width}`, height: `${height}` }}
    >
      <input
        disabled={disabled}
        onChange={(event) => onChange && onChange(event.target.value)}
        value={value}
        placeholder={placeholder}
        className="border w-full border-gray-500 rounded-md placeholder-gray-500 text-base pl-2 pr-6 py-1 outline-none focus:border-black focus:border-opacity-50 focus:border-1"
        {...rest}
      />
      <div className="absolute top-1/2 right-1 -translate-y-1/2 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

export default Input;
