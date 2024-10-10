'use client';

import { lazy, Suspense, useEffect } from "react";
import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";
import {ProductResponse} from "@/types/apis/productResponse";

const Header = lazy(() => import('@/components/Header'));
const ItemList = lazy(() => import('@/components/ItemListWithContract'));

export default function List() {
    useEffect(() => {
        const getResponse = async () => {
            try {
                const response = await axiosInstance.get<ProductResponse>(END_POINT.BORROW)
                console.log('RES', response);
            } catch (err) {
                console.log('빌린거 ', err);
            }
        };
        getResponse();
    }, [])
    return (
        <>
      <header>
        <Suspense>
          <Header
            pageName="마이페이지"
            hasPrevBtn
            hasSearchBtn={false}
            hasAlertBtn
          />
        </Suspense>
      </header>
      <main>
        <Suspense>
          <ItemList data="borrow" />
        </Suspense>
      </main>
    </>
  );
}
