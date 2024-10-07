import { useState } from 'react';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { getDongList } from '@/apis/locationApi';
import { Dong } from '@/types/apis/location';

type Props={
  values:Dong[],
  onChange:(values:Dong[])=>void
}

function MyTownSearch({values,onChange}:Props) {
  const [keyWord, setKeyWord] = useState('');
  const [searchResult, setSearchResult] = useState<Dong[]>([]);

  const searchDongList = async (keyword:string) =>{
    const response = await getDongList({keyword:keyword});
    setSearchResult(response.data.body.result)
  }
  const valuesArray = Array.isArray(values) ? values : [values];
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
            onClick={() => searchDongList(keyWord)}
          >
            검색
          </Button>
        </div>
        {searchResult.map((location) => (
          <div
            role="none"
            className="border-2 rounded-sm flex flex-col gap-[1px] px-3 py-2"
            onClick={()=>onChange([...valuesArray,location])}
          >
            <p className="text-base">{location.name}</p>
          </div>
        ))}
 
      </div>
    </section>
  );
}
export default MyTownSearch;
