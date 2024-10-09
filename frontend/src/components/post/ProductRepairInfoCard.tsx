import { FaCheck } from 'react-icons/fa6';
import ContractCardBox from '@/components/post/ContractCardBox';
import { REPAIR_VENDOR } from '@/constants/product';
import { InputProps } from '@/components/post/ContractInfoInput';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Radio from '@/components/shared/Radio';

function ProductRepairInfoCard({ fields, context, errors }: InputProps) {
  return (
    <ContractCardBox title="물건 수리" step={2}>
      <Radio.Group
        value={fields.repairVendor.field.value as string}
        label=""
        onChange={fields.repairVendor.field.onChange}
        className="flex flex-col gap-2"
      >
        {REPAIR_VENDOR.map((vendor) => (
          <Radio.Item
            value={vendor.value}
            className="visible group flex gap-2"
          >
            <div className="w-5 h-5 bg-gray-500 flex items-center justify-center">
              <FaCheck className="w-4 h-4 text-black hidden  group-has-[:checked]:block" />
            </div>
            <p className="text-sm">{vendor.label}</p>
          </Radio.Item>
        ))}
      </Radio.Group>
      <ErrorMessage isInvalid={fields.repairVendor.fieldState.invalid}>{errors.repairVendor?.message}</ErrorMessage>
    </ContractCardBox>
  );
}

export default ProductRepairInfoCard;
