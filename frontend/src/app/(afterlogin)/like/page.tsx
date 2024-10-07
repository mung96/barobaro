import Header from '@/components/Header';
import ItemList from '@/components/ItemList';

export default function Like() {
  return (
    <>
      <Header pageName="관심내역" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
      <ItemList data="like" />
    </>
  );
}
