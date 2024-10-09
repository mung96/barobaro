import { Dispatch, SetStateAction, useState } from 'react';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import useLocationModel from '@/hooks/shared/useLocationModel';
import { Location } from '@/types/domains/location';

type SearchLocationBarProps = {
  open: Dispatch<SetStateAction<boolean>>;
  onSelect: (value: Location) => void;
};

function SearchLocationBar({ open, onSelect }: SearchLocationBarProps) {
  const { locationList, searchLocationListByQuery } = useLocationModel();
  const [keyWord, setKeyWord] = useState('');

  return (
    <div className="mt-2 flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          placeholder="위치를 검색해주세요."
          width="100%"
          height="40px"
          value={keyWord}
          onChange={setKeyWord}
        />
        <Button
          width="96px"
          height="40px"
          onClick={() => searchLocationListByQuery(keyWord)}
        >
          <p className='text-sm'>검색</p>
        </Button>
      </div>
      <div
        className="flex flex-col gap-1"
        role="none"
        onClick={() => {
          open(false);
        }}
      >
        {locationList.map((location) => (
          <div
            role="none"
            className="border-2 rounded-sm flex flex-col gap-1 px-3 py-2"
            onClick={() =>
              onSelect({
                longitude: location.longitude,
                latitude: location.latitude,
                addressName: location.addressName,
                placeName: location.placeName,
              })
            }
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
