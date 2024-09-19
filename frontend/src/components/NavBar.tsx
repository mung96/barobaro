import Link from 'next/link';
import HomeButton from './(SVG_component)/HomeButton';
import FavoriteButton from './(SVG_component)/FavoriteButton';
import PostButton from './(SVG_component)/PostButton';
import MessageButton from './(SVG_component)/MessageButton';
import MyPageButton from './(SVG_component)/MyPageButton';

export default function NavBar({ current } : { current : string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-400 h-12 w-full max-w-[500px] mx-auto z-10">
      <div className="flex">
        <Link className="flex flex-1 flex-col items-center justify-center" href="/home">
          <HomeButton fill={current === 'home' ? '#1A1E27' : '#B6BDC8'} />
          <p className="text-xs text-nav_btn" style={{ color: current === 'home' ? '#1A1E27' : '#B6BDC8' }}>홈</p>
        </Link>
        <Link className="flex flex-1 flex-col items-center justify-center" href="/like">
          <FavoriteButton fill={current === 'like' ? '#1A1E27' : '#B6BDC8'} />
          <p className="text-xs text-nav_btn" style={{ color: current === 'like' ? '#1A1E27' : '#B6BDC8' }}>관심내역</p>
        </Link>
        <Link className="flex flex-1 flex-col items-center justify-center" href="/post">
          <PostButton fill={current === 'post' ? '#1A1E27' : '#B6BDC8'} />
          <p className="text-xs text-nav_btn" style={{ color: current === 'post' ? '#1A1E27' : '#B6BDC8' }}>등록</p>
        </Link>
        <Link className="flex flex-1 flex-col items-center justify-center" href="/message">
          <MessageButton fill={current === 'message' ? '#1A1E27' : '#B6BDC8'} />
          <p className="text-xs text-nav_btn" style={{ color: current === 'message' ? '#1A1E27' : '#B6BDC8' }}>채팅</p>
        </Link>
        <Link className="flex flex-1 flex-col items-center justify-center" href="/mypage">
          <MyPageButton fill={current === 'mypage' ? '#1A1E27' : '#B6BDC8'} />
          <p className="text-xs text-nav_btn" style={{ color: current === 'mypage' ? '#1A1E27' : '#B6BDC8' }}>마이페이지</p>
        </Link>
      </div>
    </nav>
  );
}
