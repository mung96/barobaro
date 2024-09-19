import React from 'react';

export default function BlueToggle({ isSelected }: { isSelected: boolean }) {
  return (
    <div className={`w-9 h-4 rounded-full relative transition-colors duration-300 ease-in-out ${isSelected ? 'bg-blue-500' : 'bg-gray-300'}`}>
      <div
        className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
          isSelected ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`}
      />
    </div>
  );
}
