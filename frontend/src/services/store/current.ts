import { faker } from '@faker-js/faker';
import { ItemListType } from '@/types/products/products';
import useCurrentStore from '@/store/useCurrentStore';

const createBorrowList = (): ItemListType => [
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'Example2',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    productStatus: 'IN_PROGRESS',
  },
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'Example1',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    productStatus: 'FINISH',
  },
];

const createLentList = (): ItemListType => [
  {
    productId: faker.number.int(9999),
    productMainImage: faker.image.urlLoremFlickr(),
    title: 'Example1 - Lent',
    startDate: faker.date.recent().toLocaleDateString('ko-KR'),
    endDate: faker.date.recent().toLocaleDateString('ko-KR'),
    rentalFee: Number(faker.commerce.price({ min: 1000, max: 100000, dec: 0 })),
    productStatus: 'FINISH',
  },
];

export default function UploadCurrentStore(data: 'borrow' | 'lent'): void {
  if (data === 'borrow') {
    useCurrentStore.getState().setBorrowList(createBorrowList());
    return;
  }
  if (data === 'lent') {
    useCurrentStore.getState().setLentList(createLentList());
  }
}
