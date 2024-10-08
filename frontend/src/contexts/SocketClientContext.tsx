import { createContext, ReactNode, useMemo } from 'react';
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
  const { socketClient, chatRoomId, sendChat } = value; // 구조 분해

  // useMemo로 감싸기
  const contextValue = useMemo(
    () => ({
      socketClient,
      sendChat,
      chatRoomId,
    }),
    [socketClient, sendChat, chatRoomId],
  );

  return (
    <SocketClientContext.Provider value={contextValue}>
      {children}
    </SocketClientContext.Provider>
  );
};

export { SocketClientProvider, SocketClientContext };
