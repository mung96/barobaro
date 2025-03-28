'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import LightStick from '@/components/(SVG_component)/LightStick';
import SmartPhone from '@/components/(SVG_component)/SmartPhone';
import TeleScope from '@/components/(SVG_component)/TeleScope';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import CameraLens from '@/components/(SVG_component)/CameraLens';
import Etc from '@/components/(SVG_component)/Etc';
import categoryNameList from '@/services/products/category';
import { CategoryCardType } from '@/types/products/products';
import {useEffect} from "react";
import {getSearchData} from "@/apis/searchProductsApi";
import { useMain } from '@/store/useLocationStore'

export default function CategoryCard({
  type,
  selected,
  searchData,
}: CategoryCardType) {
  const btnList = {
    all: null,
    lightstick: (
      <LightStick
        fill={selected ? '#3897F0' : '#B6BDC8'}
        width="15"
        height="15"
      />
    ),
    smartphone: (
      <SmartPhone
        fill={selected ? '#3897F0' : '#B6BDC8'}
        width="10"
        height="20"
      />
    ),
    telescope: (
      <TeleScope
        fill={selected ? '#3897F0' : '#B6BDC8'}
        width="16"
        height="14"
      />
    ),
    camerabody: (
      <CameraBody
        fill={selected ? '#3897F0' : '#B6BDC8'}
        width="18"
        height="14"
      />
    ),
    cameralens: (
      <CameraLens
        fill={selected ? '#3897F0' : '#B6BDC8'}
        width={15}
        height={15}
      />
    ),
    etc: <Etc fill={selected ? '#3897F0' : '#B6BDC8'} width="15" height="15" />,
  };
  const btn = btnList[type as keyof typeof btnList];
  const categoryList = categoryNameList;
  const title = categoryList[type as keyof typeof categoryList];
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetLocation = useMain()

  // API 호출 함수
  const fetchSearchData = async (category: string, keywords: string) => {
    try {
      const locationId: number = targetLocation; // locationId를 1로 고정
      const results = await getSearchData(keywords, category, locationId);
      console.log('Search results:', results);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const category = searchParams.get('category');
    const product = searchParams.get('product');

    if (category && product) {
      fetchSearchData(category, product);
    }
  }, [searchParams]);

  const handleClick = () => {
    if (!selected) {
      const queryParams = new URLSearchParams({
        category: type,
        product: searchData,
      });
      router.push(`/search?${queryParams.toString()}`);
      fetchSearchData(type, searchData);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex justify-evenly items-center w-[85px] h-[30px] rounded-[5px] text-[12px] ${
        selected
          ? 'border-[1px] border-blue-100 text-blue-100'
          : 'bg-gray-100 text-gray-200'
      }`}
    >
      {btn !== null && <span>{btn}</span>}
      <span>{title}</span>
    </button>
  );
}
