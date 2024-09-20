'use client';

import {useRouter, useSelectedLayoutSegments} from "next/navigation";
import LightStick from "@/components/(SVG_component)/LightStick";
import SmartPhone from "@/components/(SVG_component)/SmartPhone";
import TeleScope from "@/components/(SVG_component)/TeleScope";
import CameraBody from "@/components/(SVG_component)/CameraBody";
import CameraLens from "@/components/(SVG_component)/CameraLens";
import Etc from "@/components/(SVG_component)/Etc";

type Props = {
    type: string;
    selected: boolean;
}

export default function CategoryCard({type, selected} : Props) {
    const btnList = {
        "lightstick" : <LightStick fill={selected ? "#3897F0" : "#B6BDC8"} width="15" height="15"/>,
        "smartphone" : <SmartPhone fill={selected ? "#3897F0" : "#B6BDC8"} width="10" height="20" />,
        "telescope" : <TeleScope fill={selected ? "#3897F0" : "#B6BDC8"} width="16" height="14" />,
        "camerabody" : <CameraBody fill={selected ? "#3897F0" : "#B6BDC8"} width="18" height="14" />,
        "cameralens" : <CameraLens fill={selected ? "#3897F0" : "#B6BDC8"} width={15} height={15}/>,
        "etc" : <Etc fill={selected ? "#3897F0" : "#B6BDC8"} width="15" height="15" />
            };
    const btn = btnList[type as keyof typeof btnList];
    const categoryList = {
        "lightstick" : "응원봉",
        "smartphone" : "스마트폰",
        "telescope" : "망원경",
        "camerabody" : "카메라바디",
        "cameralens" : "카메라렌즈",
        "etc" : "기타"
    };
    const title = categoryList[type as keyof typeof categoryList];
    const router  = useRouter();
    const handleClick = (target : string) => {
        console.log(typeof target)
        router.replace(`/search/category/${target}`);
    }

    return (
        <button type="button" onClick={selected ? undefined : () => handleClick(type)} className={`flex justify-evenly items-center w-[85px] h-[30px] rounded-[5px] text-[12px] ${selected === true ? "border-[1px] border-blue-100 text-blue-100" : "bg-gray-100 text-gray-200"}`}>
            <span>{btn}</span>
            <span>{title}</span>
        </button>
    )
}