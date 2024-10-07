import { useEffect, useMemo, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { readFileArray } from '@/utils/fileUtils';

const useChatFileModel = () => {
  const [files, setFiles] = useState<Array<string | ArrayBuffer | null>>([]);

  // 기존 useFileModel에서 다음 부분 추가 =====
  const [activeTextArea, setActiveTextArea] = useState(true);
  const [chatWarning, setChatWarning] = useState('');
  // 파일이 추가되면 사진 미리보기가 기존 TextArea 자리에 표시됨
  // 파일이 모두 삭제되었거나 업로드되지 않은 상태에서는 TextArea가 표시됨

  const warningHandler = (param: string) => {
    setChatWarning(param);
  };

  useEffect(() => {
    if (files.length > 0 && files.length < 6) {
      setActiveTextArea(false);
      setChatWarning('');
    } else if (files.length >= 6) {
      setChatWarning('최대 5장 첨부 가능');
      setActiveTextArea(true);
    } else setActiveTextArea(true);
  }, [files]);

  // ========================================

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

  return {
    files,
    file,
    changeFile,
    handleDragEnd,
    deleteFileByIndex,
    activeTextArea,
    chatWarning,
    warningHandler,
  };
};

export default useChatFileModel;
