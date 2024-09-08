// useImageUpload.ts
import api from "@/app/api";
import { useState } from "react";

export interface ImgType {
  filename: string;
  url: string;
  multiple?: boolean;
}
type SetValueType = (updater: string[]) => void;

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
      // if (res && !Boolean(multiple)) {
      //   setImages(res.data.image.url);
      // } else if (res && Boolean(multiple)) {
      // }
      setImages([...imgs, res.data.image.url]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (url: string, index: number) => {
    const split = url.split("/");
    const filename = split[split.length - 1];
    const leftImg: string[] = imgs.filter((_, i) => i !== index);
    setImages(leftImg);
    const res = await api.delete("upload-img", {
      data: {
        filename: filename,
      },
    });
    console.log(res);
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    // setImages((prevImages: string[]) => {
    if ((direction === "left" && index > 0) || (direction === "right" && index < imgs.length - 1)) {
      const newImages = [...imgs];
      const swapIndex = direction === "left" ? index - 1 : index + 1;
      [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
      setImages(newImages);
    }
    // });
  };

  return { handleUpload, handleDelete, handleMove };
};
