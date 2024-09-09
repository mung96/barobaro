import NavBar from '@/components/NavBar';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      {children}
      <nav>
        <NavBar />
      </nav>
    </>
  );
}
