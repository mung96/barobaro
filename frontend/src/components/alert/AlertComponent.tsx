import Image from "next/image";
import Baro from '@/../public/assets/png/barobaro_logo.png'

export default function AlertComponent() {
  const nicknameTemp = 'BiBimKing';
  return (
    <div className="flex bg-gray-500 w-[90%] h-[100px] rounded-[10px]">
      <div className="flex justify-center items-center w-[70px]">
        <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
          <Image src={Baro} alt='bar' width={50} height={50} />
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-3">
        <div className="flex w-full">
          <div className="text-blue-300 font-bold ml-3">
            계약 요청
          {/* TODO : 오는 값에 따라 다른 값 */}
          </div>
          <div className="flex-1"/>
          <div className="text-gray-300 mr-3">
            1분전
          {/*  TODO : 오는 시간 값 활용 */}
          </div>
        </div>
        <div className="flex mx-3 items-start">
          <div className="text-black-100 text-[14px]">
            <span>{nicknameTemp}</span>
            님이 서명을 요청하셨습니다.
          </div>
        </div>
        <button type="button" className="flex justify-center items-center rounded-[7px] bg-gray-600 text-gray-100 w-[60px] h-[20px] text-[10px] ml-3 mt-1">
          확인하기
        </button>
      </div>
    </div>
  )
}