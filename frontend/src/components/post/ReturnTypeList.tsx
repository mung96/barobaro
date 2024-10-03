import { Control, useWatch } from 'react-hook-form';
import CheckBox from '@/components/shared/CheckBox';
import SelectableItem from '@/components/shared/SelectableItem';
import { RETURN_TYPE } from '@/constants/product';
import { RentalInfo } from '@/types/domains/product';

type Props = {
  control: Control<RentalInfo>;
  onChange: (values: string[]) => void;
};

function ReturnTypeList({ control, onChange }: Props) {
  const returnTypeList = useWatch({ control, name: 'returnTypeList' });
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-xs text-black">반납 희망 방법</p>
      <CheckBox.Group
        values={returnTypeList}
        onChange={onChange}
        className="flex gap-1"
      >
        {RETURN_TYPE.map((returnType) => (
          <SelectableItem
            type="checkbox"
            value={returnType.value}
            label={returnType.label}
          />
        ))}
      </CheckBox.Group>
    </div>
  );
}

export default ReturnTypeList;
