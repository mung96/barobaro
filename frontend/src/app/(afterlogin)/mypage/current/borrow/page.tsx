import NavBarLayout from '@/layout/NavBarLayout';
// import ItemList from '@/components/ItemList';
import DynamicItemList from '@/app/(afterlogin)/mypage/current/(temp)/DynamicItemList';
import Header from '@/components/Header';

export default function List() {
  // 나중에 진짜 데이터가 들어오면 (temp)를 삭제하고 DynamicItemList를 ItemList로 변경합니다.
  return (
    <NavBarLayout current="mypage">
      <header>
        <Header pageName="마이페이지" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
      </header>
      <main>
        <DynamicItemList data="borrow" />
      </main>
    </NavBarLayout>
  );
}
