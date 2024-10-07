import Header from '@/components/Header';

export default function TermsPage() {
  return (
    <>
      <header>
        <Header
          pageName="마이페이지"
          hasPrevBtn
          hasSearchBtn={false}
          hasAlertBtn
        />
        <h1 className="text-[15px] font-bold text-center">약관 및 정책</h1>
      </header>
      <main>사기치지마시오</main>
    </>
  );
}
