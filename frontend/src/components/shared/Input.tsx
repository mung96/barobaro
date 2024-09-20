type InputProps = {
  width: string;
  height: string;
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  disabled?: boolean;
};

function Input({
  width,
  height,
  value,
  placeholder,
  onChange,
  disabled,
}: InputProps) {
  return (
    <input
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      value={value}
      placeholder={placeholder}
      style={{ width: `${width}`, height: `${height}` }}
      className="border border-gray-500  placeholder-gray-500 text-xs pl-2 py-1 outline-none"
    />
  );
}

export default Input;
