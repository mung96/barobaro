import { CardsType } from '@/types/products/products';
import { faker } from '@faker-js/faker';
import {getRecentlyUploaded, getRecentlyViewed} from "@/apis/productApi";

// 하단 recentlyView, recentlyUploaded인 경우  API에 요청하고 데이터를 받는다.
const recentlyView = getRecentlyViewed()
const recentlyUploaded = getRecentlyUploaded()

export function productListSelector(data: CardsType) {
  if (data === 'recentlyView') return recentlyView;
  return recentlyUploaded;
}

const productAll = 'ALL';
const productSmartPhone = 'SmartPhone';
const productLightStick = 'lightStick';
const productCameraLens = 'cameraLens';
const productCameraBody = 'cameraBody';
const productTelescope = 'Telescope';
const productETC = 'ETC';

export function CategoryProductSelector(category: string) {
  if (category === 'all') return productAll;
  if (category === 'smartphone') return productSmartPhone;
  if (category === 'lightstick') return productLightStick;
  if (category === 'camerabody') return productCameraBody;
  if (category === 'cameralens') return productCameraLens;
  if (category === 'etc') return productETC;
  if (category === 'telescope') return productTelescope;
}
