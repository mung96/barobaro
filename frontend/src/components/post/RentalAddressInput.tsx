import { useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import SearchLocationBar from '@/components/post/SearchLocationBar';
import Input from '@/components/shared/Input';
import { RentalInfo } from '@/types/domains/product';
import { Location } from '@/types/domains/location';

type Props = {
  control: Control<RentalInfo>;
  onChange: (value: Location) => void;
};

function RentalAddressInput({ control, onChange }: Props) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const rentalAddress = useWatch({ control, name: 'rentalAddress' });
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs">거래 희망 장소</p>
      <Input
        placeholder="위치 추가"
        width="100%"
        height="32px"
        value={rentalAddress.addressName}
        onFocus={() => setIsOpenSearch(true)}
        readOnly
      />

      <DropDownAnimation isOpen={isOpenSearch}>
        <SearchLocationBar open={setIsOpenSearch} onSelect={onChange} />
      </DropDownAnimation>
    </div>
  );
}
export default RentalAddressInput;
