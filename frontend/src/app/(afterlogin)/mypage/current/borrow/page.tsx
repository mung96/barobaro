// import ItemList from '@/components/ItemList';
import Header from '@/components/Header';
import ItemList from '@/components/ItemList';

export default function List() {
  return (
    <>
      <header>
        <Header
          pageName="마이페이지"
          hasPrevBtn
          hasSearchBtn={false}
          hasAlertBtn
        />
      </header>
      <main>
        <ItemList data="borrow" />
      </main>
    </>
  );
}
