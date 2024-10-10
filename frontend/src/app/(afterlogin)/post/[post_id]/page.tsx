'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PostCheckModal from '@/components/modal/PostCheckModal';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import { postMessageRoomList } from '@/apis/message/chat/messageRoomListApi';
import { getProductsDetail, deleteProductsDetail } from "@/apis/productDetailApi";
import Button from '@/components/shared/Button';
import { IoCalendarClearOutline } from 'react-icons/io5';

export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<any>(null);
  const currentPath = usePathname();

  const router = useRouter();
  {
    /*TODO : 로그인X => 화면 접근시 ReactModal, 완료된 거래인경우 ReactModal */
  }
  const modalType = 'needPassword';
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const fetchPostDetails = useCallback(async () => {
    try {
      const productId = currentPath.slice(6);
      const res = await getProductsDetail(productId);
      setPostInfo(res);
    } catch (err) {
    }
  }, [currentPath]);

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);

  if (!postInfo) {
    return <div></div>;
  }

  const createChatRoom = async () => {
    try {
      const response = await postMessageRoomList(currentPath.slice(6));
      const chatRoomId = response.data.body.chatRoomId; // API 테스트 후 확정
      router.push(`/message/chat/${chatRoomId}`);
    } catch (err) {
      console.log('Error occur on creating chatroom : ', err);
    }
  };

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
          {postInfo.isMine && (
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
                onClick={() => deleteProductsDetail(postInfo.id)}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <PictureCarousel data={postInfo.imageList} />
        <div className="bg-gray-500 w-[90%] h-[1px] my-3" />
        <PostContent data={postInfo} />
        <KakaoMap
          width="85%"
          height="20dvh"
          lat={postInfo.latitude}
          lng={postInfo.longitude}
        />
        <ContractCondition data={postInfo} />
      </div>
      <footer className="fixed left-0 bottom-0 -z-0 flex items-center justify-between w-full px-4 h-[60px] bg-white">
        <div className="pr-3 border-r-2  border-gray-500 flex items-center justify-center h-9">
          <LikeButton isWished={postInfo.isWished} productId={postInfo.productId} />
        </div>
        <div className="flex flex-col flex-1 mx-3">
          <div className="flex items-center">
            <IoCalendarClearOutline className='text-base' />
            <p className="text-gray-300 text-[12px]">
              {postInfo.startDate}~{postInfo.endDate}
            </p>
          </div>
          <p className="text-black-100 text-[16px] font-bold">
            {postInfo.rentalFee}원/일
          </p>
        </div>

        {!postInfo.isMine && <Button width='80px' height='40px' onClick={createChatRoom}>
          <p className='text-sm'>채팅하기</p>
        </Button>}
      </footer>
    </>
  );
}
