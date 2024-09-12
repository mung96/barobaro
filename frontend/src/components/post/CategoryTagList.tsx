import CameraBody from '@/components/(SVG_component)/CameraBody';
import CameraLens from '@/components/(SVG_component)/CameraLens';
import Etc from '@/components/(SVG_component)/Etc';
import LightStick from '@/components/(SVG_component)/LightStick';
import SmartPhone from '@/components/(SVG_component)/SmartPhone';
import TeleScope from '@/components/(SVG_component)/TeleScope';
import colors from '@/components/colors';
import CategoryTag from '@/components/post/CategoryTag';
import Radio from '@/components/shared/Radio';
import { ChangeEvent } from 'react';

export const productCategory = [
  {
    id: 0,
    value: 'telescope',
    label: '망원경',
    icon: <TeleScope fill={colors.gray[200]} />,
  },
  {
    id: 1,
    value: 'smartphone',
    label: '스마트폰',
    icon: <SmartPhone fill={colors.gray[200]} />,
  },
  {
    id: 2,
    value: 'lightstick',
    label: '응원봉',
    icon: <LightStick fill={colors.gray[200]} />,
  },
  {
    id: 3,
    value: 'cameralens',
    label: '카메라 렌즈',
    icon: <CameraLens fill={colors.gray[200]} />,
  },
  {
    id: 4,
    value: 'camerabody',
    label: '카메라 바디',
    icon: <CameraBody fill={colors.gray[200]} />,
  },
  {
    id: 5,
    value: 'etc',
    label: '기타',
    icon: <Etc fill={colors.gray[200]} />,
  },
];

type CategoryTagListProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CategoryTagList({ onChange, value }: CategoryTagListProps) {
  return (
    <Radio.Group
      className="gap-1 flex flex-wrap"
      value={value}
      fieldSetName="category"
      onChange={onChange}
    >
      {productCategory.map((category) => (
        <CategoryTag value={category.value}>
          <div className="w-3 h-3">{category.icon}</div>
          <p className="text-xs text-gray-200">{category.label}</p>
        </CategoryTag>
      ))}
    </Radio.Group>
  );
}

export default CategoryTagList;
