import React, { ChangeEvent, useRef, useState } from 'react';
import webSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';
import currentTime from '@/utils/currentTime';

const useChatWindowModel = (client: webSocketClient | null) => {
  const [chatValue, setChatValue] = useState('');
  const messageRef = useRef<HTMLInputElement>(null);

  const handleChatValue = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };

  const UserId = '김말이';

  const sendChat = () => {
    const tempMsg: MessageFormType = {
      type: 1,
      user: UserId,
      body: chatValue,
      timestamp: currentTime(),
    };
    const destination: string = '/pub/message';
    const msg: string = JSON.stringify(tempMsg);

    if (client) client.send(destination, msg);
    setChatValue('');
    messageRef.current?.focus();
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키 누르면 전송
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChat();
    }
  };

  return { chatValue, messageRef, handleChatValue, sendChat, handleEnterPress };
};

export default useChatWindowModel;
