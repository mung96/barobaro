import Category from '@/components/Category';
import SearchBar from '@/components/SearchBar';
import Cards from '@/components/(recent_list_component)/Cards';
import NavBarLayout from '@/layout/NavBarLayout';
import Header from '@/components/Header';

export default function Home() {
  return (
    <NavBarLayout current="home">
      <Header
        pageName=""
        hasLocInfo
        hasPrevBtn={false}
        hasSearchBtn={false}
        hasAlertBtn
      />

      <br />
      <br />
      <h1>이곳에 로고가 들어갑니다.</h1>
      <br />
      <br />
      <SearchBar />
      <br />
      <Category />
      <br />
      <h1 className="text-xs font-bold ml-4">최근 올라온 목록</h1>
      <Cards />
      <h1 className="text-xs font-bold ml-4">최근 본 목록</h1>
      <Cards />
      <div className="h-12" />
    </NavBarLayout>
  );
}
