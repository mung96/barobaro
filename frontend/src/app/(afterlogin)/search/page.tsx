import { lazy, Suspense } from 'react';

const CategoryDetailContent = lazy(() => import('@/components/SearchParams'));

export default function CategoryDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryDetailContent />
    </Suspense>
  );
}
