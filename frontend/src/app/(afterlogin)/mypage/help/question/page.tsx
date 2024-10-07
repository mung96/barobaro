import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function FAQ() {
  return (
    <>
      <header>
        <Header
          pageName="마이페이지"
          hasPrevBtn
          hasSearchBtn={false}
          hasAlertBtn
        />
        <h1 className="text-[15px] font-bold text-center">자주 묻는 질문</h1>
      </header>
      <main>뭐야질문하지마요</main>
    </>
  );
}
