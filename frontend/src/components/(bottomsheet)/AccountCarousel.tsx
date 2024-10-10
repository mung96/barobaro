'use client';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useAccountList } from "@/store/useAccountStore";
import { useSetSelectedAccount, useSelectedAccount } from "@/store/useBottomSheetStore"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Account } from '@/types/apis/accountResquest';
import AccountCard from '@/components/(bottomsheet)/AccountCard';
import AddAccountSVG from '@/components/(SVG_component)/(mypage)/AddAccountSVG';
import accountSort from '@/services/account/accountsort';

export default function AccountCarousel() {
  const accountsInfo = useAccountList();
  const accounts = accountSort(accountsInfo);
  const selectedStore = useSelectedAccount();
  const setSelectedStore = useSetSelectedAccount();
  const handleAccountSelect = (accountInfo: Account) => {
    if (accountInfo.accountId === selectedStore) setSelectedStore(0);
    else if (accountInfo.main === false)
      setSelectedStore(accountInfo.accountId);
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
              isSelected={account.accountId === selectedStore}
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
