'use client';

import { motion, AnimatePresence } from 'framer-motion';

export type DirectionType = 'forward' | 'backward';
type PageTransitionProps = {
  children: React.ReactNode;
  step: string;
  direction: DirectionType;
};

function PageTransition({ children, step, direction }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{
          opacity: 0,
          x: direction === 'forward' ? '50vw' : '-50vw',
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 'forward' ? '-50vw' : '50vw' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
