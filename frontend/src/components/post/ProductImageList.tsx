'use client';

import { FaCamera } from 'react-icons/fa6';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

type ProductImageListProps = {
  width: string;
  height: string;
  onChange: (files: File[]) => void;
  images: Array<string | ArrayBuffer | null>;
  dropEnd: (result: DropResult) => void;
};

function ProductImageList({
  width,
  height,
  onChange,
  dropEnd,
  images,
}: ProductImageListProps) {
  return (
    <div className="flex gap-2">
      {images.length < 5 && (
        <label
          style={{ width, height }}
          className="flex flex-col items-center justify-center border-gray-500 border rounded "
        >
          <FaCamera className="text-gray-300 w-4 h-4" />
          <p className="text-3xs">{images.length}/5</p>
          <input
            onChange={(event) => onChange(Array.from(event.target.files!))}
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
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex  gap-2"
            >
              {images.map((image, index) => (
                <Draggable
                  draggableId={`test-${index}`}
                  index={index}
                  key={`test-${index}`}
                >
                  {(provided) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="relative"
                      >
                        <div
                          className="border rounded border-gray-500 relative"
                          style={{ width, height }}
                        >
                          <img
                            src={image as string}
                            alt="preview"
                            className="border rounded border-gray-500 w-full h-full"
                          />
                        </div>
                        {index === 0 && (
                          <p className="absolute bottom-0 text-center  text-white  bg-black text-[4px] w-full h-2 py-[1px]">
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
  );
}

export default ProductImageList;
