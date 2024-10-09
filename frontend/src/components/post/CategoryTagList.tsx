import { ChangeEvent, ReactNode } from 'react';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import CameraLens from '@/components/(SVG_component)/CameraLens';
import Etc from '@/components/(SVG_component)/Etc';
import LightStick from '@/components/(SVG_component)/LightStick';
import SmartPhone from '@/components/(SVG_component)/SmartPhone';
import TeleScope from '@/components/(SVG_component)/TeleScope';
import colors from '@/components/colors';
import Radio from '@/components/shared/Radio';
import { ProductCategory } from '@/types/domains/product';
import ErrorMessage from '@/components/shared/ErrorMessage';

export const productCategory: { id: number, value: ProductCategory, label: string, icon: ReactNode }[] = [
  {
    id: 0,
    value: 'TELESCOPE',
    label: '망원경',
    icon: <TeleScope fill={colors.gray[200]} />,
  },
  {
    id: 1,
    value: 'SMART_PHONE',
    label: '스마트폰',
    icon: <SmartPhone fill={colors.gray[200]} />,
  },
  {
    id: 2,
    value: 'LIGHT_STICK',
    label: '응원봉',
    icon: <LightStick fill={colors.gray[200]} />,
  },
  {
    id: 3,
    value: 'CAMERA_LENS',
    label: '카메라 렌즈',
    icon: <CameraLens fill={colors.gray[200]} />,
  },
  {
    id: 4,
    value: 'CAMERA_BODY',
    label: '카메라 바디',
    icon: <CameraBody fill={colors.gray[200]} />,
  },
  {
    id: 5,
    value: 'ETC',
    label: '기타',
    icon: <Etc fill={colors.gray[200]} />,
  },
];

type Props = {
  value: ProductCategory;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isInvalid: boolean;
  message: string;
};

function CategoryTagList({
  onChange,
  value,
  disabled,
  isInvalid,
  message,
}: Props) {
  return (
    <div className="flex gap-2 flex-col relative">
      <p className="text-base text-black">카테고리 선택</p>
      <Radio.Group
        className="gap-1 flex flex-wrap"
        value={value}
        fieldSetName="category"
        onChange={onChange}
      >
        {productCategory.map((categoryItem) => (
          <Radio.Item
            value={categoryItem.value}
            disabled={disabled}
            className="flex items-center gap-1 rounded-2xl bg-gray-100 text-gray-100 py-[6px] px-4 has-[:checked]:outline has-[:checked]:outline-[2px] has-[:checked]:outline-blue-100 "
            key={categoryItem.id}
          >
            {/* <div className="w-3 h-3">{category.icon}</div> */}
            <p className="text-sm text-gray-200 peer-checked:text-blue-100 ">
              {categoryItem.label}
            </p>
          </Radio.Item>
        ))}
      </Radio.Group>
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
}

export default CategoryTagList;
