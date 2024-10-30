"use client";
import React from "react";
import Image from "next/image";

export interface PublicationProps {
  title: string;
  author: string;
  conference_name: string;
  img_url: string;
  lastItem?: string;
  publish_yr: number;
  paper_type: string;
  id?: string;
  url?: string;
  handleEdit?: (id: string) => void;
  index: number;
}

const Publication: React.FC<PublicationProps> = ({ title, author, conference_name, lastItem, publish_yr, img_url, id, handleEdit, index, url }) => {
  const handleClick = () => {
    if (id && handleEdit) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleEdit(id);
      return;
    }
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <button onClick={handleClick} className="cursor-pointer flex flex-row pb-6 rounded mb-0 items-start gap-x-2">
      {img_url && (
        <div className="w-[140px] flex-shrink-0 flex items-center">
          <Image
            alt="Your alt text"
            src={img_url}
            width={140}
            height={0} // Only set width, let height adjust automatically
            className="transition-transform duration-300 hover:scale-150 object-contain"
          />
        </div>
      )}
      <div className=" pl-0  text-left mb-4 ">
        <div className="font-medium text-base mb-1" style={{ fontSize: "1rem" }}>
          {title}
        </div>
        <div className="text-sm mb-2 text-[#464646] font-medium">{author}</div>
        <div className="text-sm" style={{ color: "#0070a8" }}>
          {conference_name}, {publish_yr}
        </div>
      </div>
    </button>
  );
};

export default Publication;
