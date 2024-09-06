import Category from '../_component/Category'
import SearchBar from "@/app/(afterlogin)/_component/SearchBar";
import Cards from "@/app/(afterlogin)/_component/(recent_list_component)/Cards";

export default function Home() {
    return (
        <section>
            <br/>
            <br/>
            <h1>이곳에 로고가 들어갑니다.</h1>
            <br/>
            <br/>
            <SearchBar/>
            <br/>
            <Category/>
            <br/>
            <h1 className="text-xs font-bold ml-4">최근 올라온 목록</h1>
            <Cards/>
            <h1 className="text-xs font-bold ml-4">최근 본 목록</h1>
            <Cards/>
            <div className="h-12"></div>
        </section>
    )
}