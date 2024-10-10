import { ChatRoomDto, ChatRoomInfoResponse } from './../../../types/apis/chatRoomResponse';
import { getMessageRoomInfo } from '@/apis/message/chat/messageRoomInfoApi';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { ProcessType, ProcessTypes } from '@/components/message/chat/ProcessTypes';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const useChatPageModel = () => {
  // room PK
  const { chat_id: chatId } = useParams();
  const chatRoomId: number = Number(chatId); // 무조건 숫자로 넘어옴

  const [response, setResponse] = useState<ChatRoomInfoResponse>();
  const [otherNickname, setOtherNickname] = useState('');
  const [otherUuid, setOtherUuid] = useState('');
  const [roomName, setRoomName] = useState(``);

  // 계약 진행 단계를 나타내는 process
  const [process, setProcess] = useState<ProcessType>(ProcessTypes.CONTACT); // apiResponse 도착한 후 초기화
  const processConverter = (step: string) => {
    // 백에서 넘어오는 계약 진행 상태를 프론트 버전으로 변경
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

  // useContext(ChatProcessContext)
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
        const apiResponse = await getMessageRoomInfo(chatId[0]);
        // console.log(apiResponse);
        setResponse(apiResponse);
        setOtherNickname(apiResponse.chatRoomDto.opponentNickname);
        setOtherUuid(apiResponse.chatRoomDto.opponentUuid);
      } catch (e) {
        console.error('API 요청 중 오류 발생:', e);
      }
    };

    getResponse();

    if (response) setProcess(processConverter(response.chatRoomDto.rentalStatus));
  }, []);

  useEffect(() => {
    setRoomName(`${otherNickname}님과의 대화`);
  }, [otherNickname]);

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
    scrollRef,
    chatRoomId,
    roomName,
    otherNickname,
    otherUuid,
  };
};

export default useChatPageModel;
