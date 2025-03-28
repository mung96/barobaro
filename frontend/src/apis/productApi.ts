import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { ProductAddRequest } from '@/types/apis/productRequest';

export const getLentProducts = async () => {
  const response = await axiosInstance.get(END_POINT.LENT);
  console.log('LENT RES', response.data.body['products']);
  return response.data.body['products'];
};

export const getBorrowProducts = async () => {
  const response = await axiosInstance.get(END_POINT.BORROW);
  console.log('BORROW RES', response.data.body['products']);
  return response.data.body['products'];
};

export const getRecentlyUploaded = async () => {
  try {
    const response = await axiosInstance.get(END_POINT.RECENTLY_UPLOADED);
    console.log('RECENTLY UPLOADED', response.data.body['products']);
    return response.data.body['products'];
  } catch (err) {
    console.log('RECENTLY GET ERR (UPLOADED)', err)
  }

};

export const getRecentlyViewed = async () => {
  try{
    const response = await axiosInstance.get(END_POINT.RECENTLY_VIEWED);
    console.log('RECENTLY VIEWED', response.data.body['products']);
    return response.data.body['products'];
  } catch (err) {
    console.log('RECENTLY GET ERR (UPLOADED)', err)
  }

};

export const postProduct = async (product: ProductAddRequest, images: File[]) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(product)], { type: 'application/json' });

  formData.append('dto', blob);
  images.map((image) => {
    formData.append('files', image);
  });

  console.dir(product);
  return await axiosInstance.post(END_POINT.PRODUCT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getFavoriteProducts = async () => {
  console.log('GET FAVORITEPRODUCTS');
  const response = await axiosInstance.get(END_POINT.WISH_LIST);
  console.log('Favorite RES', response.data.body['products']);
  return response.data.body['products'];
};
