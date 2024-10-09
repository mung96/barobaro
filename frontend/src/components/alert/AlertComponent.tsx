import Image from "next/image";
import Baro from '@/../public/assets/png/barobaro_logo.png'

// TODO : TimeData 무엇 올지 모름.
type Props = {
  profileUrl: string;
  nickname: string;
  orderType: string;
  message: string;
  timeData: any;
}

export default function AlertComponent( {nickname, profileUrl, orderType, message, timeData} : Props) {

  return (
    <div className="flex bg-gray-500 w-[90%] h-[100px] rounded-[10px] my-2">
      <div className="flex justify-center items-center w-[70px]">
        <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
          <Image src={Baro} alt='bar' width={50} height={50} />
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-3">
        <div className="flex w-full">
          <div className="text-blue-300 font-bold ml-3">
            {orderType}
          {/* TODO : 오는 값에 따라 다른 값 */}
          </div>
          <div className="flex-1"/>
          <div className="text-gray-300 mr-3">
            {timeData}
          {/*  TODO : 오는 시간 값 활용 */}
          </div>
        </div>
        <div className="flex mx-3 items-start">
          <div className="text-black-100 text-[14px]">
            <span>{nickname}</span>
            {message}
          </div>
        </div>
        <button type="button" className="flex justify-center items-center rounded-[7px] bg-gray-600 text-gray-100 w-[60px] h-[20px] text-[10px] ml-3 mt-1">
          확인하기
        </button>
      </div>
    </div>
  )
}