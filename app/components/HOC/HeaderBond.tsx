import { helveticaNeue } from "@/app/ui/fonts";
import React, { FC } from "react";
import Image from "next/image";

interface HeaderBondProps {
  title: string;
  bg_img: string;
}
const HeaderBond: FC<HeaderBondProps> = ({ title, bg_img }) => {
  return (
    <div className=" hidden md:block relative  w-full " style={{ height: "160px" }}>
      <Image src={bg_img} alt="" className="w-full absolute" layout="fill" />

      <h4 className={`absolute absolute-middle text-3xl font-medium text-white ${helveticaNeue.className}`}>{title}</h4>
    </div>
  );
};

export default HeaderBond;
