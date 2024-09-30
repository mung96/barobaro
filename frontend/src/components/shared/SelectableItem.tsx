import React from 'react';
import { FaCheck } from 'react-icons/fa';
import CheckBox from '@/components/shared/CheckBox';
import Radio from '@/components/shared/Radio';

type Props = {
  type: 'checkbox' | 'radio';
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
};

function SelectableItem({
  type,
  value,
  label,
  checked,
  onChange,
  disabled,
}: Props) {
  const commonProps = {
    className:
      'relative has-[:checked]:border-blue-100 has-[:checked]:border-[1px] bg-gray-400 rounded flex w-full h-8 items-center justify-center has-[:checked]:bg-white has-[checked]:text-blue-100',
    disabled,
    children: (
      <>
        <p className="text-gray-300 text-xs peer-checked:text-blue-100 peer-checked:font-bold">
          {label}
        </p>
        <div className="peer-checked:flex items-center justify-center w-4 absolute h-4 hidden text-blue-100 right-1 bottom-1">
          <FaCheck className="w-4 h-4 mb-2" />
        </div>
      </>
    ),
  };

  return type === 'checkbox' ? (
    <CheckBox.Item
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...commonProps}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Radio.Item {...commonProps} value={value} />
  );
}

export default SelectableItem;
