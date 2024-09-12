import Profile from '@/components/Profile';
import MyPageContent from '@/components/MyPageContent';
import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function MyPage() {
  return (
    <NavBarLayout current="mypage">
      <Header pageName="" hasPrevBtn={false} hasSearchBtn={false} hasAlertBtn />
      <div>
        <div className="flex justify-center">
          <Profile />
        </div>
        <div className="mt-4">
          <MyPageContent />
        </div>
      </div>
    </NavBarLayout>
  );
}
