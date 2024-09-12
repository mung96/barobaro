import NavBar from '@/components/NavBar';

type Props = {
  children: React.ReactNode,
  current: string
};

export default function RootLayout({ children, current }: Props) {
  return (
    <>
      {children}
      <nav><NavBar current={current} /></nav>
    </>
  );
}
