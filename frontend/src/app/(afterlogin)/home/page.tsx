import Image from 'next/image';
import Logo from '@/../public/assets/png/barobaro_logo.png';
import { lazy, Suspense } from 'react';

const UserTown = lazy(() => import('@/components/user/UserTown'));
const SearchBar = lazy(() => import('@/components/SearchBar'));
const Category = lazy(() => import('@/components/Category'));
const Cards = lazy(() => import('@/components/(recent_list_component)/Cards'));


function Home() {
    return (
    <>
      <br />
      <Suspense>
        <UserTown />
      </Suspense>
      <br />
      <div className="flex justify-center">
        <Image src={Logo} alt="baro" width={150} height={150} />
      </div>
      <Suspense>
        <SearchBar />
      </Suspense>
      <br />
      <Suspense>
        <Category />
      </Suspense>
      <br />
      <h1 className="text-xs font-bold ml-4">최근 올라온 목록</h1>
      <Suspense>
        <Cards CardsData="recentlyUploaded" />
      </Suspense>
      <h1 className="text-xs font-bold ml-4">최근 본 목록</h1>
      <Suspense>
        <Cards CardsData="recentlyView" />
      </Suspense>
      <div className="h-12" />
    </>
  );
}
export default Home;