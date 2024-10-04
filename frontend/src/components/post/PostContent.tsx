import PlaceMarker from '@/components/(SVG_component)/PlaceMarker';

export default function PostContent() {
  const data = {
    valid: false,
    title: '캐럿봉 대여합니당',
    like: 3,
    content: `캐럿봉 대여합니다 \n \n 세븐틴 콘서트장에서도 직거래 가능합니다. \n 대여기간 보시고 연락주세요~~!`,
    place: ['고척스카이돔 중앙출입문 C게이트 앞', 37.498333, 126.866667],
  };

  return (
    <main>
      <section className="flex items-center max-w-[450px] w-[100dvw]">
        <div className="w-[48px] h-[20px] bg-gray-400 text-[10px] text-gray-300 flex justify-center items-center mx-[10px]">
          {data.valid ? null : '대여완료'}
        </div>
        <div className="text-[16px] font-bold flex-1">{data.title}</div>
        <div className="text-[10px] font-light text-gray-500">
          찜한 사람 {data.like}명
        </div>
      </section>
      <section className="m-5 text-[12px]">
        {data.content.split('\n').map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>
      <section className="mb-2 mt-5 mx-5">
        <h2 className="font-bold text-[12px]">직거래 희망 장소</h2>
        <div className="flex items-center">
          <PlaceMarker />
          <p className="text-[10px] text-gray-300">{data.place[0]}</p>
        </div>
      </section>
    </main>
  );
}
