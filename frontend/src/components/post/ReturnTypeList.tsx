import CheckBox from '@/components/shared/CheckBox';
import ErrorMessage from '@/components/shared/ErrorMessage';
import SelectableItem from '@/components/shared/SelectableItem';
import { RETURN_TYPE } from '@/constants/product';

type Props = {
  value: string[];
  onChange: (values: string[]) => void;
  isInvalid: boolean;
  message: string;
};

function ReturnTypeList({ value, onChange, isInvalid, message }: Props) {
  return (
    <div className="flex gap-1 flex-col relative">
      <p className="text-base text-black">반납 희망 방법</p>
      <CheckBox.Group
        values={value}
        onChange={onChange}
        className="flex gap-2"
      >
        {RETURN_TYPE.map((returnType) => (
          <SelectableItem
            type="checkbox"
            value={returnType.value}
            label={returnType.label}
          />
        ))}
      </CheckBox.Group>
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
}

export default ReturnTypeList;
