import ThreeDot from "@/components/(SVG_component)/(mypage)/ThreeDot";

type Props = {
    data : number
}

export default function MeatBallsButton({data} : Props) {
    const handleButton = () => {
        console.log(data);
        // data (게시글 아이디)를 가지고 수정하기 로직을 수행합니다.
        // 더보기를 띄웁니다.
    }
    return (
        <>
            <button type="button" className="absolute flex justify-center items-center right-[20px] top-[6px] bg-gray-500 w-[20px] h-[18px] rounded-[3px]" onClick={() => handleButton()}>
                <ThreeDot/>
            </button>
        </>
    )
}