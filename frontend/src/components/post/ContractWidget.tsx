import ErrorMessage from '@/components/shared/ErrorMessage';
import { ReactNode } from 'react';
import { MdError } from 'react-icons/md';

type Props = {
  title: string;
  name?: string | ReactNode;
  value: string | number;
  end?: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
  message?: string;
  hasInput?: boolean;
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
  isInvalid, message, hasInput,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className='flex gap-2 relative items-center'>
        <p className="text-base">{title}</p>
        {hasInput && <MdError className="text-pinkRed text-base" />}
        {/* <ErrorMessage isInvalid={isInvalid!}>{message}</ErrorMessage> */}
      </div>

      <div className="bg-gray-500 py-1 flex w-fit rounded-md px-1">
        <p className="text-sm px-2 min-w-fit py-1">{name}</p>
        <input
          className={`text-sm text-center bg-gray-500 outline-none ${end ? 'w-[100px]' : 'max-w-48 w-fit'}`}
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
