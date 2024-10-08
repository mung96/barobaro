import { useContext, useEffect, useState } from 'react';
import WebSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { SocketClientContext } from '@/contexts/SocketClientContext';

export default function useSocketClientModel(
  UserId: string,
  messageAddHandler: (messages: MessageFormType[]) => void,
  chatRoomId: number,
) {
  const [socketClient, setSocketClient] = useState<WebSocketClient | null>(
    null,
  );
  const [messageList, setMessageList] = useState<MessageFormType[]>([]);

  // const context = useContext(SocketClientContext);
  // if (!context) {
  //   console.error('SocketClientContext is not available.');
  //   return { socketClient: null, sendChat: () => {} }; // 기본적으로 빈 함수 반환
  // }
  // const { chatRoomId } = context;

  // useContext(SocketClientContext)

  const sendChat = (message: MessageFormType) => {
    if (!socketClient) return;
    // const destination: string = '/pub/message';
    const destination: string = `/pub/chatrooms/${chatRoomId}`;
    // const destination: string = `${END_POINT.SOCKET_PUBLISH}/${value.chatRoomId}`
    const msg: string = JSON.stringify(message);

    if (socketClient !== null) socketClient.send(destination, msg);
  };

  useEffect(() => {
    const client = new WebSocketClient(UserId);
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
          const parsedMessage = JSON.parse(message.body);

          // 메시지 타입으로 반환하기
          const toMessageFormType: MessageFormType = {
            user: parsedMessage.user,
            type: parsedMessage.type,
            timestamp: parsedMessage.timestamp,
            body: parsedMessage.body,
          };

          setMessageList((_messageList) => [
            ..._messageList,
            toMessageFormType,
          ]);

          return () => {
            socketClient.disconnect();
          };
        });
      } catch (error) {
        // console.error('Error connecting to WebSocket:', error);
      }
    };

    connectWebSocket();
  }, [socketClient]);

  useEffect(() => {
    messageAddHandler(messageList);
  }, [messageList]);

  return { socketClient, sendChat };
}
