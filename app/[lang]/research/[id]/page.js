"use client";
import React, { FC } from "react";

import { useFetchData } from "@/src/hooks/useFetchData";

const page = ({ params }) => {
  const { data: researchDetail } = useFetchData(`research-topic?id=${params.id}`, "get");
  if (!researchDetail) {
    return <p>Research topic not found.</p>;
  }

  return (
    <div className=" flex-grow   bg-read-bg mx-auto pt-8">
      <div className=" m-auto w-10/12  md:w-5/6  mb-24">
        <h1 className="text-3xl font-bold mb-6">{researchDetail.title}</h1>

        <div className="flex flex-row md:flex-wrap gap-x-8 mb-4">{researchDetail.media_url && researchDetail.media_url.map((url, id) => <img src={url} alt="Topic Img" className={`rounded w-full md:w-3/12 mb-4 ${id > 0 && " hidden md:flex"}`} />)}</div>

        <div className="text-base tiptap leading-7" dangerouslySetInnerHTML={{ __html: researchDetail.description }} />
      </div>
    </div>
  );
};

export default page;
