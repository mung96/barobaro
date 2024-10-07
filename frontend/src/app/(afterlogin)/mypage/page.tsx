import Profile from '@/components/user/Profile';
import MyPageContent from '@/components/MyPageContent';
import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';
import { faker } from '@faker-js/faker';
import ProfileContainer from "@/components/user/ProfileContainer";

export default function MyPage() {
    // MyPageContent - useInitializeData() : 실행시 유저의 정보를 가져오는 hook
    // API연결은 해당 함수를 수정해서 진행할 것
  return (
    <NavBarLayout current="mypage">
      <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />
      <div className="flex flex-col justify-center">
        {/*<Profile*/}
        {/*  hasEmail*/}
        {/*  hasEditBtn*/}
        {/*  writerNickname="MyPageUserNameSector"*/}
        {/*  writerProfileImage={faker.image.urlLoremFlickr()}*/}
        {/*/>*/}
          <ProfileContainer/>
        <div>
          <MyPageContent />
        </div>
      </div>
    </NavBarLayout>
  );
}
