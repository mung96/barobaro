'use client';

import { FaCamera } from 'react-icons/fa6';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { MdCancel, MdError } from 'react-icons/md';
import { IMAGE_MAX_LENGTH } from '@/constants/post';
import { useEffect, useState } from 'react';

type ProductImageListProps = {
  width: string;
  height: string;
  addFile: (files: File[]) => void;
  deleteFile: (index: number) => void;
  images: Array<string | ArrayBuffer | null>;
  dropEnd: (result: DropResult) => void;
  onChange: (images: File[]) => void;

};

function ProductImageList({
  width,
  height,
  addFile,
  deleteFile,
  dropEnd,
  images, onChange

}: ProductImageListProps) {
  const [isError, setIsError] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (!isFirst && images.length == 0) {
      setIsError(true)
    }
  }, [images])
  return (
    <div className="flex gap-1 flex-col relative">
      <p className="text-base text-black">게시글 사진</p>
      <div className="flex gap-2">
        {images.length < IMAGE_MAX_LENGTH && (
          <label
            style={{ width, height }}
            className="flex flex-col items-center justify-center border-gray-500 border rounded pt-[6px]"
          >
            <FaCamera className="text-gray-300 w-7 h-7" />
            <p className="text-base">{images.length}/{IMAGE_MAX_LENGTH}</p>
            <input
              onChange={(event) => {
                if (event.target.files!.length > IMAGE_MAX_LENGTH || event.target.files!.length === 0) {
                  setIsError(true);
                } else {
                  addFile(Array.from(event.target.files!))
                  onChange(Array.from(event.target.files!))
                }
                setIsFirst(false);
              }}
              type="file"
              accept="image/*"
              className="hidden"
              multiple
            />
          </label>
        )}
        <DragDropContext onDragEnd={dropEnd}>
          <Droppable droppableId="imagelist" direction="horizontal">
            {(provided) => (
              <div
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex  gap-2"
              >
                {images.map((image, index) => (
                  <Draggable
                    draggableId={`test-${image}`}
                    index={index}
                    key={`test-${image}`}
                  >
                    {(dragProvided) => {
                      return (
                        <div
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...dragProvided.draggableProps}
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...dragProvided.dragHandleProps}
                          ref={dragProvided.innerRef}
                          className="relative"
                        >
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
                          {index === 0 && (
                            <p className="absolute bottom-0 text-center  text-white  bg-black text-2xs w-full h-5 py-[3px]">
                              대표사진
                            </p>
                          )}
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isError && <p
          className={`text-xs flex gap-1 absolute -bottom-1 translate-y-full text-pinkRed`}
        >
          <MdError className="text-pinkRed text-sm" />
          사진은 1장에서 5장까지 업로드 가능합니다.
        </p>}
      </div>
    </div >
  );
}

export default ProductImageList;
