'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { postMessageRoomList } from '@/apis/message/chat/messageRoomListApi';
import { getProductsDetail, deleteProductsDetail } from '@/apis/productDetailApi';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { useProfileObject } from '@/store/useMyProfile';
import formatCost from '@/utils/formatCost';

const KakaoMap = lazy(() => import('@/components/map/KakaoMap'));
const PictureCarousel = lazy(() => import('@/components/post/Carousel'));
const Profile = lazy(() => import('@/components/user/Profile'));
const PostContent = lazy(() => import('@/components/post/PostContent'));
const ContractCondition = lazy(() => import('@/components/post/ContractCondition'));
const PostCheckModal = lazy(() => import('@/components/modal/PostCheckModal'));
const Header = lazy(() => import('@/components/Header'));
const LikeButton = lazy(() => import('@/components/(SVG_component)/LikeButton'));
const Button = lazy(() => import('@/components/shared/Button'));
const IdentityVerificationModal = lazy(() => import('@/components/post/IdentityVerificationModal'));

export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<any>(null);
  const currentPath = usePathname();

  /*TODO : 로그인X => 화면 접근시 ReactModal, 완료된 거래인경우 ReactModal */
  const router = useRouter();

  const modalType = 'needPassword';
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const fetchPostDetails = useCallback(async () => {
    try {
      const productId = currentPath.slice(6);
      const res = await getProductsDetail(productId);
      setPostInfo(res);
    } catch (err) {}
  }, [currentPath]);

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);

  const [isIdentityVerificationModalOpen, setIsIdentityVerificationModalOpen] = useState(false);
  const profileState = useProfileObject();

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

  const pushPasswordNew = () => {
    router.push('/mypage/user/password/new');
    setIsIdentityVerificationModalOpen(false);
  };

  const handleChattingButtonClick = async () => {
    if (!profileState.isAuthenticated) {
      setIsIdentityVerificationModalOpen(true);
    } else {
      await createChatRoom();
    }
  };
  return (
    <>
      <Suspense>
        <IdentityVerificationModal
          isOpen={isIdentityVerificationModalOpen}
          onPrev={() => setIsIdentityVerificationModalOpen(false)}
          onConfirm={pushPasswordNew}
        />
      </Suspense>

      <Suspense>
        <Header pageName="게시글 목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      </Suspense>
      <div className="flex flex-col items-center w-full mb-20">
        <div className="z-50">
          <Suspense>
            <PostCheckModal modalType={modalType} isOpen={isModalOpen} onRequestClose={closeModal} />
          </Suspense>
        </div>
        <div className="flex w-full">
          <Suspense>
            <Profile
              hasEmail={false}
              hasEditBtn={false}
              url={postInfo.writerProfileImage}
              nickname={postInfo.writerNickname}
              email=""
            />
          </Suspense>
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
        <Suspense>
          <PictureCarousel data={postInfo.imageList} />
        </Suspense>
        <div className="bg-gray-500 w-[90%] h-[1px] my-3" />
        <Suspense>
          <PostContent data={postInfo} />
        </Suspense>
        <Suspense>
          <KakaoMap width="85%" height="20dvh" lat={postInfo.latitude} lng={postInfo.longitude} />
        </Suspense>
        <Suspense>
          <ContractCondition data={postInfo} />
        </Suspense>
      </div>
      <footer className="fixed left-0 bottom-0 -z-0 flex border-t-[1px] items-center justify-between w-full px-4 h-[60px] bg-white">
        <div className="pr-3 border-r-2  border-gray-500 flex items-center justify-center h-9">
          <Suspense>
            <LikeButton isWished={postInfo.isWished} productId={postInfo.productId} />
          </Suspense>
        </div>
        <div className="flex flex-col flex-1 mx-3">
          <div className="flex items-center">
            <Suspense>
              <IoCalendarClearOutline className="text-base" />
            </Suspense>
            <p className="text-gray-300 text-[12px]">
              {postInfo.startDate}~{postInfo.endDate}
            </p>
          </div>
          <p className="text-black-100 text-[16px] font-bold">{formatCost(postInfo.rentalFee)}원/일</p>
        </div>
        {!postInfo.isMine && (
          <Button width="80px" height="40px" onClick={handleChattingButtonClick}>
            <p className="text-sm">채팅하기</p>
          </Button>
        )}
      </footer>
    </>
  );
}
