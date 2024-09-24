import { convertFileListToArray } from '@/utils/fileUtils';
import { ChangeEvent, useMemo, useState } from 'react';

const useFileModel = () => {
  const [files, setFiles] = useState<Array<string | ArrayBuffer | null>>([]);

  const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileArr = await convertFileListToArray(e.target.files!);

    setFiles(fileArr);
    e.target.value = '';
  };

  const file = useMemo(() => {
    return files[0];
  }, [files]);

  return { files, file, changeFile };
};

export default useFileModel;
