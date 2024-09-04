import { helveticaNeue } from "@/app/ui/fonts";
import React, { FC } from "react";

interface HeaderBondProps {
  title: string;
  bg_img: string;
}
const HeaderBond: FC<HeaderBondProps> = ({ title, bg_img }) => {
  return (
    <div className=" hidden md:block relative  w-full " style={{ height: "160px" }}>
      <img src={bg_img} className="w-full absolute" style={{ height: "160px" }} />
      <h4 className={`absolute absolute-middle text-3xl font-medium text-white ${helveticaNeue.className}`}>{title}</h4>
    </div>
  );
};

export default HeaderBond;
