"use client";
import React from "react";

export interface PublicationProps {
  title: string;
  author: string;
  conference_name: string;
  img_url: string;
  lastItem?: string;
  publish_yr: number;
  paper_type: string;
  id?: string;
  handleEdit?: (id: string) => void;
  index: number;
}

const Publication: React.FC<PublicationProps> = ({ title, author, conference_name, lastItem, publish_yr, img_url, id, handleEdit, index }) => {
  const handleClick = () => {
    if (id && handleEdit) {
      handleEdit(id);
    } else {
      return "";
    }
  };

  return (
    <button onClick={handleClick} className="cursor-pointer flex flex-row pb-4 rounded mb-0 items-start gap-x-2">
      {img_url && <img src={img_url} className="w-32 h-fit" />}
      <div className=" pl-0  text-left mb-3 ">
        <div className="font-medium text-lg mb-2">
          {index + 1}. {title}
        </div>
        <div className="text-base mb-2">{author}</div>
        <div className="text-sm" style={{ color: "#0070a8" }}>
          {conference_name}, {publish_yr}
        </div>
      </div>
    </button>
  );
};

export default Publication;
