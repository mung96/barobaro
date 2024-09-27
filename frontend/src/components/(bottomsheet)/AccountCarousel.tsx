// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      centeredSlides={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <SwiperSlide>
        <div className="w-[300px] h-[200px] bg-amber-200 mx-auto"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[300px] h-[200px] bg-amber-200 mx-auto"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[300px] h-[200px] bg-amber-200 mx-auto"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[300px] h-[200px] bg-amber-200 mx-auto"></div>
      </SwiperSlide>
      ...
    </Swiper>
  );
};
