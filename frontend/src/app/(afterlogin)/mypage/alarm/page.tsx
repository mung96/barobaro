'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import BlueToggle from '@/components/(toggle)/BlueToggle';

import { useState } from 'react';
import Header from '@/components/Header';

export default function AlarmSetting() {
  const [priceChange, setPriceChange] = useState(true);
  const [chatAlarm, setChatAlarm] = useState(false);

  return (
    <NavBarLayout current="mypage">
      <header className="flex flex-col items-center font-bold text-[15px] text-black-100">
        <Header pageName="" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
        알람 수신 설정
      </header>
      <main className="flex flex-col items-center">
        <section className="text-black-100 mt-[45px] w-[92dvw]">
          <h1 className="text-[10px] font-light">서비스별</h1>
          <section className="mx-5 my-5">
            <h2 className="text-[14px]">물품대여</h2>
            <div className="mx-1 my-2 flex flex-row justify-between">
              <div>
                <h3 className="text-[12px]">가격 변동</h3>
                <p className="text-[10px] text-gray-600">찜한 게시글의 가격이 달라진 경우 알려드려요!</p>
              </div>
              <button type="button" onClick={() => setPriceChange(!priceChange)}>
                <BlueToggle isSelected={priceChange} />
              </button>
            </div>
          </section>
          <section className="mx-5 my-5">
            <h2 className="text-[14px]">채팅</h2>
            <div className="mx-1 my-2 flex flex-row justify-between">
              <div>
                <h3 className="text-[12px]">채팅 알림</h3>
                <p className="text-[10px] text-gray-600">채팅 메시지가 왔을 때 알려드려요!</p>
              </div>
              <button type="button" onClick={() => setChatAlarm(!chatAlarm)}>
                <BlueToggle isSelected={chatAlarm} />
              </button>
            </div>
          </section>
        </section>
      </main>
    </NavBarLayout>
  );
}
