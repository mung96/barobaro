type Props = {
  process: number;
};

export default function StepContent({ process }: Props) {
  return (
    <>
      {process === 1 ? (
        <>
          <h2 className="text-black-100 text-[15px] font-bold">
            프로필을 설정해주세요.
          </h2>
          <div className="text-[11px] font-medium">
            <div className="flex">
              <p className="text-blue-100">본인</p>
              <p>을 잘 나타낼 수 있는</p>
            </div>
            <div className="flex">
              <p className="text-blue-100">프로필 사진</p>
              <p>과</p>
              <p className="text-blue-100">닉네임</p>
              <p>을 설정해주세요!</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-black-100 text-[15px] font-bold">
            거래를 진행하고 싶은
          </h2>
          <h2 className="text-black-100 text-[15px] font-bold">
            동네를 선택해주세요
          </h2>
          <div className="text-[11px] font-medium">
            <div className="flex">
              <p className="text-blue-100">거래</p>
              <p>를 진행할 동네를 설정해주세요.</p>
            </div>
            <div className="flex">
              <p className="me-1">최대 </p>
              <p className="text-blue-100">3개</p>
              <p>의 동네에서 거래를 할 수 있어요.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
