'use client';

import Card from '@/components/(recent_list_component)/Card';
import { CardsType } from '@/types/products/products';
import { productListSelector } from '@/services/products/productselector';
import {useEffect, useState} from "react";

export default function Cards({ CardsData }: { CardsData: CardsType }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await productListSelector(CardsData);
                console.log('DATA', result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [CardsData]);
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (data.length === 0) {
        // TODO : 임의 데이터가 추가된 경우, 이를 재확인 해야함.
        return <p>Api로 온 데이터가 없습니다.</p>;
    }

  return (
    <section className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-row space-x-4 p-4 min-w-max">
        {data.map((card, index) => (
          <div key={index}>
            <Card cardInfo={card} />
          </div>
        ))}
      </div>
    </section>
  );
}
