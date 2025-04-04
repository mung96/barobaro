import { ChatRoomDto, ChatRoomInfoResponse } from './../../../types/apis/chatRoomResponse';
import { getMessageRoomInfo } from '@/apis/message/chat/messageRoomInfoApi';
import { getProductsDetail } from '@/apis/productDetailApi';
import MessageFormType from '@/components/message/chat/MessageFormType';
import { ProcessType, ProcessTypes } from '@/components/message/chat/ProcessTypes';
import { chatConverterFromBe } from '@/services/message/chat/chatConverter';
import chatProcessConverter from '@/services/message/chat/chatProcessConverter';
import { useProfileObject } from '@/store/useMyProfile';
import { OriginBoardType } from '@/types/message/chat/OriginBoardType';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const useChatPageModel = () => {
  // room PK
  const { chat_id } = useParams<{ chat_id: string }>(); // 파라미터 타입 지정
  const chatRoomId: number = Number(chat_id); // 문자열을 숫자로 변환

  const [response, setResponse] = useState<ChatRoomInfoResponse>();
  const [otherNickname, setOtherNickname] = useState('');
  const [otherUuid, setOtherUuid] = useState('');
  const [roomName, setRoomName] = useState(``);
  const [ownerUuid, setOwnerUuid] = useState('');
  const [initProcess, setInitProcess] = useState<ProcessType>(ProcessTypes.CONTACT);
  const [boardTitle, setBoardTitle] = useState('');

  const [originBoardParams, setOriginBoardParams] = useState<OriginBoardType>();
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
      console.log('채팅방요청');
      try {
        const apiResponse = await getMessageRoomInfo(chat_id);
        console.log(apiResponse);
        setResponse(apiResponse);

        setOtherNickname(apiResponse.chatRoomDto.opponentNickname);
        setOtherUuid(apiResponse.chatRoomDto.opponentUuid);
        setOwnerUuid(apiResponse.chatRoomDto.ownerUuid);

        const parsedMessages: MessageFormType[] = [];

        apiResponse.chatDtos.map((each) => {
          const isOwner: boolean = apiResponse.chatRoomDto.ownerUuid === each.uuid;
          const parsedMessage: MessageFormType = chatConverterFromBe(each);
          const convertedType = chatProcessConverter(parsedMessage, isOwner);
          if (convertedType) setInitProcess(convertedType);
          parsedMessages.push(parsedMessage);
        });

        setMessages(parsedMessages);

        const productResponse = await getProductsDetail(String(apiResponse.chatRoomDto.productId));
        console.log('productResponse 도착');
        console.log(productResponse);
        const originBoardParams: OriginBoardType = {
          startDate: productResponse?.startDate,
          endDate: productResponse?.endDate,
          title: productResponse?.title,
          thumbnail: productResponse?.imageList[0],
          rentalFee: productResponse?.rentalFee,
        };
        setOriginBoardParams(originBoardParams);
        setBoardTitle(productResponse?.title);
      } catch (e) {
        console.error('API 요청 중 오류 발생:', e);
      }
    };

    getResponse();
  }, []);

  useEffect(() => {
    console.log(`ownerUuid was changed : ${ownerUuid} - useChatPageModel line 78`);
    console.log(ownerUuid);
  }, [ownerUuid]);

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
    originBoardParams,
    boardTitle,
  };
};

export default useChatPageModel;
