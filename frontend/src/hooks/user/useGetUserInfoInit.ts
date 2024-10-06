import { useEffect, useCallback } from 'react';
import { useCurrentActions } from '@/store/useCurrentStore';
import { useSetInitialized, useInitialized } from '@/store/useInitialStore';
import { ItemListType } from '@/types/products/products';
import { faker } from '@faker-js/faker';

const CurrentAPI = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

const useInitializeData = () => {
  const isInitialized = useInitialized();
  const { setBorrowList, setLentList } = useCurrentActions();
  const setInitialized = useSetInitialized();

  const createInitialData = useCallback(
    (): {
      borrow: ItemListType;
      lent: ItemListType;
    } => ({
      borrow: [
        {
          productId: faker.number.int(9999),
          productMainImage: faker.image.urlLoremFlickr(),
          title: 'Borrowed Item 1',
          startDate: faker.date.recent().toLocaleDateString('ko-KR'),
          endDate: faker.date.recent().toLocaleDateString('ko-KR'),
          rentalFee: Number(
            faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
          ),
          productStatus: 'IN_PROGRESS',
        },
        // 필요한 만큼 더 추가
      ],
      lent: [
        {
          productId: faker.number.int(9999),
          productMainImage: faker.image.urlLoremFlickr(),
          title: 'Lent Item 1',
          startDate: faker.date.recent().toLocaleDateString('ko-KR'),
          endDate: faker.date.recent().toLocaleDateString('ko-KR'),
          rentalFee: Number(
            faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
          ),
          productStatus: 'FINISH',
        },
        // 필요한 만큼 더 추가
      ],
    }),
    [],
  );

  useEffect(() => {
    const initializeData = async () => {
      if (!isInitialized) {
        try {
          // 실제 API 호출을 시뮬레이션합니다.
          await CurrentAPI();
          const { borrow, lent } = createInitialData();
          setBorrowList(borrow);
          setLentList(lent);
          setInitialized();
        } catch (error) {
          console.error('Failed to initialize data:', error);
          // 에러 처리 로직 추가 (예: 사용자에게 알림)
        }
      } else {
        console.log('Data already initialized, skipping fetch');
      }
    };

    initializeData();
  }, [
    isInitialized,
    createInitialData,
    setBorrowList,
    setLentList,
    setInitialized,
  ]);
};

export default useInitializeData;
