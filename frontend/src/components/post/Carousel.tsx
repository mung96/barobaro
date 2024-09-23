'use client';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CSSProperties, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import CarouselButtonSVG from '@/components/post/CarouselButtonSVG';
import css from 'styled-jsx/css';

export default function PictureCarousel() {
  const pictureList = [
    faker.image.urlLoremFlickr({ width: 300, height: 300 }),
    faker.image.urlLoremFlickr({ width: 300, height: 300 }),
    faker.image.urlLoremFlickr({ width: 300, height: 300 }),
    faker.image.urlLoremFlickr({ width: 300, height: 300 }),
  ];

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '400px',
  };

  const swiperStyle: CSSProperties = {
    width: '300px',
    height: '300px',
  };

  const slideStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div style={containerStyle}>
      <Swiper
        style={swiperStyle}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {pictureList.map((item, index) => (
          <SwiperSlide key={index} style={slideStyle}>
            <Image src={item} alt={`image-${index}`} width={300} height={300} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="left-0 absolute top-[50%]"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <CarouselButtonSVG dir="left" />
      </button>
      <button
        type="button"
        className="right-0 absolute top-[50%]"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <CarouselButtonSVG dir="right" />
      </button>
    </div>
  );
}
