'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchEnterSVG from '@/components/(SVG_component)/SearchEnter';

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const goSearch = () => {
    search.length !== 0
      ? router.push(
          `/search/category/all?product=${encodeURIComponent(search)}`,
        )
      : null;
  };
  return (
    <section className="flex justify-center">
      <div className="flex flex-row h-12 w-[90%] items-center justify-between rounded-[52px] shadow-xl bg-white">
        <div className="ml-3">
          <input
            name="search_input"
            type="search"
            id="search_input"
            placeholder="검색어를 입력해주세요."
            onChange={(e) => handleSearch(e.target.value)}
            required
          />
        </div>
        <button type="button" className="mr-3" onClick={() => goSearch()}>
          <SearchEnterSVG />
        </button>
      </div>
    </section>
  );
}
