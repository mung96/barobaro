import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import ContractCardBox from '@/components/post/ContractCardBox';
import CheckBox from '@/components/shared/CheckBox';
import { REPAIR_VENDOR } from '@/constants/product';

function ProductRepairInfoCard() {
  const [values, setValues] = useState<string[]>([]);
  return (
    <ContractCardBox title="물건 수리" step={2}>
      <CheckBox.Group
        values={values}
        label=""
        onChange={setValues}
        className="flex flex-col gap-2"
      >
        {REPAIR_VENDOR.map((vendor) => (
          <CheckBox.Item
            value={vendor.value}
            className="visible group flex gap-2"
          >
            <div className="w-5 h-5 bg-gray-500 flex items-center justify-center">
              <FaCheck className="w-4 h-4 text-black hidden  group-has-[:checked]:block" />
            </div>
            <p className="text-sm">{vendor.label}</p>
          </CheckBox.Item>
        ))}
      </CheckBox.Group>
    </ContractCardBox>
  );
}

export default ProductRepairInfoCard;
