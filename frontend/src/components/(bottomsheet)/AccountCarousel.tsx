// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Account } from '@/types/apis/accountResquest';
import AccountCard from '@/components/(bottomsheet)/AccountCard';
import AddAccountSVG from '@/components/(SVG_component)/(mypage)/AddAccountSVG';

// TODO : main == true 인 경우 맨 앞에 표시되도록
export default function AccountCarousel() {
  const accounts: Account[] = [
    {
      bank: '국민은행',
      accountNumber: '3333-05-681789',
      accountId: 10000,
      main: false,
    },
    {
      bank: '신한은행',
      accountNumber: '3333-05-681789',
      accountId: 10001,
      main: true,
    },
    {
      bank: '국민은행',
      accountNumber: '3333-05-681789',
      accountId: 10002,
      main: false,
    },
  ];
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const handleAccountSelect = (accountInfo: Account) => {
    if (accountInfo.accountId === selectedAccount) setSelectedAccount(null);
    else if (accountInfo.main === false)
      setSelectedAccount(accountInfo.accountId);
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
          <div role="none" onClick={() => handleAccountSelect(account)}>
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
        <div className="w-[300px] h-[200px] mx-auto rounded-[8px] bg-gray-100 flex justify-center items-center">
          <AddAccountSVG size={30} color="#D9D9D9" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
