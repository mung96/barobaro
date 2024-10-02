'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';
import CategorySearch from '@/components/(category_button)/searchbar/CategorySearch';
import { useSearchParams } from 'next/navigation';
import ItemList from '@/components/ItemList';

function getSearchData(data: string) {
  const searchParams = useSearchParams();
  return searchParams.get(data);
}

export default function CategoryDetailContent() {
  const categoryData = getSearchData('category') || '';
  const searchData = getSearchData('product') || '';

  return (
    <NavBarLayout current="home">
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
          <Header pageName="홈" hasPrevBtn hasSearchBtn hasAlertBtn />
          <CategorySearch now={categoryData} searchData={searchData} />"
          {searchData}" 검색 결과
          <ItemList data="search" />
        </div>
      </div>
    </NavBarLayout>
  );
}
