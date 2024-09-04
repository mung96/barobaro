"use client"

import TeleScope from '../(SVG_component)/TeleScope'
import colors from '@/app/_component/colors'

import {useState} from "react";

export default function TeleScopeButton() {
    const [isClicked, setIsClicked] = useState(false);
    const buttonColor = isClicked ? colors.white[100] : colors.black[100];
    const buttonFillColor = isClicked ? colors.blue[100] : colors.gray[100];
    let backgroundColor = colors.gray[100]
    const handleClick = () => {
        setIsClicked(!isClicked)
    }
    console.log(backgroundColor)
    return (
        <button onClick={handleClick} style = {{backgroundColor: buttonFillColor, borderRadius:'12px', width: '44px', height: '44px', display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <TeleScope fill={buttonColor} />
        </button>
    )
}