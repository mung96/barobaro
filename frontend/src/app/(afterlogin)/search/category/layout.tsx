'use client'

import {useSelectedLayoutSegment} from "next/navigation";
import CategorySearch from "@/components/(category_button)/searchbar/CategorySearch";

export default function SearchLayout() {
    const segment: string = useSelectedLayoutSegment()!;
    return (
        <>
            <CategorySearch now={segment}/>
        </>
    )
}