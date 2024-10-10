import { useContext, useEffect, useState } from 'react';
import WebSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { chatConverterFromBe, chatConverterToBe } from '@/services/message/chat/chatConverter';
import { BackMessageFormType } from '@/types/message/chat/BackMessageFormType';
import chatProcessConverter from '@/services/message/chat/chatProcessConverter';
import { ProcessContext } from '@/contexts/ChatProcessContext';
import { ProcessType } from '@/components/message/chat/ProcessTypes';

export default function useSocketClientModel(
  messageAddHandler: (messages: MessageFormType) => void,
  chatRoomId: number,
) {
  const [socketClient, setSocketClient] = useState<WebSocketClient | null>(null);
  const [eventedProcess, setEventedProcess] = useState<ProcessType>();

  const sendChat = (message: MessageFormType) => {
    if (!socketClient) return;
    const destination: string = `/pub/chatrooms/${chatRoomId}`;

    const msg: string = JSON.stringify(chatConverterToBe(message));

    if (socketClient !== null) socketClient.send(destination, msg);
  };

  // // ===================== context 사용
  // const context = useContext(ProcessContext);
  // if (!context) return { socketClient, sendChat };
  // const { processSetter } = context;
  // // =================== context 사용하면 렌더가 아예 안 됨.

  useEffect(() => {
    const client = new WebSocketClient();
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
        //   socketClient.subscribe(`/sub/message/${UserId}`, (message) => {
        socketClient.subscribe(`/sub/chatrooms/${chatRoomId}`, (message) => {
          const parsedMessage: BackMessageFormType = JSON.parse(message.body);
          console.log(`useSocketClientModel:line 82, detected new Message : ${message.body}`);

          // 메시지 타입으로 반환하기
          const toMessageFormType: MessageFormType = chatConverterFromBe(parsedMessage);
          messageAddHandler(toMessageFormType);
          const convertedType = chatProcessConverter(toMessageFormType);

          // !
          // if (convertedType) processSetter(convertedType);
          if (convertedType) setEventedProcess(convertedType);

          return () => {
            socketClient.disconnect();
          };
        });
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    };

    connectWebSocket();
  }, [socketClient]);

  return { socketClient, sendChat, eventedProcess };
}
