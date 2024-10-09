'use client';

import { useEffect } from "react";
import Header from "@/components/Header";
import {getAlerts} from "@/apis/alertApi";
import AlertComponent from "@/components/alert/AlertComponent";

export default function AlertPage() {
  useEffect(() => {
    // TODO : 해당 페이지가 랜더링되면, 알람이 무엇 있는지 확인해야합니다.
    // TODO : 혹은, home으로 갈 때, store에 저장하고 있다가, 이를 빼서 써야합니다.
    console.log('ALERT PAGE')
    const res = getAlerts()
  })
  return (
    <div>
      <Header pageName="알람" hasPrevBtn hasSearchBtn={false} hasAlertBtn={false} chatId="temp"/>
      <section className="flex flex-col items-center w-full mb-10">
        {/*TODO : alarm data가 정상적으로 들어온다면, 해당 컴포넌트를 반복적으로 만들면 된다!*/}
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
        <AlertComponent nickname="BiBimking" message='님이 비빔을 신청하셨습니다' orderType="비빔 신청" profileUrl='tempUrl' timeData='1분전' chatId="temp"/>
      </section>
    </div>
  )
}