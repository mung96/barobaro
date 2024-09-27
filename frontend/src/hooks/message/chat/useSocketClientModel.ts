import { useEffect, useState } from 'react';
import webSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';

export default function useSocketClientModel(
  UserId: string,
  messageAddHandler: (messages: MessageFormType[]) => void,
) {
  const [socketClient, setSocketClient] = useState<webSocketClient | null>(
    null,
  );
  const [messageList, setMessageList] = useState<MessageFormType[]>([]);

  useEffect(() => {
    const client = new webSocketClient(UserId);
    setSocketClient(client);

    return () => {
      if (client) client.disconnect();
    };
  }, []);

  useEffect(() => {
    const connectWebSocket = async () => {
      if (!socketClient) return;
      try {
        await socketClient.connect();
        console.log('STOMP connected');
        socketClient.subscribe('/sub/message/' + UserId, (message) => {
          const parsedMessage = JSON.parse(message.body);

          // 메시지 타입으로 반환하기
          const toMessageFormType: MessageFormType = {
            user: parsedMessage.user,
            type: parsedMessage.type,
            timestamp: parsedMessage.timestamp,
            body: parsedMessage.body,
          };

          setMessageList((messageList) => [...messageList, toMessageFormType]);
        });

        return () => {
          socketClient.disconnect();
        };
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    };

    connectWebSocket();
  }, [socketClient]);

  useEffect(() => {
    messageAddHandler(messageList);
  }, [messageList]);

  return socketClient;
}
