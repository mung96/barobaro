'use client';

import useChatDialogsModel from '@/hooks/message/chat/useChatDialogsModel';

import MessageFormType from './MessageFormType';
import UserMessage from '@/components/message/chat/UserMessage';
import StatusMessage from '@/components/message/chat/StatusMessage';
import SystemMessage from '@/components/message/chat/SystemMessage';
import { useProfileObject } from '@/store/useMyProfile';
import MessageTypes from '@/components/message/chat/MessageTypes';

type DialogParams = {
  messages: MessageFormType[];
};
export default function Dialogs({ messages }: DialogParams) {
  const { wholeMessages, endOfPageRef } = useChatDialogsModel(messages);
  const profile = useProfileObject();
  return (
    <>
      {wholeMessages.map((each) => (
        <>
          {each.type === MessageTypes.SYSTEM && <SystemMessage type={each.type} body={each.body} timestamp={each.timestamp} user={each.user} />}
          {each.type === MessageTypes.STATUS && <StatusMessage type={each.type} body={each.body} timestamp={each.timestamp} user={each.user} isMine={profile.id === each.user} />}
          {!(each.type === MessageTypes.SYSTEM || each.type === MessageTypes.STATUS)
            && <UserMessage type={each.type} body={each.body} timestamp={each.timestamp} user={each.user} isMine={profile.id === each.user} isImg={each.type === MessageTypes.IMAGE} />}
        </>
      ))}
      <div ref={endOfPageRef} />
    </>
  );
}
{/* axios로 불러온 데이터 map */ }
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