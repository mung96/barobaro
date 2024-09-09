'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type PageTransitionProps = {
  children: React.ReactNode;
  step: string;
};

function PageTransition({ children, step }: PageTransitionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(`${pathname}?${searchParams}/${step}`);
  }, [pathname, searchParams, step]);

  useEffect(() => {
    console.log(currentUrl);
  }, [currentUrl]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentUrl}
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '-100vw' }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
