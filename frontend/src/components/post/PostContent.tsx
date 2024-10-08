import PlaceMarker from '@/components/(SVG_component)/PlaceMarker';
import { ProductResponse } from '@/types/apis/productResponse';
import convertProductStatus from '@/services/post/detail';

export default function PostContent({ data }: { data: ProductResponse }) {
  const productStatus = convertProductStatus(data.productStatus);
  return (
    <main>
      <section className="flex items-center max-w-[450px] w-[100%]">
        <div className="w-[48px] h-[20px] bg-gray-400 text-[10px] text-gray-300 flex justify-center items-center mx-[10px]">
          {productStatus}
        </div>
        <div className="text-[16px] font-bold flex-1">{data.title}</div>
        <div className="text-[10px] font-light text-gray-500">
          찜한 사람 {data.wishCount}명
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
          <p className="text-[10px] text-gray-300">{data.place}</p>
        </div>
      </section>
    </main>
  );
}
