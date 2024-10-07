// import ItemList from '@/components/ItemList';import Header from '@/components/Header';
import ItemList from '@/components/ItemList';
import Header from '@/components/Header';

export default function List() {
  // 나중에 진짜 데이터가 들어오면 (temp) - DynamicItemList 를 삭제하고 DynamicItemList를 ItemList로 변경합니다.
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
        <ItemList data="lent" />
      </main>
    </>
  );
}
