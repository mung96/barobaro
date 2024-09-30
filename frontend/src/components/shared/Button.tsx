import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  width: string;
  height: string;
  onClick: () => void;
  disabled?: boolean;
  color?: 'blue' | 'gray';
};

function Button({
  children,
  width,
  height,
  onClick,
  disabled,
  color = 'blue',
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ width: `${width}`, height: `${height}` }}
      className={`flex justify-center items-center text-2xs font-bold py-[10px] disabled:bg-gray-500 disabled:text-gray-300 rounded-lg ${color === 'blue' ? 'bg-blue-100 text-white  active:bg-blue-700' : 'bg-gray-500 text-gray-300  active:bg-gray-200'}`}
    >
      {children}
    </button>
  );
}

export default Button;
