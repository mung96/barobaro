import Card from './Card';
import { CurrentList, CardsType } from '@/types/products/products';
import { productListSelector } from '@/services/products/productselector';

export default function Cards({ CardsType }: { CardsType: CardsType }) {
  const data = productListSelector(CardsType);
  return (
    <section className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-row space-x-4 p-4 min-w-max">
        {data.map((card, index) => (
          <div key={card.productId}>
            <Card cardInfo={card} />
          </div>
        ))}
      </div>
    </section>
  );
}
