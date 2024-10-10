// import ItemList from '@/components/ItemList';import Header from '@/components/Header';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('@/components/Header'));
const ItemList = lazy(() => import('@/components/ItemListWithContract'));

export default function List() {

  return (
    <>
      <header>
        <Suspense>
          <Header
            pageName="마이페이지"
            hasPrevBtn
            hasSearchBtn={false}
            hasAlertBtn
          />
        </Suspense>
      </header>
      <main>
        <Suspense>
          <ItemList data="lent" />
        </Suspense>
      </main>
    </>
  );
}
