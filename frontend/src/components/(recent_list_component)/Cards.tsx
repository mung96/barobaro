import Card from '@/components/(recent_list_component)/Card';
import { CardsType } from '@/types/products/products';
import { productListSelector } from '@/services/products/productselector';

export default function Cards({ CardsData }: { CardsData: CardsType }) {
  const data = productListSelector(CardsData);
  return (
    <section className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-row space-x-4 p-4 min-w-max">
        {data.map((card) => (
          <div key={card.productId}>
            <Card cardInfo={card} />
          </div>
        ))}
      </div>
    </section>
  );
}
