'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from "next/navigation";
import PostCheckModal from '@/components/modal/PostCheckModal';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import {getProductsDetail} from "@/apis/productDetailApi";

export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<any>(null);
  const modalType = 'needPassword';
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const currentPath = usePathname()
  const fetchPostDetails = useCallback(async () => {
    try {
      const productId = currentPath.slice(6);
      const res = await getProductsDetail(productId);
      setPostInfo(res);
      console.log('Updated postInfo:', res);
    } catch (err) {
      console.log('ERR', err);
    }
  }, [currentPath]);

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);



  const layoutData = {
    startDate: '24.10.21',
    endDate: '24.10.22',
    rentalFee: 10000,
  };
  // 작성자와 유저 아이디 비교하고, 수정 삭제버튼 표시 OX
  const userId: string = 'asdas';

  if (!postInfo) {
    return (<div></div>)
  }
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
            url={postInfo.writerProfileImage}
            nickname={postInfo.writerNickname}
            email=""
          />
          <div className="flex-1" />
          {postInfo.isMine ? (
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
        <PictureCarousel data={postInfo.imageList}/>
        <div className="bg-gray-500 w-[90%] h-[1px] my-3" />
        <PostContent data={postInfo} />
        <KakaoMap
          width="85%"
          height="20dvh"
          lat={postInfo.latitude}
          lng={postInfo.longitude}
        />
        {/* TODO : 몇일 내에 반납해야하는지, 이러한 정보가 오지 않음. */}
        <ContractCondition data={postInfo} />
      </div>
      <div className="-z-0 fixed bottom-0 -z-0 max-w-[500px] w-[100%] h-[60px] bg-white flex items-center">
        <div className="flex items-center justify-center w-full">
          <div className="mx-5">
            <LikeButton isWished={postInfo.isWished} />
          </div>
          <div className="h-[42px] w-[1px] bg-gray-500" />
          <div className="flex flex-col flex-1 mx-3">
            <div className="flex items-center">
              <CalendarSVG />
              <p className="text-gray-300 text-[12px]">
                {postInfo.startDate}~{postInfo.endDate}
              </p>
            </div>
            <p className="text-black-100 text-[16px] font-bold">
              {postInfo.rentalFee}원/일
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
