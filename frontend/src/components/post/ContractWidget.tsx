import { ReactNode } from 'react';

type Props = {
  title: string;
  name?: string | ReactNode;
  value: string;
  end?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
};

function ContractWidget({
  title,
  name,
  value,
  end,
  onChange,
  type,
  disabled,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base">{title}</p>
      <div className="bg-gray-500 py-1 flex w-fit rounded-md px-1">
        <p className="text-sm px-2 min-w-fit py-1">{name}</p>
        <input
          className="text-sm text-center bg-gray-500 outline-none inline-block max-w-40"
          value={value}
          type={type}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          disabled={disabled}
          placeholder={placeholder}
        />
        {end && <p className="text-sm pr-2 py-1">{end}</p>}
      </div>
    </div>
  );
}

export default ContractWidget;
