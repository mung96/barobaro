import KakaoMap from '@/components/map/KakaoMap';
import Header from '@/components/Header';
import PictureCarousel from '@/components/post/Carousel';
// frontend - .env => NEXT_PUBLIC_KAKAO_CLIENT_ID=APIKEY
export default function PostDetail() {
  return (
    <>
      <Header pageName="게시글목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      <section className="flex flex-col justify-center items-center">
        <section>Profile</section>
        <PictureCarousel />
      </section>
      <KakaoMap
        width="90%"
        height="30dvh"
        lat={37.503325874722}
        lng={127.04403462366}
      />
    </>
  );
}
