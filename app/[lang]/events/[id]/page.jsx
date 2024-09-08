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

  // const data = {
  //   title: "余沛慈老師和張祐嘉老師合作研發的解析度增益技術獲得科學人雜誌專訪",
  //   date: "2024-09-15",
  //   type: ActivityType.AWARD,
  //   desc: "羅倫·伊普森是印刷和排版行業的虛擬文本。自1500年代以來，羅倫·伊普森一直是該行業的標準虛擬文本。當時，一位不知名的印刷商採取了印刷標本書，並將其製作成樣本書。這本書不僅經歷了五個世紀的變遷，也經歷了電子排版的變遷，並且基本保持不變。它在1960年代的電子排版時期變得更加流行，當時包含羅倫·伊普森段落的圖文集出版了，最近還隨著包括羅倫·伊普森版本的桌面出版軟件如Aldus PageMaker一起出現。<br/> 相反，相信羅倫·伊普森不是隨機文本。它起源於一段古拉丁文文學，公元前45年的作品，使其在經典文學中有2000多年的歷史。維吉爾《悲劇》第一卷的第1.10.32和第1.10.33行中，有一句在羅倫·伊普森段落中出現的句子：「羅倫·伊普森·多洛·希特·阿米特」，這一片段是從公元45年到15年的西塞羅的「德·芬尼布斯·博尼·艾特·馬利」。<br/>羅倫·伊普森是印刷和排版行業的虛擬文本。自1500年代以來，羅倫·伊普森一直是該行業的標準虛擬文本。當時，一位不知名的印刷商採取了印刷標本書，並將其製作成樣本書。這本書不僅經歷了五個世紀的變遷，也經歷了電子排版的變遷，並且基本保持不變。它在1960年代的電子排版時期變得更加流行，當時包含羅倫·伊普森段落的圖文集出版了，最近還隨著包括羅倫·伊普森版本的桌面出版軟件如Aldus PageMaker一起出現。  相反，相信羅倫·伊普森不是隨機文本。它起源於一段古拉丁文文學，公元前45年的作品，使其在經典文學中有2000多年的歷史。維吉爾《悲劇》第一卷的第1.10.32和第1.10.33行中，有一句在羅倫·伊普森段落中出現的句子：「羅倫·伊普森·多洛·希特·阿米特」，這一片段是從公元45年到15年的西塞羅的「德·芬尼布斯·博尼·艾特·馬利」。",
  //   // img_url: "/imgs/placeholder/activity.jpg",
  //   img_url: "/imgs/placeholder/ss.jpg",
  // };

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
        {youtube_embed_url && <div dangerouslySetInnerHTML={{ __html: youtube_embed_url }} />}
        {img_url_trans.length > 0 && (
          <div className=" max-h-[28rem] w-5/6 rounded-md overflow-hidden">
            <Carousel removeDot images={img_url_trans} />
          </div>
        )}

        <div className="text-base md:text-lg mt-4 leading-8 tracking-wide	" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    </div>
  );
};
export default Page;
