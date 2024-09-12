import Radio from '@/components/shared/Radio';
import { ReactNode } from 'react';

type CategoryTagProps = {
  children: ReactNode;
  value: string;
  disabled?: boolean;
};

function CategoryTag({ children, value, disabled }: CategoryTagProps) {
  return (
    <Radio.Item
      value={value}
      disabled={disabled}
      className="flex items-center gap-1 rounded-2xl bg-gray-100 text-gray-100 py-1 px-4"
    >
      {children}
    </Radio.Item>
  );
}

export default CategoryTag;
