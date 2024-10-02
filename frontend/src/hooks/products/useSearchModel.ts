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
    if (search.length !== 0) {
      const queryParams = new URLSearchParams({
        category: 'all',
        product: search,
      });
      router.push(`/search?${queryParams.toString()}`);
    }
  };
  return {
    search,
    handleSearch,
    goSearch,
  };
}

export default useSearchModel;
