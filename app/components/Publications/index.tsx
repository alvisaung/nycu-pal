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
}

const Publication: React.FC<PublicationProps> = ({ title, author, conference_name, lastItem, publish_yr, img_url, id, handleEdit }) => {
  const handleClick = () => {
    if (id) {
      handleEdit(id);
    } else {
      return "";
    }
  };

  return (
    <button onClick={handleClick} className="cursor-pointer flex flex-row pb-5 rounded mb-5 items-start" style={{ borderBottom: lastItem ? "" : "1px solid rgba(221, 221, 221,0.7)" }}>
      <img src={"/imgs/placeholder/publication.png"} alt="Nature Communications Logo" className="hidden md:block w-32  object-contain" />

      <div className=" pl-0 md:pl-3 text-left">
        <h2 className=" mb-4 text-base font-medium ">{title}</h2>
        <p className="text-sm mb-3 font-medium opacity-85" style={{ color: "#464646" }}>
          {author}
        </p>
        <p className="text-sm font-medium" style={{ color: "#0088CC" }}>
          {conference_name}, {publish_yr}
        </p>
      </div>
    </button>
  );
};

export default Publication;
