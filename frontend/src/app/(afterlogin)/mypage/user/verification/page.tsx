import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function VerificationPage() {
  return (
    <NavBarLayout current="mypage">
      <header>
        <Header
          pageName="마이페이지"
          hasPrevBtn
          hasSearchBtn={false}
          hasAlertBtn
        />
      </header>
      <main>
        <p>본인인증페이지</p>
      </main>
    </NavBarLayout>
  );
}
