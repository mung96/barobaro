import { createContext, ReactNode, useState } from 'react';
import WebSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';

interface SocketClientContextType {
  socketClient: WebSocketClient;
  sendChat: (msg: MessageFormType) => void;
  chatRoomId: number;
}

const SocketClientContext = createContext<SocketClientContextType | null>(null);

interface SocketClientProviderProps {
  children: ReactNode;
  value: SocketClientContextType;
}

const SocketClientProvider = ({
  children,
  value,
}: SocketClientProviderProps) => {
  const socketClient: WebSocketClient = value.socketClient;

  const chatRoomId: number = value.chatRoomId;

  // const sendChat = (message: MessageFormType) => {
  //   const destination: string = '/pub/message';
  //   // const destination: string = `${END_POINT.SOCKET_PUBLISH}/${value.chatRoomId}`
  //   const msg: string = JSON.stringify(message);

  //   socketClient.send(destination, msg);
  // };

  const sendChat: (message: MessageFormType) => void = value.sendChat;

  return (
    <SocketClientContext.Provider
      value={{ socketClient, sendChat, chatRoomId }}
    >
      {children}
    </SocketClientContext.Provider>
  );
};

export { SocketClientProvider, SocketClientContext };
