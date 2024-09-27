// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertAccountColor } from '@/services/account/accountcolor';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AccountListRequest } from '@/types/apis/accountResquest';

export default () => {
  const accounts: AccountListRequest = [
    {
      bank: '국민은행',
      accountNumber: '3333-05-681789',
      accountId: 10000,
      main: true,
    },
    {
      bank: '신한은행',
      accountNumber: '3333-05-681789',
      accountId: 10001,
      main: false,
    },
    {
      bank: '국민은행',
      accountNumber: '3333-05-681789',
      accountId: 10002,
      main: false,
    },
  ];
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      centeredSlides={true}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {accounts.map((account) => (
        <SwiperSlide key={account.accountId}>
          <div
            className="w-[300px] h-[200px] mx-auto rounded-[8px]"
            style={{ backgroundColor: convertAccountColor(account) }}
          >
            <p>Bank: {account.bank}</p>
            <p>Account Number: {account.accountNumber}</p>
            <p>Main Account: {account.main ? 'Yes' : 'No'}</p>
          </div>
        </SwiperSlide>
      ))}
      <SwiperSlide>
        <div className="w-[300px] h-[200px] mx-auto rounded-[8px] bg-gray-100">
          추가하기(설정)
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
