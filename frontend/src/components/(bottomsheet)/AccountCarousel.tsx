// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Account, AccountListRequest } from '@/types/apis/accountResquest';
import AccountCard from '@/components/(bottomsheet)/AccountCard';

export default function () {
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
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const handleAccountSelect = (accountId: number) => {
    if (accountId === selectedAccount) setSelectedAccount(null);
    else setSelectedAccount(accountId);
  };

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      centeredSlides
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {accounts.map((account) => (
        <SwiperSlide key={account.accountId}>
          <div onClick={() => handleAccountSelect(account.accountId)}>
            <AccountCard
              bank={account.bank}
              accountNumber={account.accountNumber}
              main={account.main}
              isSelected={account.accountId === selectedAccount}
            />
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
}
