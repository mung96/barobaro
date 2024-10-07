import Header from '@/components/Header';
import ItemList from '@/components/ItemList';

export default function Like() {
    // TODO : API로 좋아요 누른 것들의 목록을 불러와야 한다.
  return (
    <>
      <Header pageName="관심내역" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
      <ItemList data="like" />
    </>
  );
}
