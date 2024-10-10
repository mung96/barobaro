import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
  return <main className="w-full max-w-[500px] mx-auto px-4 pt-16 bg-white">{children}</main>;
}
