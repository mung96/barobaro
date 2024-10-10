import { BackMessageFormType } from '@/types/message/chat/BackMessageFormType';
import MessageFormType from '@/components/message/chat/MessageFormType';
import currentTime from '@/utils/currentTime';

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

export const chatConverterToBe = (message: MessageFormType) => {
  const convertedChatType: BackMessageFormType = {
    uuid: message.user,
    message: message.body,
    image: message.type === 4 ? message.body : null,
    chatTime: currentTime('back'),
    chatType: chatTypeConverterToBe(message.type),
  };

  return convertedChatType;
};

export const chatConverterFromBe = (message: BackMessageFormType) => {
  const convertedChatType: MessageFormType = {
    id: message?.chatId,
    user: message.uuid,
    type: chatTypeConverterFromBe(message.chatType, message.image),
    timestamp: currentTime(message.chatTime),
    body: message.message,
  };

  return convertedChatType;
};
