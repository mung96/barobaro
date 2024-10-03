import { Control, useWatch } from 'react-hook-form';
import { useState } from 'react';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import SearchLocationBar from '@/components/post/SearchLocationBar';
import Input from '@/components/shared/Input';
import { RentalInfo } from '@/types/domains/product';
import { Location } from '@/types/domains/location';

type Props = {
  control: Control<RentalInfo>;
  onChange: (address: Location) => void;
};

function ReturnAddressInput({ control, onChange }: Props) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const returnAddress = useWatch({ control, name: 'returnAddress' });
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs">반납 희망 장소</p>
      <Input
        placeholder="위치 추가"
        width="100%"
        height="32px"
        value={returnAddress.addressName}
        onFocus={() => setIsOpenSearch(true)}
        readOnly
      />

      <DropDownAnimation isOpen={isOpenSearch}>
        <SearchLocationBar open={setIsOpenSearch} onSelect={onChange} />
      </DropDownAnimation>
    </div>
  );
}
export default ReturnAddressInput;
