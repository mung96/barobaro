'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';
import CategorySearch from '@/components/(category_button)/searchbar/CategorySearch';
import { useSearchParams } from 'next/navigation';
export default function CategoryDetail() {
  const searchParams = useSearchParams();
  const categoryData = searchParams.get('category')!;
  const searchData = searchParams.get('product')!;
  return (
    <NavBarLayout current="home">
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
          <Header pageName="홈" hasPrevBtn hasSearchBtn hasAlertBtn />
          <CategorySearch now={categoryData} searchData={searchData} />
          {categoryData} - {searchData}
        </div>
      </div>
    </NavBarLayout>
  );
}
