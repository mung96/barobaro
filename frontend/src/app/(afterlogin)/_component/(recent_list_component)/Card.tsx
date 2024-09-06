"use client"

import {faker} from "@faker-js/faker"
import Image from "next/image";

import LikeButton from "@/app/(afterlogin)/_component/(SVG_component)/LikeButton";
import {useRouter} from "next/navigation";

export default function Card() {
    const router = useRouter();
    const url = faker.image.urlLoremFlickr()
    const date = faker.date.recent().toLocaleDateString('ko-KR')
    const price = faker.commerce.price({min: 1000, max: 10000, dec: 0});
    const price2 = faker.commerce.price({min: 10000, max: 100000, dec: 0});
    const content = faker.commerce.product();
    const fakeId = faker.number.int(999);
    console.log(fakeId)
    function handleCard() {
        router.push('/post/' + fakeId);
    }
    return (
        <>
            <div>
                <div onClick={handleCard} className="w-[125px] h-[168px] rounded-[10px] bg-red-50 items-center relative overflow-hidden">
                    <div className="z-10 absolute fixed top-2 right-2">
                        <LikeButton/>
                    </div>
                    <Image src={url} alt='card' fill/>
                </div>
                <div>
                    <p className="text-[10px]">{date}</p>
                </div>
                <div>
                    <p className="text-xs font-bold">{price}원/{price2}원</p>
                </div>
                <div>
                    <p className="text-xs">{content}</p>
                </div>
            </div>
        </>
    )
}