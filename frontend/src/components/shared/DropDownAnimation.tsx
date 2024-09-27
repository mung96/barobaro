'use client';

import { motion, AnimatePresence } from 'framer-motion';

type DropDownAnimationProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

function DropDownAnimation({
  children,
  isOpen,
  onClose,
  title,
}: DropDownAnimationProps) {
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
        <div className="rounded-xl bg-white relative flex flex-col items-center h-96 justify-center shadow-md border-gray-300 border-[1px] w-[300px]">
          <p className="font-bold text-xl py-4 px-4" onClick={onClose}>
            {title}
          </p>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DropDownAnimation;
