'use client';

import { useParams } from 'next/navigation';
// eslint-disable-next-line import/extensions
import Header from '@/components/Header';

export default function Chat() {
  // 채팅 참여 상대방 닉네임 떼어서 저장
  const { chat_id: chatId } = useParams();
  const roomName: string = `${typeof chatId === 'string' && decodeURI(chatId)}님과의 채팅`;
  return (
    <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
  );
}
