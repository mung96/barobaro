'use client';

import Header from "@/components/Header";
import useSearchModel from "@/hooks/products/useSearchModel";
import {useState, useEffect} from "react";
import Search from "@/components/(SVG_component)/Search";

export default function SearchMain(){
    const { handleSearch, goSearchWord, search, goSearch, recommendData } = useSearchModel();
    const [recommendKeyword, setRecommendKeyword] = useState<any>([{name : ''}]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        goSearch();
    }

    useEffect(() => {
        console.log('searchMain', recommendData)
        console.log(typeof recommendData)
        if (recommendData === '') {
            setRecommendKeyword([{name : ''}])
        } else {
            setRecommendKeyword(recommendData)
        }
    }, [recommendData]);
    // TODO : 추천 검색어를 표시하는 타이밍이 다소 늦음
    return (
        <>
            <Header pageName="홈" hasPrevBtn hasSearchBtn hasAlertBtn/>
            <section className="flex flex-col items-center w-full mb-20 mt-[80px]">
                <div className="w-[90%] h-[35px] rounded-[5px] bg-gray-400 flex justify-start items-center">
                    <div className="mx-1">
                        <Search/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="search_input"
                            type="search"
                            id="search_input"
                            placeholder="검색어를 입력해주세요."
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full outline-none [&::-webkit-search-cancel-button]:appearance-none bg-transparent"
                            required
                        />
                    </form>
                </div>
                {recommendKeyword.length > 0 && recommendKeyword[0].name !== '' && (
                    <div className="mt-4 flex flex-col items-start w-[90%]">
                        <ul>
                            {recommendKeyword.map((keyword : any, index : any) => (
                                <div key={index} onClick={() => goSearchWord("all", keyword.name)} className="flex m-5">
                                    <div className="mx-1">
                                        <Search/>
                                    </div>
                                    <div>
                                        {keyword.name}
                                    </div>

                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </>

    )
}