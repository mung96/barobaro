'use client';

import { useState } from 'react';
import BlueToggle from '@/components/(toggle)/BlueToggle';
import Header from '@/components/Header';
import { requestPermissionAndGetToken } from '@/services/user/fcm';

export default function AlarmSetting() {
  // const [priceChange, setPriceChange] = useState(true);
  const [chatAlarm, setChatAlarm] = useState(false);
  const toggleAlarm = async (prevAlarmState:boolean) =>{
    const curAlarmState = !prevAlarmState;
    if(curAlarmState){
      await requestPermissionAndGetToken();
    }

    setChatAlarm(curAlarmState)
  }

  return (
    <>
      <header className="flex flex-col items-center font-bold text-[15px] text-black-100">
        <Header pageName="" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
        알람 수신 설정
      </header>
      <main className="flex flex-col items-center">
        <section className="text-black-100 mt-[45px] w-[94%]">
          <h1 className="text-[10px] font-light">서비스별</h1>
          {/* <section className="mx-5 my-5">
            <h2 className="text-[14px]">물품대여</h2>
            <div className="mx-1 my-2 flex flex-row justify-between">
              <div>
                <h3 className="text-[12px]">가격 변동</h3>
                <p className="text-[10px] text-gray-600">
                  찜한 게시글의 가격이 달라진 경우 알려드려요!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPriceChange(!priceChange)}
              >
                <BlueToggle isSelected={priceChange} />
              </button>
            </div>
          </section> */}
          <section className="mx-5 my-5">
            <h2 className="text-[14px]">채팅</h2>
            <div className="mx-1 my-2 flex flex-row justify-between">
              <div>
                <h3 className="text-[12px]">채팅 알림</h3>
                <p className="text-[10px] text-gray-600">
                  채팅 메시지가 왔을 때 알려드려요!
                </p>
              </div>
              <button type="button" onClick={async () => {toggleAlarm(chatAlarm)
              }}>
                <BlueToggle isSelected={chatAlarm} />
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
