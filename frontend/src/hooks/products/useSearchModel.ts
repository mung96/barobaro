import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchHookType } from '@/types/products/products';

function useSearchModel(): SearchHookType {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const goSearch = () => {
    return search.length !== 0
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

export default useSearchModel;
