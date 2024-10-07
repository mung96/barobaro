import { getMessageRoomInfo } from '@/apis/message/chat/messageRoomInfoApi';
import MessageFormType from '@/components/message/chat/MessageFormType';
import {
  ProcessType,
  ProcessTypes,
} from '@/components/message/chat/ProcessTypes';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const useChatPageModel = () => {
  // room PK
  const { chat_id: chatId } = useParams();
  const chatRoomId: number = Number(chatId); // 무조건 숫자로 넘어옴

  // 레거시 ===============
  const otherNickname: string =
    typeof chatId === 'string' ? decodeURI(chatId) : '찾을 수 없는 사용자';
  const roomName: string = `${typeof chatId === 'string' && decodeURI(chatId)}님과의 채팅`;
  // =========================== roomName의 경우 apiResponse 도착한 후 상대 닉네임 꺼내기

  // 계약 진행 단계를 나타내는 process
  const [process, setProcess] = useState<ProcessType>(ProcessTypes.CONTACT); // apiResponse 도착한 후 초기화
  const processConverter = (step: string) => {
    switch (step) {
      case 'AVAILABLE':
        return ProcessTypes.CONTACT;
      case 'APPLICATION':
        return ProcessTypes.REQUESTED;
      case 'NEED_OWNER_SIGN':
        return ProcessTypes.REQUESTED;
      case 'OWNER_SIGNED':
        return ProcessTypes.ACCEPTED_DIRECT;
      case 'APPROVED':
        return ProcessTypes.SIGNED_DIRECT; // 택배 진행하지 않음

      // 이 사이는 ? RECEIVED(대여자 물품 수령) / PAID (대여자 송금)

      case 'FINISHED':
        return ProcessTypes.FINISHED;
      default: // 나타날 일이 없는 수치
        return ProcessTypes.MODIFIED;
    }
  };

  const processSetter = (step: ProcessType) => {
    // 컴포넌트들이 공유할 setter method
    setProcess(step);
  };

  // 스크롤 최하단부터 보이게 하기 위해 지정
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    // API
    const getResponse = async () => {
      try {
        const apiResponse = await getMessageRoomInfo(chatRoomId);
        console.log(apiResponse);
        // setProcess(processConverter(apiResponse.chatRoomDto.rentalStatus));
      } catch (e) {
        console.error('API 요청 중 오류 발생:', e);
      }
    };

    getResponse();

    // api 연결 후 아래 라인 삭제하기
    setProcess(processConverter('AVAILABLE'));
  }, []);

  // message list
  const [messages, setMessages] = useState<MessageFormType[]>([]);
  const handleAddMessages = (message: MessageFormType[]): void => {
    // client 객체에 props로 넘기는 message setter
    setMessages(message);
  };

  return {
    process,
    processSetter,
    messages,
    handleAddMessages,
    roomName,
    scrollRef,
    otherNickname,
  };
};

export default useChatPageModel;
