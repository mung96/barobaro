import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getLentProducts = async () => {
    const response = await axiosInstance.get(END_POINT.LENT);
    console.log('LENT RES', response.data.body['products'])
    return response.data.body['products'];
}

export const getBorrowProducts = async () => {
    const response = await axiosInstance.get(END_POINT.BORROW);
    console.log('BORROW RES', response.data.body['products'])
    return response.data.body['products'];
}

export const getRecentlyUploaded = async () => {
    const response = await axiosInstance.get(END_POINT.RECENTLY_UPLOADED);
    console.log('RECENTLY UPLOADED', response.data.body['products'])
    return response.data.body['products'];
}

export const getRecentlyViewed = async () => {
    const response = await axiosInstance.get(END_POINT.RECENTLY_VIEWED);
    console.log('RECENTLY VIEWED', response.data.body['products'])
    return response.data.body['products'];
}



export const postProduct = async (product: ProductAddRequest,images:File[]) => {
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(product)], { type: 'application/json' });

    formData.append('dto', blob);
    images.map((image) => {
        formData.append('files',image);
    })

    console.dir(product);
    console.dir(images);

    return await axiosInstance.post(END_POINT.PRODUCT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

export const getFavoriteProducts = async () => {
    console.log('GET FAVORITEPRODUCTS')
    const response = await axiosInstance.get(END_POINT.WISH_LIST);
    console.log('Favorite RES', response.data.body['products'])
    return response.data.body['products'];
}