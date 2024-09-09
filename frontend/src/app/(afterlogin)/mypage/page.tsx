import Profile from '@/components/Profile';
import Header from '@/components/Header';
import MyPageContent from '@/components/MyPageContent';

export default function MyPage() {
  return (
    <>
      <div className="flex justify-center">
        <Profile />
      </div>
      <div className="mt-4">
        <MyPageContent />
      </div>
    </>
  );
}
