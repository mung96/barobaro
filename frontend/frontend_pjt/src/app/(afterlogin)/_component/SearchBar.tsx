import colors from "@/app/_component/colors"

export default function SearchBar() {
    return (
        <section className="flex justify-center">
            <form role="search" className = "flex flex-row h-12 w-[90%] items-center justify-between rounded-[52px] shadow-xl bg-white">
                <div className="ml-3">
                    <input type="search" id="search_input" placeholder="검색어를 입력해주세요." required/>
                </div>
                <button className="mr-3">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_222_444)"/>
                        <circle cx="16" cy="16" r="5" fill="white"/>
                        <defs>
                            <linearGradient id="paint0_linear_222_444" x1="24" y1="26.5" x2="16" y2="16"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#007AFF"/>
                                <stop offset="1" stop-color="#3897F0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </button>
            </form>
        </section>
    )
}