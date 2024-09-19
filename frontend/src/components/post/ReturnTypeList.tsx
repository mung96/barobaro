import CheckBox from '@/components/shared/CheckBox';
import { FaCheck } from 'react-icons/fa';

type ReturnTypeListProps = {
  values: string[];
  onChange: (values: string[]) => void;
};

const RETURN_TYPE = [
  { label: '대면', value: '대면' },
  { label: '택배', value: '택배' },
];

function ReturnTypeList({ values, onChange }: ReturnTypeListProps) {
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-xs text-black">반납 희망 방법</p>
      <CheckBox.Group
        values={values}
        onChange={onChange}
        className="flex gap-1"
      >
        {RETURN_TYPE.map((returnType) => (
          <CheckBox.Item
            value={returnType.value}
            className={
              'relative has-[:checked]:border-blue-100 has-[:checked]:border-[1px] bg-gray-400 rounded flex w-24 h-6 items-center justify-center has-[:checked]:bg-white has-[checked]:text-blue-100'
            }
          >
            <p className=" text-gray-300 text-xs peer-checked:text-blue-100 peer-checked:font-bold ">
              {returnType.label}
            </p>
            <div className="peer-checked:flex items-center justify-center w-4 absolute h-4 hidden  text-blue-100 right-1 bottom-1">
              <FaCheck className="w-3" />
            </div>
          </CheckBox.Item>
        ))}
      </CheckBox.Group>
    </div>
  );
}

export default ReturnTypeList;
