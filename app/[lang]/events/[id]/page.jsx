"use client";
import { ActivityType } from "@/app/components/Activities";
import Carousel from "@/app/components/Carousel";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import { useFetchData } from "@/src/hooks/useFetchData";
import { DateTimeFormatOptions } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data } = useFetchData(`events?id=${id}`);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).replace(",", " in");
  };

  if (!data) return <div></div>;
  const { title, createdAt, desc, type, img_url, youtube_embed_url } = data;

  const img_url_trans = img_url ? img_url.map((item) => ({ url: item })) : [];

  return (
    <div className="bg-read-bg flex-grow ">
      <HeaderBond title="Blog Detail" bg_img="/imgs/title-bond/blog-detail.png" />
      <div className="m-auto md:w-9/12 w-11/12 mb-24 mt-8 ">
        <div className="flex flex-row  mb-4  items-center gap-x-2">
          <Link href={"/events"} className="font-medium md:text-base text-sm underline text-[#003D59]">
            Blog List
          </Link>
          <img src="/imgs/down-arrow.png" className="-rotate-90" style={{ width: "10px", height: "12px" }} />
          <p className="font-light md:text-base text-sm ">Blog List</p>
        </div>

        <h3 className="md:text-3xl text-xl font-bold mb-2">{title}</h3>
        <h3 className="text-xs font-medium mb-2 " style={{ color: "#565555" }}>
          {formatDate(createdAt)}
        </h3>

        {youtube_embed_url && <div className="tiptap" dangerouslySetInnerHTML={{ __html: youtube_embed_url }} />}
        {img_url_trans.length > 0 && (
          <div className=" w-4/6 rounded-md">
            <Carousel removeDot images={img_url_trans} />
          </div>
        )}

        <div className="text-base md:text-lg mt-4 leading-8 tracking-wide tiptap	" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </div>
  );
};
export default Page;
