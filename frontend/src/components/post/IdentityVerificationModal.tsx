'use client';

import React from 'react';
import ReactModal from 'react-modal';

import VerificationButton from '@/components/user/VerificationButton';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/navigation';
import { useProfileSet } from '@/store/useMyProfile';
import { getProfile } from '@/apis/profileApi';
import { AxiosError } from 'axios';

type Props = {
    isOpen: boolean;
};

const modalStyle: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // 어두운 배경
        zIndex: 1000, // 다른 요소 위에 오도록 설정
    },
    content: {
        position: 'absolute',
        top: '50%', // 수직 중앙
        left: '50%', // 수평 중앙
        transform: 'translate(-50%, -50%)', // 모달을 자신의 크기만큼 위로 및 왼쪽으로 이동
        width: '300px',
        height: '168px',
        padding: '20px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        borderRadius: '10px',
        outline: 'none',
    },
};

const IdentityVerificationModal = ({
    isOpen,
}: Props) => {
    const router = useRouter();
    const setProfile = useProfileSet();

    const fetchProfile = async () => {
        try {
            const profileResponse = await getProfile();
            setProfile({
                ...profileResponse.data.body
            })
            router.replace('/post/regist');
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.header.message)
            }
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel="request"
            ariaHideApp={false}
            style={modalStyle}
        >
            <div className='flex flex-col justify-between gap-3'>
                <div className='flex flex-col gap-[1px]'>
                    <p>아직 본인인증을 하지 않았어요</p>
                    <p>게시글 등록을 위해 본인인증을 진행해주세요.</p>
                </div>
                <div className='flex justify-between w-full gap-2'>
                    <Button onClick={() => router.back()} color='gray' width='100%' height='40px'>
                        <p className="text-base">뒤로</p>
                    </Button>
                    <div className='w-full'>
                        <VerificationButton onSuccess={fetchProfile} width='100%' height='40px' ><p className="text-base">확인</p></VerificationButton>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default IdentityVerificationModal;
