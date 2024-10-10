'use client';

import { getFavoriteProducts } from "@/apis/productApi";
import { lazy, Suspense, useEffect } from "react";
import { useCurrentActions } from "@/store/useCurrentStore";

const Header = lazy(() => import('@/components/Header'));
const ItemList = lazy(() => import('@/components/ItemList'));

export default function Like() {
    const currentStoreState = useCurrentActions()
    const setLikeProducts = currentStoreState.setLikeList
    useEffect(() => {
        const getFav = async () => {
            const res = await getFavoriteProducts()
            console.log(res)
            setLikeProducts(res)
        }
        getFav()
    })

    return (
    <>
      <Suspense>
        <Header pageName="관심내역" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
      </Suspense>
      <Suspense>
        <ItemList data="like" />
      </Suspense>
    </>
  );
}
