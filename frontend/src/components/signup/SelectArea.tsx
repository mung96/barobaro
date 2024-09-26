export default function SelectArea() {
  const valid = true;
  return (
    <>
      <div>동네 설정</div>
      <div>동네 검색</div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <div className="flex max-w-[450px] justify-center items-center">
          <button
            type="button"
            className={`${
              valid ? 'bg-blue-100' : 'bg-gray-400'
            } w-[40%] h-[36px] rounded-[5px] mx-auto`}
          >
            <p
              className={`font-bold text-[14px] ${
                valid ? 'text-white' : 'text-gray-200'
              }`}
            >
              이전
            </p>
          </button>
          <button
            type="button"
            className={`${
              valid ? 'bg-blue-100' : 'bg-gray-400'
            } w-[40%] max-w-[450px] h-[36px] rounded-[5px] mx-auto`}
          >
            <p
              className={`font-bold text-[14px] ${
                valid ? 'text-white' : 'text-gray-200'
              }`}
            >
              설정 완료
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
