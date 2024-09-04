"use client"

import HeartIcon from './HeartIcon'
import colors from '@/app/_component/colors'
import {useState} from "react";

export default function LikeButton() {
    // 좋아요 목록에 있는 것을 파악하고, 하트를 누른 상태로 하도록!
    const isInLikeList = false;
    const [isClicked, setClicked] = useState(isInLikeList);
    const heartFillColor = isClicked ? colors.blue[200] : "none"
    const heartBorderColor = isClicked ? colors.blue[200] : "white"
    const handleClick = () => {
        setClicked(!isClicked)
    }

    return (
        <button onClick={handleClick}>
            <HeartIcon fill={heartFillColor}/>
        </button>
    )
}