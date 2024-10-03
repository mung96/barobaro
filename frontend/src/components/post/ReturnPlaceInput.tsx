import { useState } from 'react';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import SearchLocationBar from '@/components/post/SearchLocationBar';
import Input from '@/components/shared/Input';

function ReturnPlaceInput() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs">거래 희망 장소</p>
      <Input
        placeholder="위치 추가"
        width="100%"
        height="32px"
        value={value}
        onFocus={() => setIsOpenSearch(true)}
        readOnly
      />

      <DropDownAnimation isOpen={isOpenSearch}>
        <SearchLocationBar open={setIsOpenSearch} onSelect={setValue} />
      </DropDownAnimation>
    </div>
  );
}
export default ReturnPlaceInput;
