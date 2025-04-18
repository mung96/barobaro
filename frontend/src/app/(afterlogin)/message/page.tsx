// import components
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('@/components/Header'));
const Contents = lazy(() => import('@/components/message/Contents'));

export default function Message() {
  return (
    <>
        <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />

      {/* axios 받아와서 map으로
        roomList.map((each) => (
            <ChatRoom participant = chatRoom(each.src, each.nick, each.msg, each.thumb)/>
        ))
      */}
        <Contents />
    </>
  );
}
