import dynamic from 'next/dynamic';

const DynamicItemList = dynamic(() => import('@/components/ItemList'), { ssr: false });
export default DynamicItemList;
