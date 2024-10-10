import { ChatRoomDto, ChatRoomInfoResponse } from './../../../types/apis/chatRoomResponse';
import { getMessageRoomInfo } from '@/apis/message/chat/messageRoomInfoApi';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { ProcessType, ProcessTypes } from '@/components/message/chat/ProcessTypes';
import { chatConverterFromBe } from '@/services/message/chat/chatConverter';
import chatProcessConverter from '@/services/message/chat/chatProcessConverter';
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
  const [ownerUuid, setOwnerUuid] = useState('');
  const [initProcess, setInitProcess] = useState<ProcessType>(ProcessTypes.CONTACT);

  // message list
  const [messages, setMessages] = useState<MessageFormType[]>([]);
  const handleAddMessages = (message: MessageFormType): void => {
    // client 객체에 props로 넘기는 message setter
    setMessages((_messageList) => [..._messageList, message]);
  };

  // 계약 진행 단계를 나타내는 process
  const [process, setProcess] = useState<ProcessType>(ProcessTypes.CONTACT); // apiResponse 도착한 후 초기화

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
        console.log(apiResponse);
        setResponse(apiResponse);

        setOtherNickname(apiResponse.chatRoomDto.opponentNickname);
        setOtherUuid(apiResponse.chatRoomDto.opponentUuid);
        setOwnerUuid(apiResponse.chatRoomDto.ownerUuid);

        const parsedMessages: MessageFormType[] = [];

        apiResponse.chatDtos.map((each) => {
          const parsedMessage: MessageFormType = chatConverterFromBe(each);
          const convertedType = chatProcessConverter(parsedMessage);
          if (convertedType) setInitProcess(convertedType);
          parsedMessages.push(parsedMessage);
        });

        setMessages(parsedMessages);
      } catch (e) {
        console.error('API 요청 중 오류 발생:', e);
      }
    };

    getResponse();
  }, []);

  // !
  useEffect(() => {
    if (initProcess) processSetter(initProcess);
    else processSetter(ProcessTypes.REQUESTED);
  }, [initProcess]);

  useEffect(() => {
    setRoomName(`${otherNickname}님과의 대화`);
  }, [otherNickname]);

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
    ownerUuid, // 상품 소유자
    initProcess,
  };
};

export default useChatPageModel;
