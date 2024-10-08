'use client';

import { useState } from 'react';
import BlueToggle from '@/components/(toggle)/BlueToggle';
import { requestPermissionAndGetToken } from '@/services/user/fcm';

function AlarmToggle() {
  const [chatAlarm, setChatAlarm] = useState(false);
  const toggleAlarm = async (prevAlarmState:boolean) =>{
    const curAlarmState = !prevAlarmState;
    if(curAlarmState){
      await requestPermissionAndGetToken();
    }

    setChatAlarm(curAlarmState)
  }

  return (
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
  );
}

export default AlarmToggle;