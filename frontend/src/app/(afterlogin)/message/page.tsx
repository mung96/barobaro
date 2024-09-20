// import components
import Header from '@/components/Header';
import Contents from '@/components/message/Contents';
import NavBarLayout from '@/layout/NavBarLayout';

export default function Message() {
  return (
    <NavBarLayout current="message">
      <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />
      {/* axios 받아와서 map으로
        roomList.map((each) => (
            <ChatRoom participant = chatRoom(each.src, each.nick, each.msg, each.thumb)/>
        ))
      */}
      <Contents />
    </NavBarLayout>
  );
}
