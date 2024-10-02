import CategoryCard from '@/components/(category_button)/searchbar/CategoryCard';

type Props = {
  now: string;
  searchData: string;
};

export default function CategorySearch({ now, searchData }: Props) {
  const categories = [
    'all',
    'lightstick',
    'smartphone',
    'telescope',
    'camerabody',
    'cameralens',
    'etc',
  ];
  return (
    <section className="flex flex-row bg-fixed">
      <div className="mx-4" key={0}>
        <CategoryCard type={now} selected searchData={searchData} />
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex flex-row">
          {categories.map((category) =>
            category !== now ? (
              <div className="mx-4" key={category}>
                <CategoryCard
                  type={category}
                  selected={false}
                  searchData={searchData}
                />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
