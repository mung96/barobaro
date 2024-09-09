'use client';

import { usePathname } from 'next/navigation';
// eslint-disable-next-line import/extensions
import Header from '@/components/Header';

export default function Chat() {
  const pathname = decodeURI(usePathname().substring('/message/chat/'.length));
  // 채팅 참여 상대방 닉네임 떼어서 저장
  const roomName: string = `${pathname}님과의 채팅`;

  return (
    <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />

    // 메시지 타입이나 DB 구조에 따라 다르지만 ..
  );
}
