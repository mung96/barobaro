import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchHookType } from '@/types/products/products';
import {getSuggest} from "@/apis/searchSuggestApi";

function useSearchModel(): SearchHookType {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [recommendData, setRecommendData] = useState<any>('');
  const handleSearch = async (value: string) => {
    setSearch(value);
    const res = await getSuggest(value)
    if (search.length === 0) {
      setRecommendData("")
    } else {
      setRecommendData(res)
    }
    console.log('useSearchModel', res)
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
  const goSearchWord = (category: any, word: any) => {
    const queryParams = new URLSearchParams({
      category: category,
      product: word,
    });
    router.push(`/search?${queryParams.toString()}`);
  }
  return {
    search,
    handleSearch,
    goSearch,
    setRecommendData,
    recommendData,
    goSearchWord
  };
}

export default useSearchModel;
