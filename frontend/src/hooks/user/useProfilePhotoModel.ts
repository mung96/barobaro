import useFileModel from '@/hooks/shared/useFileModel';
import React, { useCallback, useRef } from 'react';

export default function useProfilePhotoModel() {
  const { file, changeFile } = useFileModel();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleProfileImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = event.target.files ? [event.target.files[0]] : [];
      await changeFile(newFile);
    },
    [changeFile],
  );
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    file,
    fileInputRef,
    handleProfileImage,
    handleButtonClick,
  };
}
