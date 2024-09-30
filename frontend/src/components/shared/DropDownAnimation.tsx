'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type DropDownAnimationProps = {
  children: ReactNode;
  isOpen: boolean;
};

function DropDownAnimation({ children, isOpen }: DropDownAnimationProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={
          isOpen
            ? { opacity: 1, y: 0, height: 'auto' }
            : { opacity: 0, y: -10, height: 0 }
        }
        exit={{ opacity: 1, y: -10, height: '110px' }}
        transition={{ duration: 0.15 }}
        className={isOpen ? 'z-10' : '-z-10'}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default DropDownAnimation;
