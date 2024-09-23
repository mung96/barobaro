import KakaoMap from '@/components/map/KakaoMap';
import Header from '@/components/Header';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
// frontend - .env => NEXT_PUBLIC_KAKAO_CLIENT_ID=APIKEY
export default function PostDetail() {
  return (
    <>
      <Header pageName="게시글목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      <Profile hasEmail={false} hasEditBtn={false} />
      <section className="flex flex-col justify-center items-center">
        <PictureCarousel />
      </section>
      <KakaoMap width="90%" height="20dvh" lat={37.498333} lng={126.866667} />
      <PostContent />
    </>
  );
}
