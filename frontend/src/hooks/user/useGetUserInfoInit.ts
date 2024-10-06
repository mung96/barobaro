import { useEffect, useCallback } from 'react';
import { useCurrentActions } from '@/store/useCurrentStore';
import { useSetInitialized, useInitialized } from '@/store/useInitialStore';
import { useInitAccounts } from '@/store/useAccountStore';
import { ItemListType } from '@/types/products/products';
import { faker } from '@faker-js/faker';
import { UserAccount } from '@/types/user/userData';
import accountSort from '@/services/account/accountsort';

// API 연결하면 관련 내용 수정
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
  const setAccountList = useInitAccounts();

  const createInitialData = useCallback(
    (): {
      borrow: ItemListType;
      lent: ItemListType;
      accounts: UserAccount[];
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
      ],
      accounts: [
        {
          bank: '국민은행',
          accountNumber: '3333-05-681789',
          accountId: 10000,
          main: false,
        },
        {
          bank: '신한은행',
          accountNumber: '3333-05-681789',
          accountId: 10001,
          main: true,
        },
        {
          bank: '국민은행',
          accountNumber: '3333-05-681789',
          accountId: 10002,
          main: false,
        },
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
          const { borrow, lent, accounts } = createInitialData();
          const sortedAccounts = accountSort(accounts);
          setBorrowList(borrow);
          setLentList(lent);
          setAccountList(sortedAccounts);
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
