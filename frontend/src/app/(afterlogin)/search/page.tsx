import { Suspense } from 'react';
import CategoryDetailContent from '@/components/SearchParams';

export default function CategoryDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryDetailContent />
    </Suspense>
  );
}
