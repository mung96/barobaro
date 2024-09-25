type Props = {
  data: string;
};

export default function ModalContent({ data }: Props) {
  if (data === 'noPermissionEdit')
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row text-[14px] font-bold">
          <h3 className="text-black-100 me-1">게시글을</h3>
          <h3 className="text-blue-100">수정</h3>
          <h3 className="text-black-100 me-1">할</h3>
          <h3 className="text-black-100 me-1">수 없습니다.</h3>
        </div>
        <div className="flex flex-row text-[13px]">
          <p className="text-blue-100">본인의 게시글</p>
          <p className="text-gray-600 me-1">만</p>
          <p className="text-blue-100">수정</p>
          <p className="text-gray-600">이 가능합니다.</p>
        </div>
      </div>
    );
  if (data === 'noPermissionDelete')
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row text-[14px] font-bold">
          <h3 className="text-black-100 me-1">게시글을</h3>
          <h3 className="text-blue-100">삭제</h3>
          <h3 className="text-black-100 me-1">할</h3>
          <h3 className="text-black-100 me-1">수 없습니다.</h3>
        </div>
        <div className="flex flex-row text-[13px]">
          <p className="text-blue-100">본인의 게시글</p>
          <p className="text-gray-600 me-1">만</p>
          <p className="text-blue-100">삭제</p>
          <p className="text-gray-600">가 가능합니다.</p>
        </div>
      </div>
    );
  if (data === 'isComplete')
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row text-[14px] font-bold">
          <h3 className="text-black-100 me-1">이미</h3>
          <h3 className="text-blue-100">완료</h3>
          <h3 className="text-black-100 me-1">된</h3>
          <h3 className="text-black-100 me-1">거래입니다.</h3>
        </div>
        <div className="flex flex-row text-[13px]">
          <p className="text-gray-600">다른 물품을 선택해주세요.</p>
        </div>
      </div>
    );
  if (data === 'needPassword')
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row text-[14px] font-bold">
          <h3 className="text-blue-100 me-1">간편비밀번호를</h3>
          <h3 className="text-black-100">설정해주세요!</h3>
        </div>
        <div className="flex flex-row text-[13px]">
          <p className="text-black-100 me-1">서비스를 이용하기 위해서</p>
          <p className="text-blue-100 me-1">최초 1회 본인인증</p>
          <p className="text-black-100">후</p>
        </div>
        <div className="flex flex-row text-[13px]">
          <p className="text-blue-100 me-0.5">간편비밀번호를</p>
          <p className="text-black-100">설정해야합니다.</p>
        </div>
      </div>
    );
  return <div>무언가잘못되었다.</div>;
}
