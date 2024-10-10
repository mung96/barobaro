import { FaCheck } from 'react-icons/fa6';
import ContractCardBox from '@/components/post/ContractCardBox';
import { REPAIR_VENDOR } from '@/constants/product';
import { InputProps } from '@/components/post/ContractInfoInput';
import Radio from '@/components/shared/Radio';
import { MdError } from 'react-icons/md';

function ProductRepairInfoCard({ fields, context, errors, isValid }: InputProps) {
  return (
    <ContractCardBox title="물건 수리" step={2} hasInput={true} isCardValid={!fields.repairVendor.fieldState.invalid || !(fields.repairVendor.field.value as string)}>


      <Radio.Group
        value={fields.repairVendor.field.value as string}
        label=""
        onChange={fields.repairVendor.field.onChange}
        className="flex flex-col gap-2"
      >
        <div className='flex gap-2 items-center'>
          <p className='text-base'>손상 시 수리 업체</p>
          <MdError className="text-pinkRed text-base" />
        </div>
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
    </ContractCardBox>
  );
}

export default ProductRepairInfoCard;
