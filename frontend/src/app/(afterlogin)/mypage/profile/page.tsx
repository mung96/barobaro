import ProfilePhoto from '@/components/user/ProfilePhoto';
import Header from "@/components/Header";
// import { file } from '@babel/types';

export default function Profile() {
  return (
    <>
      <Header pageName="" hasPrevBtn hasSearchBtn={false} hasAlertBtn={false}/>
      <header className="font-bold text-[15px] flex flex-col items-center mt-[80px] mb-10">
        프로필 수정
      </header>
      <ProfilePhoto isSignup={false} />
    </>
  );
}
