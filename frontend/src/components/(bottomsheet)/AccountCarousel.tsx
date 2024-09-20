'use client';

import React, { useState, useEffect } from 'react';
import AccountCard from '@/components/(bottomsheet)/AccountCard';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CSSProperties } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function AccountCarousel() {
  const [width, setWidth] = useState(window.innerWidth > 500 ? 500 : window.innerWidth);
  const handleWidthChange = () => {
    setWidth(window.innerWidth > 500 ? 500 : window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleWidthChange);
    return () => {
      window.removeEventListener('resize', handleWidthChange);
    };
  }, []);

  const accountList = [{
    account_number: 1,
    isSelected: false,
    bank: '국민',
    account_name: '나라사랑',
  },
  {
    account_number: 2,
    isSelected: false,
    bank: '토스',
    account_name: '토스',
  },
  {
    account_number: 3,
    isSelected: true,
    bank: '신한',
    account_name: 'SOL',
  },
  {
    account_number: 4,
    isSelected: false,
    bank: '카카오',
    account_name: '카카오',
  },
  ];

  const swiperStyle: CSSProperties = {
    paddingBottom: '30px',
  };

  const swiperCustomStyles = {
    '--swiper-pagination-bullet-inactive-color': '#999999',
    '--swiper-pagination-bullet-inactive-opacity': '1',
    '--swiper-pagination-bullet-size': '8px',
  } as Record<string, string>;

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.5}
      centeredSlides
      initialSlide={0}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      style={{ ...swiperStyle, ...swiperCustomStyles }}
    >
      {accountList.map((item) => (
        <SwiperSlide key={item.account_number}>
          <AccountCard
            width={width}
            isSelected={item.isSelected}
            bank={item.bank}
            account_name={item.account_name}
          />
        </SwiperSlide>
      ))}
      <SwiperSlide key={accountList.length}>
        <div className="bg-gray-300 m-4 flex flex-col rounded-[10px] justify-center items-center" style={{ width: `${width * 0.6}px`, height: `${width * 0.35}px` }}>
          <button type="button">추가하기</button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
