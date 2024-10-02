import Image from 'next/image';

type UserNicknameParams = {
  profileImgSrc: string;
  nickname: string;
};
const UserNickname = ({ profileImgSrc, nickname }: UserNicknameParams) => {
  // 상대의 닉네임만 보입니다.
  return (
    <div className="flex gap-0 pb-2 pl-4 text-xl">
      <div className="flex relative w-[10%] aspect-square">
        <Image
          src={profileImgSrc} // public 폴더 내의 이미지 경로
          alt="profImg" // 이미지 설명 추가
          layout="fill" // 부모 div의 크기에 맞게 이미지가 채워지도록 설정
          objectFit="cover" // 이미지 비율 유지하면서 부모 div에 맞게 채움
          className="rounded-full" // 원형으로 만들기
        />
      </div>
      <div className="flex relative self-center pl-3 text-lg font-semibold">
        {nickname}
      </div>
    </div>
  );
};

export default UserNickname;
