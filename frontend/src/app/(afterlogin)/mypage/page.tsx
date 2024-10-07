import Profile from '@/components/user/Profile';
import MyPageContent from '@/components/MyPageContent';
import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';
import { faker } from '@faker-js/faker';

export default function MyPage() {
  return (
    <>
      <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />
      <div className="flex flex-col justify-center">
        <Profile
          hasEmail
          hasEditBtn
          writerNickname="MyPageUserNameSector"
          writerProfileImage={faker.image.urlLoremFlickr()}
        />
        <div>
          <MyPageContent />
        </div>
      </div>
    </>
  );
}
