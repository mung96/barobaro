import Header from '@/components/Header';

type Props = {
  children : React.ReactNode
};

export default function MypageLayout({ children }:Props) {
  return (
    <>
      <Header pageName="마이페이지" />
      {children}
    </>
  );
}
