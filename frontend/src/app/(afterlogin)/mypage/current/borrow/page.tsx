'use client';

import NavBarLayout from '@/layout/NavBarLayout';
// import ItemList from '@/components/ItemList';
import Header from '@/components/Header';
import ItemList from '@/components/ItemList';
import { useEffect } from "react";
import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";
import {ProductResponse} from "@/types/apis/productResponse";

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
        <Header
          pageName="마이페이지"
          hasPrevBtn
          hasSearchBtn={false}
          hasAlertBtn
        />
      </header>
      <main>
        <ItemList data="borrow" />
      </main>
    </>
  );
}
