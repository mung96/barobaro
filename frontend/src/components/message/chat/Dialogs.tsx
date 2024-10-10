'use client';

import currentTime from '@/utils/currentTime';
import useChatDialogsModel from '@/hooks/message/chat/useChatDialogsModel';

import Message from './Message';
import MessageFormType from './MessageFormType';
import UserNickname from './UserNickname';
import { UUID } from 'crypto';

type DialogParams = {
  messages: MessageFormType[];
  otherNickname: string;
};
export default function Dialogs({ messages, otherNickname }: DialogParams) {
  const { wholeMessages, endOfPageRef } = useChatDialogsModel(messages);

  return (
    <>
      {/* axios로 불러온 데이터 map */}
      {/* <Message type={3} timestamp={currentTime('date')} user="sys" body="datealert" />
      <UserNickname profileImgSrc="https://loremflickr.com/320/240" nickname={otherNickname} />
      <Message type={1} timestamp="12:34" user="뗀석기팔아요" body="안녕하세요! 고양이 쓰다듬으러 왔는데요." />
      <Message type={1} timestamp="12:34" user="김말이" body="안녕하세요! 고양이 보여드릴까요? 잠시만요" />
      <Message type={3} timestamp="12:34" user="owner" body="accept" />
      <UserNickname profileImgSrc="https://loremflickr.com/320/240" nickname={otherNickname} />
      <Message
        type={1}
        timestamp="12:34"
        user="뗀석기팔아요"
        body="안녕하세요! 고양이 쓰다듬으러 왔는데요. 안녕하세요! 고양이 쓰다듬으러 왔는데요. 안녕하세요! 고양이 쓰다듬으러 왔는데요. 안녕하세요! 고양이 쓰다듬으러 왔는데요. 안녕하세요! 고양이 쓰다듬으러 왔는데요."
      />
      <Message
        type={1}
        timestamp="12:34"
        user="김말이"
        body="안녕하세요! 고양이 보여드릴까요? 잠시만요 안녕하세요! 고양이 보여드릴까요? 잠시만요 안녕하세요! 고양이 보여드릴까요? 잠시만요 안녕하세요! 고양이 보여드릴까요? 잠시만요 안녕하세요! 고양이 보여드릴까요? 잠시만요"
      />
      <Message type={4} timestamp="12:34" user="김말이" body="https://loremflickr.com/320/240" />
      <Message type={1} timestamp="12:34" user="뗀석기팔아요" body="저도 고양이를 보여드리죠" />
      <UserNickname profileImgSrc="https://loremflickr.com/320/240" nickname={otherNickname} />
      <Message type={4} timestamp="12:34" user="뗀석기팔아요" body="https://loremflickr.com/320/240" />

      <Message type={4} timestamp="12:34" user="김말이" body="https://loremflickr.com/320/240" />

      <Message type={3} timestamp="12:34" user="owner" body="reject" />
      <Message type={2} timestamp="12:34" user="김말이" body="contract" />
      <Message type={3} timestamp="12:34" user="김말이" body="modified" />
      <Message type={2} timestamp="12:34" user="김말이" body="signature" />
      <Message type={2} timestamp="12:34" user="김말이" body="finished" />
      <Message type={3} timestamp="12:34" user="김말이" body="finished" />
      <UserNickname profileImgSrc="https://loremflickr.com/320/240" nickname={otherNickname} />
      <Message type={2} timestamp="12:34" user="말이" body="contract" />
      <Message type={2} timestamp="12:34" user="말이" body="signature" />
      <Message type={2} timestamp="12:34" user="말이" body="finished" />

      <Message type={3} timestamp="12:34" user="김말이" body="coffee" /> */}

      {wholeMessages.map((each) => (
        <Message key={each.id} type={each.type} timestamp={each.timestamp} user={each.user} body={each.body} />
      ))}

      <div ref={endOfPageRef} />
    </>
  );
}
