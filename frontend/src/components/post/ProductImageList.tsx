import { ChangeEvent } from 'react';
import { FaCamera } from 'react-icons/fa6';

type ProductImageListProps = {
  width: string;
  height: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  images: Array<string | ArrayBuffer | null>;
};

const ProductImageList = ({
  width,
  height,
  onChange,
  images,
}: ProductImageListProps) => {
  return (
    <div className="flex gap-2">
      <label
        style={{ width, height }}
        className="flex flex-col items-center justify-center border-gray-500 border rounded "
      >
        <FaCamera className="text-gray-300 w-4 h-4" />
        <p className="text-3xs">{images.length}/5</p>
        <input
          onChange={(event) => onChange(event)}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
        />
      </label>
      {images.map((image, index) => (
        <div
          className="border rounded border-gray-500 relative"
          style={{ width, height }}
        >
          <img
            key={index}
            src={image as string}
            alt="preview"
            className="border rounded border-gray-500 w-full h-full"
          />
          {index === 0 && (
            <p className="absolute bottom-0 text-center  text-white  bg-black text-[4px] w-full h-2 py-[1px]">
              대표사진
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductImageList;
