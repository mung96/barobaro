import { CardsType } from '@/types/products/products';
import { faker } from '@faker-js/faker';

// 하단 recentlyView, recentlyUploaded인 경우  API에 요청하고 데이터를 받는다.
const recentlyView = [
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'RecentlyView1',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    isWished: true,
  },
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'RecentlyView2',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    isWished: false,
  },
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'RecentlyView3',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    isWished: true,
  },
];

const recentlyUploaded = [
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'RecentlyUploaded1',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    isWished: true,
  },
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'RecentlyUploaded2',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    isWished: false,
  },
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'RecentlyUploaded3',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    isWished: false,
  },
];

export function productListSelector(data: CardsType) {
  let ans;
  {
    data === 'recentlyView' ? (ans = recentlyView) : (ans = recentlyUploaded);
  }
  return ans;
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
