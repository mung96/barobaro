import { useEffect, useState } from 'react';
import WebSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { UUID } from 'crypto';
import currentTime from '@/utils/currentTime';

export default function useSocketClientModel(
  UserId: string,
  messageAddHandler: (messages: MessageFormType[]) => void,
  chatRoomId: number,
) {
  const [socketClient, setSocketClient] = useState<WebSocketClient | null>(
    null,
  );
  const [messageList, setMessageList] = useState<MessageFormType[]>([]);

  // 백엔드 메시지 타입
  type BackMessageFormType = {
    // chatRoomId: number;
    uuid: UUID | string; // API 연결 이후 UUID only Type으로 바꾸기
    message: string;
    image: string | null; // image src
    chatTime: string; // Date에서 시간이랑 초 자르고 보내야 함. currentTime.formatDate
    chatType: string;
  };

  const chatTypeConverter = (type: number) => {
    switch (type) {
      case 1:
        return 'user';
      case 2:
        return 'status';
      case 3:
        return 'system';
      default:
        return 'error'; // 이런 타입은 없다 ...
    }
  };

  const chatConverter = (message: MessageFormType) => {
    const convertedChatType: BackMessageFormType = {
      // chatRoomId:
      uuid: message.user,
      message: message.body,
      image: message.type === 4 ? message.body : null,
      chatTime: currentTime('back'),
      chatType: chatTypeConverter(message.type),
    };

    return convertedChatType;
  };

  const sendChat = (message: MessageFormType) => {
    if (!socketClient) return;
    // const destination: string = '/pub/message';
    const destination: string = `/pub/chatrooms/${chatRoomId}`;
    // const destination: string = `${END_POINT.SOCKET_PUBLISH}/${value.chatRoomId}`

    const msg: string = JSON.stringify(chatConverter(message));

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
