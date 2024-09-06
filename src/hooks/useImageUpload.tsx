// useImageUpload.ts
import api from "@/app/api";
import { useState } from "react";

export interface ImgType {
  filename: string;
  url: string;
  multiple?: boolean;
}
type SetValueType = (updater: (prevImages: string[]) => string[]) => void;

export const useImageUpload = (imgs: string[], setImages: SetValueType, multiple?: boolean) => {
  // const [images, setImages] = useState<ImgType[]>(initialImages);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    try {
      const res = await api.post("upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res && !Boolean(multiple)) {
        setImages(res.data.image.url);
      } else if (res && Boolean(multiple)) {
        setImages((prevImages) => [...prevImages, res.data.image.url]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (index: number) => {
    const leftImg: string[] = imgs.filter((_, i) => i !== index);
    setImages((prevImages) => leftImg);
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    setImages((prevImages: string[]) => {
      if ((direction === "left" && index > 0) || (direction === "right" && index < prevImages.length - 1)) {
        const newImages = [...prevImages];
        const swapIndex = direction === "left" ? index - 1 : index + 1;
        [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
        return newImages;
      }
      return prevImages;
    });
  };

  return { handleUpload, handleDelete, handleMove };
};
