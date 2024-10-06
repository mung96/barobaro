import { useState } from 'react';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import useLocationModel from '@/hooks/shared/useLocationModel';

function MyTownSearch() {
  const { locationList, searchLocationListByQuery } = useLocationModel();
  const [keyWord, setKeyWord] = useState('');

  return (
    <section className="w-full justify-center items-center flex flex-col gap-7">
      <div className="mt-2 flex flex-col gap-3 w-full">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="동명(읍,면)으로 검색 (ex.역삼동)"
            width="100%"
            height="32px"
            value={keyWord}
            onChange={setKeyWord}
          />
          <Button
            width="72px"
            height="32px"
            onClick={() => searchLocationListByQuery(keyWord)}
          >
            검색
          </Button>
        </div>

        {locationList.map((location) => (
          <div
            role="none"
            className="border-2 rounded-sm flex flex-col gap-[2px] px-3 py-2"
            // onClick={() => onChange(location.addressName)}
          >
            <p className="text-base">{location.addressName}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default MyTownSearch;
