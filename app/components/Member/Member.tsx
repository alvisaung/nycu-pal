import React, { FC } from "react";
import { FiMail } from "react-icons/fi";

export interface MemberType {
  id: number;
  img_url?: string;
  name: string;
  research_dir?: string;
  email?: string;
  handleClick?: () => void;
  phone?: string;
  experiences?: string;
}
const Member: FC<MemberType> = ({ img_url, name, research_dir, email, handleClick }) => {
  return (
    <div style={{ boxShadow: "2px 2px 4px 1px rgba(0,0,0,0.25)" }} onClick={handleClick} className="bg-white py-4 px-7 w-fit flex flex-col items-center font-space-grotesk w-[220px] hover:rounded-lg hover:bg-slate-50 cursor-pointer">
      {/* <img src={img_url} alt="Member Img" className="w-36 rounded-full h-36 object-cover " /> */}
      <img src={"https://i.ibb.co/7gWxsRt/1048865463-orig.jpg"} alt="Member Img" className="w-36 rounded-full h-36 object-cover " />
      <h4 className=" text-xl font-medium mt-2  text-[#07182B]">{name}</h4>
      <h5 className="text-[#F8895D] text-base font-medium tracking-wide mt-2 ">
        {/* <span className="font-normal text-[#07182B]"></span> */}
        Thesis: {research_dir}{" "}
      </h5>

      <div className="flex  flex-row text-base items-center gap-x-1 my-2">
        <FiMail />
        <h5 className=" text-sm text-[#07182B]">{email}</h5>
      </div>
    </div>
  );
};

export default Member;
