// 로그인 한 이후 화면 구성을 담습니다.
// 하단 bar 구성해야함.
import NavBar from './_component/NavBar';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        {children}
        <nav>
          <NavBar />
        </nav>
      </body>
    </html>
  );
}
