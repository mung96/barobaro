import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PostRegistLayout({ children }: Props) {
  return (
    <main className="w-full max-w-[500px] mx-auto px-6 py-3 bg-white">{children}</main>
  );
}
