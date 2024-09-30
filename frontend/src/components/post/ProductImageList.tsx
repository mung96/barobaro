'use client';

import { FaCamera } from 'react-icons/fa6';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { MdCancel } from 'react-icons/md';

type ProductImageListProps = {
  width: string;
  height: string;
  addFile: (files: File[]) => void;
  deleteFile: (index: number) => void;
  images: Array<string | ArrayBuffer | null>;
  dropEnd: (result: DropResult) => void;
};

function ProductImageList({
  width,
  height,
  addFile,
  deleteFile,
  dropEnd,
  images,
}: ProductImageListProps) {
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-xs text-black">게시글 사진</p>
      <div className="flex gap-2">
        {images.length < 5 && (
          <label
            style={{ width, height }}
            className="flex flex-col items-center justify-center border-gray-500 border rounded pt-[6px]"
          >
            <FaCamera className="text-gray-300 w-7 h-7" />
            <p className="text-base">{images.length}/5</p>
            <input
              onChange={(event) => addFile(Array.from(event.target.files!))}
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
      </div>
    </div>
  );
}

export default ProductImageList;
