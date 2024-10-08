'use client';

// input값을 받고 (naver, kakao, google) 그에 해당하는 component 출력
import Image from 'next/image';
import { Props } from '@/types/social/social';
import { socialSelect } from '@/services/social/socialSelect';
import Link from 'next/link';

export default function SocialBar({ socialName }: Props) {
  const { backgroundColor, imageUrl, fontColor, korean, link } = socialSelect({
    socialName,
  });
  return (
    <Link href={link}  className="w-[280px] h-[50px] rounded-[15px] flex justify-center items-center my-3"
    style={{ backgroundColor }}>
      <Image src={imageUrl} alt={socialName} width={20} height={20} />
      <p className={`text-[14px] text-${fontColor} font-medium ms-3`}>
        {korean}로 계속하기
      </p>
    </Link>
  );
}
