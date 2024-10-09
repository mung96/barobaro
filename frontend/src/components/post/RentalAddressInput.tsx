import { useState } from 'react';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import SearchLocationBar from '@/components/post/SearchLocationBar';
import Input from '@/components/shared/Input';
import { Location } from '@/types/domains/location';
import ErrorMessage from '@/components/shared/ErrorMessage';

type Props = {
  value: Location;
  onChange: (value: Location) => void;
  isInvalid: boolean;
  message: string;
};

function RentalAddressInput({ value, onChange, isInvalid, message }: Props) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  return (
    <div className="flex flex-col gap-1 relative">
      <p className="text-base">거래 희망 장소</p>
      <Input
        placeholder="위치 추가"
        width="100%"
        height="40px"
        value={value.addressName}
        onFocus={() => setIsOpenSearch(true)}
        readOnly
      />

      <DropDownAnimation isOpen={isOpenSearch}>
        <SearchLocationBar open={setIsOpenSearch} onSelect={onChange} />
      </DropDownAnimation>
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
}
export default RentalAddressInput;
