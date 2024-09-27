"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Component, FC } from "react";
import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";

// export declare type ActivityType = "Award" | "Conferences" | "Events";
export enum ActivityType {
  AWARD = "Award",
  CONFERENCE = "Conference",
  EVENT = "Event",
}
export type ActivityData = {
  id: string;
  title: string;
  desc: string;
  img_url?: string[];
  type: ActivityType;
  lastItem?: Boolean;
  admin?: Boolean;
  EventsType?: EventsTypeData;
  youtube_embed_url?: string;
  event_date?: string;
};
type EventsTypeData = {
  id: string;
};
type ActivityProps = ActivityData & {
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

const Activity = ({ id, title, desc, img_url, event_date, type, lastItem, admin, onDelete, youtube_embed_url }: ActivityProps) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const router = useRouter();

  const processTime = (date: string | undefined) => {
    if (!date) return;
    const instance = new Date(date);
    const month = months[instance.getMonth()];
    const yr = instance.getFullYear();
    const day = instance.getDate();
    return `${day} ${month} ${yr}`;
  };
  let plainDesc = desc ? desc.replace(/<[^>]+>/g, "") : "";
  const hasImg = Boolean(img_url && img_url[0]);
  return (
    <div className=" flex flex-row items-start">
      <Link href={`/events/${id}`} style={{ borderBottom: lastItem ? "" : "1px solid rgba(221, 221, 221,0.7)" }} className="mb-6 border-custom-light-grey cursor-pointer w-full">
        <div className="flex flex-row justify-between items-start mb-6 gap-x-4 w-full">
          <div className={`w-full md:w-9/12 ${!hasImg && "md:w-full"}`}>
            <h3 className="font-medium text-base mb-1.5">{title}</h3>
            <h5 className="text-sm font-light mb-2 overflow-hidden text-ellipsis line-clamp-2" style={{ color: "#555555" }}>
              {plainDesc}
            </h5>
            <div className="flex text-xs font-medium items-center   flex-row gap-x-4 mb-1 ">
              <p className=" text-custom-grey">{processTime(event_date)}</p>
              <div style={{ width: "1px" }} className=" bg-custom-light-grey h-4"></div>
              <p className="text-custom-activity-award  font-medium">{type}</p>
              <div style={{ width: "1px" }} className=" bg-custom-light-grey h-4"></div>
              <p className="font-normal text-custom-activity-award ">{`Learn more > `}</p>
            </div>
          </div>
          {hasImg && <img src={img_url && img_url[0]} alt="img" className="w-48 h-40 object-cover rounded md:block hidden " />}
        </div>
      </Link>
      {admin && (
        <div className="gap-y-4">
          <button onClick={() => router.push(`/admin/add-activity/${id}`)}>
            <MdEdit size={"1.5em"} />
          </button>
          <button onClick={() => onDelete && onDelete(id)}>
            <GoTrash size={"1.5em"} />
          </button>
        </div>
      )}
    </div>
  );
};
export default Activity;
