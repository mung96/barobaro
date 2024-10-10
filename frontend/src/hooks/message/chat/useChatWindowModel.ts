import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import MessageFormType from '@/components/message/chat/MessageFormType';
import currentTime from '@/utils/currentTime';
import { SocketClientContext } from '@/contexts/SocketClientContext';
import { useProfileObject } from '@/store/useMyProfile';

const useChatWindowModel = () => {
  const [chatValue, setChatValue] = useState('');
  const messageRef = useRef<HTMLInputElement>(null);
  const profile = useProfileObject();

  const handleChatValue = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };
  const context = useContext(SocketClientContext);
  if (!context)
    return {
      // context에서 사용하지 않는 것들은 그대로 리턴
      // context가 없으면 반환하지 못하는 것들은 null(변수)이나 () => {}(함수)로 리턴
      chatValue,
      messageRef,
      handleChatValue,
      sendChat: () => {},
      handleEnterPress: () => {},
    };
  const { sendChat } = context;

  // const sendChat = () => {
  const sendChatExtend = () => {
    const tempMsg: MessageFormType = {
      type: 1,
      user: profile.id,
      body: chatValue,
      timestamp: currentTime(),
    };

    sendChat(tempMsg);
    setChatValue('');
    messageRef.current?.focus();
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키 누르면 전송
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChatExtend();
    }
  };

  return {
    chatValue,
    messageRef,
    handleChatValue,
    sendChat: sendChatExtend,
    handleEnterPress,
  };
};

export default useChatWindowModel;
