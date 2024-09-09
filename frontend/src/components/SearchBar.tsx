'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SearchEnterSVG from '@/components/(SVG_component)/SearchEnter';

export default function SearchBar() {
  const router = useRouter();
  function handleInput(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = form.elements.namedItem('search_input') as HTMLInputElement;
    const input = data.value;
    router.push(`/search?query=${input}`);
  }
  return (
    <section className="flex justify-center">
      <form onSubmit={handleInput} role="search" className="flex flex-row h-12 w-[90%] items-center justify-between rounded-[52px] shadow-xl bg-white">
        <div className="ml-3">
          <input name="search_input" type="search" id="search_input" placeholder="검색어를 입력해주세요." required />
        </div>
        <button className="mr-3">
          <SearchEnterSVG />
        </button>
      </form>
    </section>
  );
}
