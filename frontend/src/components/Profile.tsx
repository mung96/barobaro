import Image from 'next/image';
import Baroping from '@/../public/assets/png/baroping.png'

export default function Profile() {
  return (
    <section className="flex flex-row items-center justify-center w-[90dvw]">
      <div className="border border-gray-200 rounded-full w-12 h-12 items-center relative overflow-hidden">
        <Image src={Baroping} alt="barorping" width={50} height={50} />
      </div>
      <div className="w-[70dvw]">
        <div>
          바로핑!
        </div>
        <div>
          baroping@ssafy.com
        </div>
      </div>
      <div>
        수정버튼
      </div>
    </section>
  );
}
