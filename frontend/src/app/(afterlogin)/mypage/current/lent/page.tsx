import NavBarLayout from '@/layout/NavBarLayout';
// import ItemList from '@/components/ItemList';import Header from '@/components/Header';
import ItemList from '@/components/ItemList';
import Header from '@/components/Header';

export default function List() {

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
        <ItemList data="lent" />
      </main>
    </NavBarLayout>
  );
}
