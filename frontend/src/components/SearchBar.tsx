'use client';

import SearchEnterSVG from '@/components/(SVG_component)/SearchEnter';
import useSearchModel from '@/hooks/products/useSearchModel';
import {useRouter} from 'next/navigation'

export default function SearchBar() {
  const router = useRouter();
  const goSearhMain = () => {
    router.push('/searchmain')
  }
  const { handleSearch, goSearch } = useSearchModel();
  return (
    <section className="flex justify-center">
      <div className="flex flex-row h-12 w-[90%] items-center justify-between rounded-[52px] shadow-xl bg-white" onClick={goSearhMain}>
        <div className="ml-3 flex flex-1 text-gray-200">
          <p>검색어를 입력해주세요.</p>
        </div>
        <button type="button" className="mr-3" onClick={() => goSearch()}>
          <SearchEnterSVG />
        </button>
      </div>
    </section>
  );
}
