import { useEffect, useRef, useState } from 'react';
import MessageFormType from '@/components/message/chat/MessageFormType';

const useChatDialogsModel = (messages: MessageFormType[]) => {
  const [wholeMessages, setWholeMessages] = useState<MessageFormType[]>([]);
  const endOfPageRef = useRef<HTMLDivElement | null>(null);

  // axios로 메시지 받아오는 로직 추가해야 함(wholeMessages 세팅)

  useEffect(() => {
    // useSocketClientModel -> handleAddMessages (page.tsx) -> messages
    // 웹소켓으로 메시지를 수신했을 때
    setWholeMessages(messages);
  }, [messages]);

  useEffect(() => {
    // 메시지 수신하면 스크롤을 가장 아래로
    if (endOfPageRef.current) {
      endOfPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [wholeMessages]);

  return { wholeMessages, endOfPageRef };
};

export default useChatDialogsModel;
