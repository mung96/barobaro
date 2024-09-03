"use client";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  pageName: string;
};

export default function Header({ pageName }: HeaderProps) {
  return (
    <header className="bg-white w-full h-[7vh] flex items-center p-4">
      <div className="flex flex-grow">
        <Link href="/prev" className="mx-1 ml-0">
          {/* Image 태그 전부 svg 컴포로 대체해야 함 */}
          <Image
            src="/assets/svg/go_back.svg"
            alt="prev"
            width={24}
            height={24}
          />
        </Link>
        <span className="flex-grow text-left mx-5 ml-0">{pageName}</span>
      </div>
      <div className="flex flex-none items-center space-x-4">
        <Link href="/search">
          <Image
            src="/assets/svg/search.svg"
            alt="Search"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/alert">
          <Image
            src="/assets/svg/notification.svg"
            alt="Alert"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </header>
  );
}

// noti list에서 안 읽은 알림이 있다 ? notification_with_noti : notification 형태로 배치
