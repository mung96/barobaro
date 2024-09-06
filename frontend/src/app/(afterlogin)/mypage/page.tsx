import Profile from '@/components/Profile';
import Header from '@/components/Header';

export default function MyPage() {
  return (
    <>
      <Header pageName="마이페이지" />
      <div className="flex justify-center">
        <Profile />
      </div>
    </>
  );
}
