"use client"

import HomeButton from './(SVG_component)/HomeButton'
import FavoriteButton from "./(SVG_component)/FavoriteButton"
import PostButton from "./(SVG_component)/PostButton"
import MessageButton from "./(SVG_component)/MessageButton"
import MyPageButton from "./(SVG_component)/MyPageButton"

import {useSelectedLayoutSegment} from "next/navigation";
import Link from "next/link";

export default function NavBar() {
    const segment = useSelectedLayoutSegment();
    console.log(segment)
    return (
        <>
            <nav className= "fixed bottom-0 left-0 right-0 bg-gray-400 h-12">
                <div className = "flex">
                    <Link className = "flex flex-1 flex-col items-center justify-center" href="/home">
                            <HomeButton fill ={segment=== 'home' ? "#1A1E27" : "#B6BDC8"}/>
                            <p className="text-xs text-nav_btn" style={{color: segment === 'home' ? "#1A1E27" : "#B6BDC8"}}>홈</p>
                    </Link>
                    <Link className = "flex flex-1 flex-col items-center justify-center" href="/like">
                        <FavoriteButton fill = {segment=== 'like' ? "#1A1E27" : "#B6BDC8"}/>
                        <p className="text-xs text-nav_btn" style={{color: segment === 'like' ? "#1A1E27" : "#B6BDC8"}}>관심내역</p>
                    </Link>
                    <Link className = "flex flex-1 flex-col items-center justify-center" href="/post">
                        <PostButton fill = {segment === 'post' ? "#1A1E27" : "#B6BDC8"}/>
                        <p className="text-xs text-nav_btn" style={{color: segment === 'post' ? "#1A1E27" : "#B6BDC8"}}>등록</p>
                    </Link>
                    <Link className = "flex flex-1 flex-col items-center justify-center" href="/message">
                        <MessageButton fill ={segment === 'message' ? "#1A1E27" : "#B6BDC8"}/>
                        <p className="text-xs text-nav_btn" style={{color: segment === 'message' ? "#1A1E27" : "#B6BDC8"}}>채팅</p>
                    </Link>
                    <Link className = "flex flex-1 flex-col items-center justify-center" href="/mypage">
                        <MyPageButton fill = {segment === 'mypage' ? "#1A1E27" : "#B6BDC8"}/>
                        <p className="text-xs text-nav_btn" style={{color: segment === 'mypage' ? "#1A1E27" : "#B6BDC8"}}>마이페이지</p>
                    </Link>
                </div>
            </nav>
        </>
    )
}
