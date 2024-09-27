import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { searchHookType } from '@/types/products/products';

export function useSearchModel(): searchHookType {
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
  return {
    search,
    handleSearch,
    goSearch,
  };
}
