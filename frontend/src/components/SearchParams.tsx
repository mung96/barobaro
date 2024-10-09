'use client';

import Header from '@/components/Header';
import CategorySearch from '@/components/(category_button)/searchbar/CategorySearch';
import { useSearchParams } from 'next/navigation';
import ItemList from '@/components/ItemList';
import { useEffect, useState } from 'react';
import {getSearchData} from "@/apis/searchProductsApi";
import {useCurrentActions} from "@/store/useCurrentStore";
import {useMain, useSetLocations} from "@/store/useLocationStore";
import {getLocation} from "@/apis/profileApi";

function useGetSearchData(data: string) {
  const searchParams = useSearchParams();
  return searchParams.get(data);
}

export default function CategoryDetailContent() {
  const useSearchStore = useCurrentActions()
  const categoryData = useGetSearchData('category') || '';
  const searchData = useGetSearchData('product') || '';
  const mainLoationId = useMain()
  const setLocations = useSetLocations();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocation();
        setLocations(response);

      } catch (error) {
        console.error("위치 정보를 가져오는데 실패했습니다:", error);
      }
    };
    fetchLocations();


    async function getSearchOutput() {
      try {
        console.log('CATE', categoryData, 'SEARCH', searchData);
        const result = await getSearchData(searchData, categoryData, mainLoationId);
        useSearchStore.setSearchList(result);
      } catch (err) {
        console.log('search Result Err', err)
      }
    }
    getSearchOutput()
  }, [])
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
          <Header pageName="홈" hasPrevBtn hasSearchBtn hasAlertBtn/>
          <CategorySearch now={categoryData} searchData={searchData}/>
        </div>
        <div className="mt-[100px]">
          <ItemList data="search"/>
        </div>
      </div>
    </>
  );
}
