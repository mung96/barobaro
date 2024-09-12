import Link from 'next/link';

export default function Main() {
  return (
    <>
      <header>
        before login (Main)
      </header>
      <main>
        <Link href="/login">Login화면 이동</Link>
      </main>
    </>
  );
}
