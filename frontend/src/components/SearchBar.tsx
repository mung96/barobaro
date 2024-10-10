'use client';

import SearchEnterSVG from '@/components/(SVG_component)/SearchEnter';
import useSearchModel from '@/hooks/products/useSearchModel';

export default function SearchBar() {
  const { handleSearch, goSearch } = useSearchModel();
  return (
    <section className="flex justify-center">
      <div className="flex flex-row h-12 w-[90%] items-center justify-between rounded-[52px] shadow-xl bg-white">
        <div className="ml-3 flex flex-1">
          <input
            name="search_input"
            type="search"
            id="search_input"
            placeholder="검색어를 입력해주세요."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full outline-none [&::-webkit-search-cancel-button]:appearance-none ml-5"
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
