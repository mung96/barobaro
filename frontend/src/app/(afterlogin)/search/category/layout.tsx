'use client'

import { useSelectedLayoutSegment } from "next/navigation";
import CategorySearch from "@/components/(category_button)/searchbar/CategorySearch";
import Header from "@/components/Header";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    const segment: string = useSelectedLayoutSegment()!;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-10 bg-white">
                <Header pageName="홈" hasPrevBtn hasSearchBtn hasAlertBtn />
                <CategorySearch now={segment} />
            </div>
            <main className="flex-grow mt-[calc(64px+30px)]">
                {children}
            </main>
        </div>
    )
}