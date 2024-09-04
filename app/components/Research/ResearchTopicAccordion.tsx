"use client";

import React, { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";

export interface AccordionProps {
  children: ReactNode;
  trigger: string;
}

const ResearchTopicAccordion: FC<AccordionProps> = ({ children, trigger }) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);

  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (open) {
      setHeight(ref.current?.offsetHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className=" bg-[#F6F6F6] drop-shadow-md	rounded mb-5">
      <div role="button" onClick={() => setOpen(!open)} style={{ borderBottom: "1px solid #DFDFDF" }} className="flex justify-between items-center font-normal p-5 pt-6 text-lg ">
        {trigger}
        <img src="/imgs/down-arrow.png" style={{ width: 24, height: 20 }} className={`transition-transform duration-500	 ${open ? "rotate-180" : ""}`} />
      </div>

      <div className="overflow-y-hidden duration-300 transition-all " style={{ height }}>
        <div ref={ref} className=" pt-5 p-4 pl-8 ">
          {children}
        </div>
      </div>
    </div>
  );
};
export default ResearchTopicAccordion;
