import CheckBox from '@/components/shared/CheckBox';
import SelectableItem from '@/components/shared/SelectableItem';
import { ReturnType } from '@/types/domains/product';
import { FaCheck } from 'react-icons/fa';

type Props = {
  values: string[];
  onChange: (values: string[]) => void;
};

const RETURN_TYPE = [
  { label: '대면', value: 'DIRECT' },
  { label: '택배', value: 'DELIVERY' },
];

function ReturnTypeList({ values, onChange }: Props) {
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-xs text-black">반납 희망 방법</p>
      <CheckBox.Group
        values={values}
        onChange={onChange}
        className="flex gap-1"
      >
        {RETURN_TYPE.map((returnType) => (
          <SelectableItem
            type={'checkbox'}
            value={returnType.value}
            label={returnType.label}
          />
          // <CheckBox.Item
          //   value={returnType.value}
          //   key={returnType.value}
          //   className="relative has-[:checked]:border-blue-100 has-[:checked]:border-[1px] bg-gray-400 rounded flex w-24 h-8 items-center justify-center has-[:checked]:bg-white has-[checked]:text-blue-100"
          // >
          //   <p className="text-gray-300 text-xs peer-checked:text-blue-100 peer-checked:font-bold">
          //     {returnType.label}
          //   </p>
          //   <div className="peer-checked:flex items-center justify-center w-4 absolute h-4 hidden text-blue-100 right-1 bottom-1">
          //     <FaCheck className="w-4 h-4 mb-2" />
          //   </div>
          // </CheckBox.Item>
        ))}
      </CheckBox.Group>
    </div>
  );
}

export default ReturnTypeList;
