'use client';

import Header from '@/components/Header';
import ItemList from '@/components/ItemList';
import { getFavoriteProducts } from "@/apis/productApi";
import { useEffect } from "react";
import { useCurrentActions } from "@/store/useCurrentStore";
import {Suspense} from "react";

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
