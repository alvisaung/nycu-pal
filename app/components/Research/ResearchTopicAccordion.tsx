"use client";

import React, { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export interface AccordionProps {
  children: ReactNode;
  trigger: string;
  topic_id?: number;
  id: number;
}

const ResearchTopicAccordion: FC<AccordionProps> = ({ children, trigger, topic_id, id }) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const router = useRouter();

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
      <div role="button" onClick={() => setOpen(!open)} style={{ borderBottom: "1px solid #DFDFDF" }} className="flex justify-between items-center  font-medium p-5 pt-6 text-lg ">
        <div>
          {id + 1}.{" "}
          <span
            className="nav_menu_item_black"
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/research/${topic_id}`);
            }}
          >
            {trigger}
          </span>
        </div>

        <img src="/imgs/down-arrow.png" style={{ width: 24, height: 20 }} className={`transition-transform duration-500	 ${open ? "rotate-180" : ""}`} />
      </div>

      <div className="overflow-y-hidden duration-300 transition-all " style={{ height }}>
        <div ref={ref} className=" pt-5 p-4 md:pl-8 pl-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};
export default ResearchTopicAccordion;
