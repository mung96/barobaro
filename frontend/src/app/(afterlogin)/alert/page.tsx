'use client';

import { useEffect } from "react";
import Header from "@/components/Header";
import {getAlerts} from "@/apis/alertApi";
import AlertComponent from "@/components/alert/AlertComponent";

export default function AlertPage() {
  useEffect(() => {
    console.log('ALERT PAGE')
    const res = getAlerts()
    console.log(res, '!!!')
  })
  return (
    <div>
      <Header pageName="알람" hasPrevBtn hasSearchBtn={false} hasAlertBtn={false}/>
      <section className="flex flex-col items-center w-full mb-10">
        {/*TODO : alarm data가 정상적으로 들어온다면, 해당 컴포넌트를 반복적으로 만들면 된다!*/}
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전'/>
      </section>
    </div>
  )
}