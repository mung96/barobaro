'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import {getAlerts} from "@/apis/alertApi";
import AlertComponent from "@/components/alert/AlertComponent";

export default function AlertPage() {
  const [alertData, setAlertData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAlertFunction = async () => {
      try {
        setIsLoading(true);
        const res : any = await getAlerts();
        console.log('@@',res);
        setAlertData(res.data.body.notifications || []);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setAlertData([]);
      } finally {
        setIsLoading(false);
      }
    };
    getAlertFunction();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행
  return (
    <div>
      <Header pageName="알람" hasPrevBtn hasSearchBtn={false} hasAlertBtn={false} />
      <section className="flex flex-col items-center w-full mb-10">
        {/*TODO : alarm data가 정상적으로 들어온다면, 해당 컴포넌트를 반복적으로 만들면 된다!*/}
        {alertData.map((data : any, index) => (
            <AlertComponent key={index} nickname={data.fromMemberNickName} message={data.message} orderType={data.notiType} profileUrl={data.fromMemberImage} timeData='1' chatId='2'/>
        ))}
      </section>
    </div>
  )
}