type ButtonProps = {
  children: React.ReactNode;
  width: string;
  height: string;
  onClick: () => void;
  disabled?: boolean;
};

function Button({ children, width, height, onClick, disabled }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ width: `${width}`, height: `${height}` }}
      className="flex justify-center items-center bg-blue-100 text-white text-2xs font-bold py-[10px] rounded-lg disabled:bg-gray-500 disabled:text-gray-300 active:bg-blue-700"
    >
      {children}
    </button>
  );
}

export default Button;
