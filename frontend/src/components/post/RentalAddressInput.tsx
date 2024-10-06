import { useState } from 'react';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import SearchLocationBar from '@/components/post/SearchLocationBar';
import Input from '@/components/shared/Input';
import { Location } from '@/types/domains/location';

type Props = {
  value:Location;
  onChange: (value: Location) => void;
};

function RentalAddressInput({ value, onChange }: Props) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs">거래 희망 장소</p>
      <Input
        placeholder="위치 추가"
        width="100%"
        height="32px"
        value={value.addressName}
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
