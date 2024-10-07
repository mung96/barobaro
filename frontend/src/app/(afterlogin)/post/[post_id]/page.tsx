'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';
import { useState } from 'react';
import PostCheckModal from '@/components/modal/PostCheckModal';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import { faker } from '@faker-js/faker';

export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalType = 'needPassword';
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // 해당 내용은 API  호출후 활용 가정
  const writerData = {
    writerId: 'asd',
    writerProfileImage: faker.image.urlLoremFlickr(),
    writerNickname: 'UserNicknameExample',
  };
  const layoutData = {
    startDate: '24.10.21',
    endDate: '24.10.22',
    rentalFee: 10000,
  };
  const contentData = {
    title: '캐럿봉 대여합니당',
    productStatus: 'FINISH',
    wishCount: 3,
    content: `캐럿봉 대여합니다 \n \n 세븐틴 콘서트장에서도 직거래 가능합니다. \n 대여기간 보시고 연락주세요~~!`,
    place: '고척스카이돔 중앙출입문 C게이트 앞',
    latitude: 37.5,
    longitude: 126.87,
  };
  const contractData = {
    isWriteContract: true,
    contractCondition: {
      repairVendor: '제조사 또는 공식 수입사의 AS 센터',
      overdueCriteria: 5,
      overdueFee: 2,
      theftCriteria: 7,
      refundDeadline: 7,
    },
  };
  // 작성자와 유저 아이디 비교하고, 수정 삭제버튼 표시 OX
  const userId: string = 'asdas';
  return (
    <>
      <Header pageName="게시글 목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      <div className="flex flex-col items-center w-full mb-20">
        <div className="z-50">
          <PostCheckModal
            modalType={modalType}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
          />
        </div>
        <div className="flex w-full">
          <Profile
            hasEmail={false}
            hasEditBtn={false}
            url={writerData.writerProfileImage}
            nickname={writerData.writerNickname}
            email=""
          />
          <div className="flex-1" />
          {writerData.writerId === userId ? (
            <div className="flex">
              <button
                type="button"
                className="text-[10px] underline text-gray-300 me-1 w-[30px]"
                onClick={() => openModal()}
              >
                수정
              </button>
              <button
                type="button"
                className="text-[10px] underline text-gray-300 w-[30px]"
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
        <PictureCarousel />
        <div className="bg-gray-500 w-[90%] h-[1px] my-3" />
        <PostContent data={contentData} />
        <KakaoMap
          width="85%"
          height="20dvh"
          lat={contentData.latitude}
          lng={contentData.longitude}
        />
        <ContractCondition data={contractData} />
      </div>
      <div className="-z-0 fixed bottom-0 -z-0 max-w-[500px] w-[100%] h-[60px] bg-white flex items-center">
        <div className="flex items-center justify-center w-full">
          <div className="mx-5">
            <LikeButton isWished />
          </div>
          <div className="h-[42px] w-[1px] bg-gray-500" />
          <div className="flex flex-col flex-1 mx-3">
            <div className="flex items-center">
              <CalendarSVG />
              <p className="text-gray-300 text-[12px]">
                {layoutData.startDate}~{layoutData.endDate}
              </p>
            </div>
            <p className="text-black-100 text-[16px] font-bold">
              {layoutData.rentalFee}원/일
            </p>
          </div>
          <button
            type="button"
            className="mx-3 text-[12px] text-gray-200 rounded-[3px] w-[69px] h-[28px] bg-gray-400"
            // onClick={() => console.log('Chat')}
          >
            채팅하기
          </button>
        </div>
      </div>
    </>
  );
}
