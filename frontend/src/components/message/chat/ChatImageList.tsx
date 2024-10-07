import { MdCancel } from 'react-icons/md';

type ChatImageListParams = {
  width: string;
  height: string;
  deleteFile: (index: number) => void;
  images: Array<string | ArrayBuffer | null>;
  // dropEnd: (result: DropResult) => void;
};

const ChatImageList = ({
  width,
  height,
  deleteFile,
  // dropEnd,
  images,
}: ChatImageListParams) => {
  return (
    <div className="flex gap-2  ">
      {images.map((image, index) => (
        <div className="relative">
          <div
            className="border rounded border-gray-500 relative"
            style={{ width, height }}
          >
            <div
              role="none"
              onClick={() => deleteFile(index)}
              className="absolute -top-2 z-10  -right-1 rounded-full bg-white w-6 h-6"
            >
              <MdCancel className="w-full h-full" />
            </div>
            <img
              src={image as string}
              alt="preview"
              className="border rounded border-gray-500 w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatImageList;
