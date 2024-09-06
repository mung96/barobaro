'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_222_444)" />
            <circle cx="16" cy="16" r="5" fill="white" />
            <defs>
              <linearGradient
                id="paint0_linear_222_444"
                x1="24"
                y1="26.5"
                x2="16"
                y2="16"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#007AFF" />
                <stop offset="1" stopColor="#3897F0" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </form>
    </section>
  );
}
