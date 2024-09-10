import Profile from '@/components/Profile';
import MyPageContent from '@/components/MyPageContent';
import NavBarLayout from '@/layout/NavBarLayout';

export default function MyPage() {
  return (
    <NavBarLayout current="mypage">
      <div className="flex justify-center">
        <Profile />
      </div>
      <div className="mt-4">
        <MyPageContent />
      </div>
    </NavBarLayout>
  );
}
