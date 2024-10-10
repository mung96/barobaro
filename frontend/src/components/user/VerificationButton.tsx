"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Script from "next/script";
import { axiosInstance } from "@/apis/axiosInstance";
import { AxiosResponse } from "axios";
import { IMP_CODE, NEXT_BASE_URL } from "@/constants/api";
import Button from "@/components/shared/Button";

// 인증 정보를 위한 타입 정의
type CertificationResponse = {
    success: boolean;
    imp_uid: string;
    merchant_uid?: string;
}
// 서버에서 받아오는 인증 결과 타입
type AuthResponseData = {
    data: any;  // 서버에서 응답 데이터의 구체적인 형태에 따라 타입 수정 가능
}

// `window.IMP` 타입 선언 (TypeScript에서는 기본적으로 이 객체를 알지 못하므로 선언 필요)
type IMP = {
    init(impCode: string): void;
    certification(
        options: {
            pg: string;
            merchant_uid: string;
            m_redirect_url?: string;
        },
        callback: (response: CertificationResponse) => void
    ): void;
}

declare global {
    interface Window {
        IMP?: IMP;  // window.IMP는 동적이므로 undefined일 수 있음
    }
}
type Props = {
    width: string,
    height: string
    children: ReactNode
    onSuccess: () => void
}
const VerificationButton = ({ width, height, children, onSuccess }: Props) => {
    const MID = "MIIiasTest";
    const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
    // 스크립트 로드 완료 상태를 useEffect로 관리
    useEffect(() => {
        const checkIMP = () => {
            if (window.IMP) {
                setIsScriptLoaded(true);
            } else {
            }
        };
        if (window.IMP) {
            checkIMP();  // 이미 로드되어 있는 경우 바로 설정
        } else {
            window.addEventListener("load", checkIMP);   // 스크립트 로드 후 onload 이벤트를 통해 확인
            return () => window.removeEventListener("load", checkIMP);
        }
    }, []);

    // 인증 정보를 서버로 보내고 응답을 받는 함수
    const getCertification = async (imp_uid: string): Promise<AxiosResponse<AuthResponseData>> => {
        const body = {
            "impUid": imp_uid,
        };
        console.log(body);
        const response = await axiosInstance.post(`/auth/authentication`, body);
        return response;
    };

    // 본인 인증을 실행하는 함수
    const certification = async (): Promise<void> => {
        if (!isScriptLoaded || !window.IMP) {
            console.error("PortOne SDK is not loaded.");
            return;
        }
        window.IMP.init(IMP_CODE!);
        window.IMP.certification(
            {
                pg: `inicis_unified.${MID}`,
                merchant_uid: `mer_id_${Date.now()}`,
                m_redirect_url: `${NEXT_BASE_URL}` + "portone",
            },
            async (resp: CertificationResponse) => {
                if (resp.success) {
                    try {
                        const result = await getCertification(resp.imp_uid);
                        onSuccess();
                    } catch (error) {
                        console.error("인증 정보를 가져오는 중 오류 발생:", error);
                    }
                } else {
                    console.log(`==== 인증 실패 ====`);
                }
            }
        );
    };

    return (
        <div className="App">
            {/* PortOne SDK 스크립트를 로드 */}
            <Script
                className="hidden"
                src="https://cdn.iamport.kr/v1/iamport.js"
                strategy="lazyOnload"
                onLoad={() => {
                    if (window.IMP) {
                        setIsScriptLoaded(true);
                        console.log("PortOne SDK successfully loaded.");
                    } else {
                        console.error("PortOne SDK script loaded, but window.IMP is undefined.");
                    }
                }}
                onError={() => console.error("Failed to load PortOne SDK.")}
            />

            <Button onClick={certification} disabled={!isScriptLoaded} width={width} height={height}>
                {children}
            </Button>
        </div >
    );
};

export default VerificationButton;
