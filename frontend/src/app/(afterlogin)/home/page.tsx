import Image from 'next/image';
import Category from '@/components/Category';
import SearchBar from '@/components/SearchBar';
import Cards from '@/components/(recent_list_component)/Cards';
import NavBarLayout from '@/layout/NavBarLayout';
import Logo from '../../../../public/assets/png/barobaro_logo.png';
// import Header from '@/components/Header';

export default function Home() {
  return (
    <NavBarLayout current="home">
      {/* 홈에서 헤더 적용 시 이렇게 사용 / 주석 해제하면 바로 작동
      <Header
        pageName=""
        hasLocInfo
        hasPrevBtn={false}
        hasSearchBtn={false}
        hasAlertBtn
      />
      */}
      <br />
      <br />
      <div className="flex justify-center">
        <Image src={Logo} alt="baro" width={150} height={150} />
      </div>
      <SearchBar />
      <br />
      <Category />
      <br />
      <h1 className="text-xs font-bold ml-4">최근 올라온 목록</h1>
      <Cards CardsType="recentlyUploaded" />
      <h1 className="text-xs font-bold ml-4">최근 본 목록</h1>
      <Cards CardsType="recentlyView" />
      <div className="h-12" />
    </NavBarLayout>
  );
}
