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
      console.log(imgs);
      imgs.length > 0 && Boolean(imgs[0]) ? setImages([...imgs, res.data.image.url]) : setImages([res.data.image.url]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (url: string, index: number) => {
    let isConfirm = window.confirm("確定要刪除圖片嗎？");
    if (!isConfirm) return;
    const split = url.split("/");
    const filename = split[split.length - 1];
    const leftImg: string[] = imgs.filter((_, i) => i !== index);
    setImages(leftImg);
    try {
      const res = await api.delete("upload-img", {
        data: {
          filename: filename,
        },
      });
    } catch (err) {
      console.log(err);
    }
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
