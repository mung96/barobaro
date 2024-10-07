import AttatchImage from '@/components/(SVG_component)/(message)/(chat)/AttatchImage';

type ChatImageListParams = {
  width: string;
  height: string;
  addFile: (files: File[]) => void;
  // dropEnd: (result: DropResult) => void;
};

const ChatImageAdd = ({
  width,
  height,
  addFile,
  // dropEnd,
}: ChatImageListParams) => {
  return (
    <label
      style={{ width, height }}
      className="flex flex-col items-center justify-center "
    >
      <AttatchImage className="" />
      <input
        onChange={(event) => addFile(Array.from(event.target.files!))}
        type="file"
        accept="image/*"
        className="hidden"
        multiple
      />
    </label>
  );
};

export default ChatImageAdd;
