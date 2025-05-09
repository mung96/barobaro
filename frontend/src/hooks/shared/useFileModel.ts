import { useMemo, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { readFileArray } from '@/utils/fileUtils';

const useFileModel = () => {
  const [files, setFiles] = useState<Array<string | ArrayBuffer | null>>([]);
  const changeFile = async (fileArray: File[]) => {
    const fileArr = await readFileArray(fileArray);

    setFiles(fileArr);
  };

  const file = useMemo(() => {
    return files[0];
  }, [files]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const copiedFiles = [...files];
    const add = copiedFiles[source.index];
    copiedFiles.splice(source.index, 1);
    copiedFiles.splice(destination.index, 0, add);
    setFiles(copiedFiles);
  };

  const deleteFileByIndex = (index: number) => {
    const newFiles: Array<string | ArrayBuffer | null> = [];
    files.filter((fileItem, idx) => {
      return idx !== index && newFiles.push(fileItem);
    });
    setFiles(newFiles);
  };

  return { files, file, changeFile, handleDragEnd, deleteFileByIndex };
};

export default useFileModel;
