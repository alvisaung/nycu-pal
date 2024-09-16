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
    <button onClick={handleClick} className="cursor-pointer flex flex-row pb-2 rounded mb-0 items-start">
      <div className=" pl-0  text-left mb-3 text-base">
        <span className="font-light">
          {index + 1}. {author},
        </span>
        <span className="font-bold" style={{ color: "#0070a8", fontWeight: 500 }}>
          {" "}
          "{title}",{" "}
        </span>
        <span>
          {conference_name}, {publish_yr}
        </span>
      </div>
    </button>
  );
};

export default Publication;
