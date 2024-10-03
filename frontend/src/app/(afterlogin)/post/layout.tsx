import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
  return <main className="flex flex-col items-center ">{children}</main>;
}
