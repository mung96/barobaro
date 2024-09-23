import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function MainAccountPage() {
  return (
    <NavBarLayout current="mypage">
      <header>
        <Header pageName="마이페이지" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
      </header>
      <main>
        <p>메인계좌</p>
      </main>
    </NavBarLayout>
  );
}
