import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function ConnectAccountPage() {
  return (
    <NavBarLayout current="mypage">
      <header>
        <Header pageName="마이페이지" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
      </header>
      <main>
        <p>계좌연결</p>
      </main>
    </NavBarLayout>
  );
}
