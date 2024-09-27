import Profile from '@/components/user/Profile';
import MyPageContent from '@/components/MyPageContent';
import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function MyPage() {
  return (
    <NavBarLayout current="mypage">
      <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />
      <div className="flex flex-col justify-center">
        <Profile hasEmail={true} hasEditBtn={true} />
        <div>
          <MyPageContent />
        </div>
      </div>
    </NavBarLayout>
  );
}
