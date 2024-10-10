'use client';

import { axiosInstance } from "@/apis/axiosInstance";
import { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Image from 'next/image';
import Logo from '@/../public/assets/png/barobaro_logo.png';

type AuthResponseData = {
    data: any;  // 서버에서 응답 데이터의 구체적인 형태에 따라 타입 수정 가능
}

export default function PortOneComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    router.push('/mypage/user/password/new');
    // 인증 정보를 서버로 보내고 응답을 받는 함수
    const getCertification = async (imp_uid: string): Promise<AxiosResponse<AuthResponseData>> => {
        const body = {
            "impUid": imp_uid,
        };
        const response = await axiosInstance.post(`/auth/authentication`, body);
        return response;
    };
    const fetchData = async () => {
        try {
            const result = await getCertification(searchParams.get("imp_uid")!);
            console.log(`=== 유저 인증정보 조회 결과 ===`);
            router.push('/mypage/user/password/new');
        } catch (error) {
            console.error("인증 정보를 가져오는 중 오류 발생:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <section className="w-full h-[100dvh] flex flex-col justify-center items-center  animate-pulse">
            <Image src={Logo} alt="baro" width={280} height={280} />
            <p className="text-2xl">잠시만 기다려주세요.</p>
        </section>
    );
}
