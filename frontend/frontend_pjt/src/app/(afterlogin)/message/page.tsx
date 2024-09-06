// import components
import Header from '../_component/Header';

export default function Message() {
  return (
    <>
      <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />
      {/* axios 받아와서 map으로
        roomList.map((each) => (
            <ChatRoom participant = chatRoom(each.src, each.nick, each.msg, each.thumb)/>
        ))
      */}
      <div className="w-full h-full bg-mistyrose" />
    </>
  );
}
