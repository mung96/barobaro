type TextAreaProps = {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  rows: number;
};

function TextArea({ onChange, placeholder, value, rows }: TextAreaProps) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 outline-none border rounded-md text-sm text-gray-700 placeholder-gray-500"
    />
  );
}

export default TextArea;
