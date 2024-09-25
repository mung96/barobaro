const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });
};

export const readFileArray = async (files: File[]) => {
  const fileArr: Array<string | ArrayBuffer | null> = [];
  //파일을 변환하는 과정
  await Promise.all(files.map(readFile))
    .then((results) => {
      results.forEach((result) => fileArr.push(result));
    })
    .catch((error) => {
      console.error('파일을 읽는 중 에러가 발생했습니다.', error);
    });
  return fileArr;
};
