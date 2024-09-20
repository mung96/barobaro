import CategoryCard from "@/components/(category_button)/searchbar/CategoryCard";

type Props = {
    now : string;
}

export default function CategorySearch({now} : Props) {
    const categories = ["lightstick", "smartphone", "telescope", "camerabody", "cameralens", "etc"]
    return (
        <>
            <section className = "flex flex-row">
                <div className = "mx-4" key={0}>
                    <CategoryCard type={now} selected={true} />
                </div>
                <div className="w-full overflow-x-auto scrollbar-hide">
                    <div className="flex flex-row">
                        {categories.map((category, index) => (
                            category !== now ? <div className="mx-4" key={index+1}><CategoryCard type={category} selected={false}/></div> : null
                            ))}
                    </div>
                    </div>
            </section>
        </>
    )
}