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
      <section className="flex flex-col items-center w-full mb-20">
        <AlertComponent/>
      </section>
    </div>
  )
}