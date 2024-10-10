import { useEffect, useState } from 'react';
import WebSocketClient from '@/utils/webSocketClient';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { UUID } from 'crypto';
import currentTime from '@/utils/currentTime';

export default function useSocketClientModel(
  messageAddHandler: (messages: MessageFormType[]) => void,
  chatRoomId: number,
) {
  const [socketClient, setSocketClient] = useState<WebSocketClient | null>(null);
  const [messageList, setMessageList] = useState<MessageFormType[]>([]);

  // 백엔드 메시지 타입
  type BackMessageFormType = {
    // chatRoomId: number;
    uuid: UUID | string; // API 연결 이후 UUID only Type으로 바꾸기
    message: string;
    image: string | null; // image src
    chatTime: string;
    chatType: string;
  };

  const chatTypeConverterToBe = (type: number) => {
    switch (type) {
      case 1:
        return 'USER';
      case 2:
        return 'STATUS';
      case 3:
        return 'SYSTEM';
      default:
        return 'ERROR'; // 이런 타입은 없다 ...
    }
  };

  const chatTypeConverterFromBe = (type: string, image: string | null) => {
    switch (type) {
      case 'USER': {
        if (image) return 4;
        return 1;
      }
      case 'STATUS':
        return 2;
      case 'SYSTEM':
        return 3;
      default:
        return 5; // 이런 타입은 없다.
    }
  };

  const chatConverterToBe = (message: MessageFormType) => {
    const convertedChatType: BackMessageFormType = {
      // chatRoomId:
      uuid: message.user,
      message: message.body,
      image: message.type === 4 ? message.body : null,
      chatTime: currentTime('back'),
      chatType: chatTypeConverterToBe(message.type),
    };

    return convertedChatType;
  };

  const chatConverterFromBe = (message: BackMessageFormType) => {
    const convertedChatType: MessageFormType = {
      user: message.uuid,
      type: chatTypeConverterFromBe(message.chatType, message.image),
      timestamp: currentTime(message.chatTime),
      body: message.message,
    };

    return convertedChatType;
  };

  const sendChat = (message: MessageFormType) => {
    if (!socketClient) return;
    // const destination: string = '/pub/message';
    const destination: string = `/pub/chatrooms/${chatRoomId}`;
    // const destination: string = `${END_POINT.SOCKET_PUBLISH}/${value.chatRoomId}`

    const msg: string = JSON.stringify(chatConverterToBe(message));

    if (socketClient !== null) socketClient.send(destination, msg);
  };

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

          setMessageList((_messageList) => [..._messageList, toMessageFormType]);

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

  useEffect(() => {
    messageAddHandler(messageList);
  }, [messageList]);

  return { socketClient, sendChat };
}
