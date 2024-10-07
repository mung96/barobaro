import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function ConnectAccountPage() {
  return (
    <>
      <Header
        pageName="마이페이지"
        hasPrevBtn
        hasSearchBtn={false}
        hasAlertBtn
      />
      <main>
        <p>계좌연결</p>
      </main>
    </>
  );
}
