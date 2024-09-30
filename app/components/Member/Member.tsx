import { TrashIcon } from "lucide-react";
import React, { FC } from "react";

export interface MemberType {
  id: number;
  img_url?: string;
  name: string;
  research_dir?: string;
  email?: string;
  handleClick?: () => void;
  handleDelete?: () => void;
  phone?: string;
  experiences?: string;
  isAlumni?: boolean;
}

const Member: FC<MemberType> = ({ img_url, name, research_dir, email, handleClick, handleDelete, isAlumni }) => {
  return (
    <div style={{ boxShadow: "2px 2px 4px 1px rgba(0,0,0,0.25)", height: "100%" }} onClick={handleClick} className="bg-white py-4 px-7 w-[260px] relative flex flex-col items-center font-space-grotesk hover:rounded-lg hover:bg-slate-50 cursor-pointer">
      {handleDelete && (
        <TrashIcon
          className="absolute right-0"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        />
      )}
      <img src={img_url} alt="Member Img" className="w-40 rounded-full h-40 object-cover " />
      <h4 className="text-xl font-medium mt-2  text-[#07182B]">{name}</h4>
      {!isAlumni && (
        <>
          <h5 className="text-sm text-[#F8895D] font-medium tracking-wide mt-2 text-center">
            Thesis:
            {research_dir}
          </h5>

          <div className="flex text-sm text-[#07182B]  flex-row  items-center gap-x-1 my-2">{email}</div>
        </>
      )}
    </div>
  );
};

export default Member;
