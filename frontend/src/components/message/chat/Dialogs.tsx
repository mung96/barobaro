'use client';

import currentTime from '@/utils/currentTime';
import useChatDialogsModel from '@/hooks/message/chat/useChatDialogsModel';

import Message from './Message';
import MessageFormType from './MessageFormType';

type DialogParams = {
  messages: MessageFormType[];
};
export default function Dialogs({ messages }: DialogParams) {
  const { wholeMessages, endOfPageRef } = useChatDialogsModel(messages);

  return (
    <>
      {/* axios로 불러온 데이터 map */}
      <Message
        type={3}
        timestamp={currentTime('date')}
        user="sys"
        body="datealert"
      />
      <Message
        type={1}
        timestamp="12:34"
        user="뗀석기팔아요"
        body="안녕하세요! 고양이 쓰다듬으러 왔는데요."
      />
      <Message
        type={1}
        timestamp="12:34"
        user="김말이"
        body="안녕하세요! 고양이 보여드릴까요? 잠시만요"
      />
      <Message type={3} timestamp="12:34" user="owner" body="accept" />

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
      <Message
        type={4}
        timestamp="12:34"
        user="김말이"
        body="https://img1.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg"
      />
      <Message
        type={1}
        timestamp="12:34"
        user="뗀석기팔아요"
        body="저도 고양이를 보여드리죠"
      />
      <Message
        type={4}
        timestamp="12:34"
        user="뗀석기팔아요"
        body="https://image.musinsa.com/mfile_s01/2022/04/05/8e78082b9922dd076806a39073c8615c215014.jpg"
      />

      <Message
        type={4}
        timestamp="12:34"
        user="김말이"
        body="https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800"
      />
      <Message type={3} timestamp="12:34" user="owner" body="reject" />
      <Message type={2} timestamp="12:34" user="김말이" body="contract" />
      <Message type={3} timestamp="12:34" user="김말이" body="modified" />
      <Message type={2} timestamp="12:34" user="김말이" body="signature" />
      <Message type={2} timestamp="12:34" user="김말이" body="finished" />
      <Message type={3} timestamp="12:34" user="김말이" body="finished" />

      <Message type={2} timestamp="12:34" user="말이" body="contract" />
      <Message type={2} timestamp="12:34" user="말이" body="signature" />
      <Message type={2} timestamp="12:34" user="말이" body="finished" />

      <Message type={3} timestamp="12:34" user="김말이" body="coffee" />

      {wholeMessages.map((each) => (
        <Message
          type={each.type}
          timestamp={each.timestamp}
          user={each.user}
          body={each.body}
        />
      ))}

      <div ref={endOfPageRef} />
    </>
  );
}
