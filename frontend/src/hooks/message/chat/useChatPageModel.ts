import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useChatPageModel = () => {
  const { chat_id: chatId } = useParams();
  const otherNickname: string =
    typeof chatId === 'string' ? decodeURI(chatId) : '찾을 수 없는 사용자';
  const roomName: string = `${typeof chatId === 'string' && decodeURI(chatId)}님과의 채팅`;

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);
  return { roomName, scrollRef, otherNickname };
};

export default useChatPageModel;
