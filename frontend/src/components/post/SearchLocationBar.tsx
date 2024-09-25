import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import useLocationModel from '@/hooks/shared/useLocationModel';
import { Dispatch, SetStateAction, useState } from 'react';

function SearchLocationBar({
  open,
  onSelect,
}: {
  open: Dispatch<SetStateAction<boolean>>;
  onSelect: Dispatch<SetStateAction<string>>;
}) {
  const { locations, searchLocationByQuery } = useLocationModel();
  const [keyWord, setKeyWord] = useState('');
  return (
    <div className="mt-2 flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          placeholder="위치를 검색해주세요."
          width="100%"
          height="32px"
          value={keyWord}
          onChange={setKeyWord}
        />
        <Button
          width={'72px'}
          height={'32px'}
          onClick={() => searchLocationByQuery(keyWord)}
        >
          검색
        </Button>
      </div>
      <div
        className="flex flex-col gap-2"
        onClick={() => {
          open(false);
        }}
      >
        {locations.map((location) => (
          <div
            className="border-2 rounded-sm flex flex-col gap-1 px-3 py-2"
            onClick={() => onSelect(location.addressName)}
          >
            <p className="text-base">{location.addressName}</p>
            <p className="text-xs text-gray-200">{location.placeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchLocationBar;
