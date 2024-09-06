'use client';

import Header from '@/app/(afterlogin)/_component/Header';
import { usePathname } from 'next/navigation';

export default function Chat() {
  const pathname = usePathname().substring('/message/chat/'.length);
  // 채팅 참여 상대방 닉네임 떼어서 저장
  const roomName: string = `${pathname}님과의 채팅`;

  return (
    <Header pageName={roomName} hasPrevBtn hasSearchBtn={false} hasAlertBtn />
  );
}
