'use client';

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import CarouselButtonSVG from '@/components/post/CarouselButtonSVG';

export default function PictureCarousel() {
  const [imageSize, setImageSize] = useState(0);
  const [pictureList, setPictureList] = useState<string[]>([]);

  useEffect(() => {
    setImageSize(window.innerWidth * 0.7);
    setPictureList([
      faker.image.urlLoremFlickr(),
      faker.image.urlLoremFlickr(),
      faker.image.urlLoremFlickr(),
      faker.image.urlLoremFlickr(),
    ]);
  }, []);

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
        loop
        modules={[Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {pictureList.map((item, index) => (
          <SwiperSlide key={item} style={slideStyle}>
            <Image
              src={item}
              alt={`image-${index}`}
              width={imageSize}
              height={imageSize}
            />
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
