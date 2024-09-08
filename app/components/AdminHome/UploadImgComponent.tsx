"use client";
import { ImgType, useImageUpload } from "@/src/hooks/useImageUpload";
import Image from "next/image";
import React, { FC, useState } from "react";
import { GoTrash } from "react-icons/go";

interface UploadImgComponentProps {
  initialImages?: string[];
  addButtonLabel?: string;
  setImages: (updater: string[]) => void;

  multiple?: boolean;
}

const UploadImgComponent: FC<UploadImgComponentProps> = ({ initialImages = [], addButtonLabel = "+ Add Image", setImages, multiple }) => {
  const { handleUpload, handleDelete, handleMove } = useImageUpload(initialImages, setImages, multiple);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log({ multiple, initialImages });
    if (!Boolean(multiple) && initialImages.length > 0 && initialImages[0]) {
      const url = initialImages[0];
      await handleDelete(url, 0);
    }
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="flex items-center space-x-4 flex-wrap">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
        <input type="file" className="hidden" onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif,.webp" />
        <span>{addButtonLabel}</span>
      </label>
      {initialImages &&
        initialImages.length > 0 &&
        initialImages.map(
          (url, index) =>
            url && (
              <div key={index} className="relative">
                <img src={url} alt={`Image ${url}`} width={200} height={100} />
                <button onClick={() => handleDelete(url, index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                  <GoTrash />
                </button>
                <div className="flex justify-between mt-1">
                  <button onClick={() => handleMove(index, "left")} disabled={index === 0} className="disabled:opacity-50">
                    ⬅️
                  </button>
                  <button onClick={() => handleMove(index, "right")} disabled={index === initialImages.length - 1} className="disabled:opacity-50">
                    ➡️
                  </button>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default UploadImgComponent;
