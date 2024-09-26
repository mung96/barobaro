// input값을 받고 (naver, kakao, google) 그에 해당하는 component 출력
import { Props } from '@/types/social/social';
import { socialSelect } from '@/services/social/socialSelect';
import Image from 'next/image';

export default function SocialBar({ socialName }: Props) {
  const info = socialSelect({ socialName });
  return (
    <nav
      className="w-[280px] h-[50px] rounded-[15px] flex justify-center items-center my-3"
      style={{ backgroundColor: info.backgroundColor }}
    >
      <Image src={info.imageUrl} alt={socialName} width={20} height={20} />
      <p className={`text-[14px] text-${info.fontColor} font-medium ms-3`}>
        {info.korean}로 계속하기
      </p>
    </nav>
  );
}
