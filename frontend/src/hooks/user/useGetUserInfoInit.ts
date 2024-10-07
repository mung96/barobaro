import { useEffect } from 'react';
import { useCurrentActions } from '@/store/useCurrentStore';
import { useSetInitialized, useInitialized } from '@/store/useInitialStore';
import { useInitAccounts } from '@/store/useAccountStore';
import { useRecentlyActions } from "@/store/useRecentlyStore";
import {getLentProducts, getBorrowProducts, getRecentlyUploaded, getRecentlyViewed} from "@/apis/productApi";
import {getUserAccounts} from "@/apis/accountApi";
import accountSort from "@/services/account/accountsort";

const useInitializeData = () => {
  const isInitialized = useInitialized();
  const { setBorrowList, setLentList } = useCurrentActions();
  const setInitialized = useSetInitialized();
  const setAccountList = useInitAccounts();
  const { setRecentlyViewedProducts, setRecentlyUploadedProducts } = useRecentlyActions()

  useEffect(() => {
    const initializeData = async () => {
      if (!isInitialized) {
        try {
          // 실제 API 호출을 시뮬레이션합니다.
          // await CurrentAPI()
          const recentlyUploadedProducts = await getRecentlyUploaded();
          const recentlyViewedProducts = await getRecentlyViewed();
          const userLentProducts = await getLentProducts()
          const userBorrowProducts = await getBorrowProducts()
          const userAccountList = await getUserAccounts()
          const sortedAccounts = accountSort(userAccountList);
          setRecentlyViewedProducts(recentlyViewedProducts)
          setRecentlyUploadedProducts(recentlyUploadedProducts)
          setBorrowList(userBorrowProducts);
          setLentList(userLentProducts);
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
    setBorrowList,
    setLentList,
    setInitialized,
  ]);
};

export default useInitializeData;
