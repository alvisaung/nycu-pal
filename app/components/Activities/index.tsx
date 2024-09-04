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
  img_url?: string;
  createdAt: string;
  type: ActivityType;
  lastItem?: Boolean;
  admin?: Boolean;
};
type ActivityProps = ActivityData & {
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

const Activity = ({ id, title, desc, img_url, createdAt, type, lastItem, admin, onDelete }: ActivityProps) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const router = useRouter();

  const processTime = (date: string) => {
    const instance = new Date(date);
    const month = months[instance.getMonth()];
    const yr = instance.getFullYear();
    return `${month} ${yr}`;
  };
  let plainDesc = desc ? desc.replace(/<[^>]+>/g, "") : "";

  return (
    <div className=" flex flex-row items-start">
      <Link href={`/events/${id}`} style={{ borderBottom: lastItem ? "" : "1px solid rgba(221, 221, 221,0.7)" }} className="mb-6 border-custom-light-grey cursor-pointer">
        <div className="flex flex-row justify-between mb-6 gap-x-4">
          <div className="w-full md:w-9/12 ">
            <h3 className="font-medium text-lg mb-1.5">{title}</h3>
            <h5 className="text-base font-light mb-2 overflow-hidden text-ellipsis line-clamp-2" style={{ color: "#555555" }}>
              {plainDesc}
            </h5>
            <div className="flex text-xs font-medium items-center   flex-row gap-x-4 mb-1 ">
              <p className=" text-custom-grey">{processTime(createdAt)}</p>
              <div style={{ width: "1px" }} className=" bg-custom-light-grey h-4"></div>
              <p className="text-custom-activity-award  font-medium">{type}</p>
              <div style={{ width: "1px" }} className=" bg-custom-light-grey h-4"></div>
              <p className="font-normal text-custom-activity-award ">{`Learn more > `}</p>
            </div>
          </div>
          {/* <img src={img_url} alt="img" className="w-48 h-40 object-cover rounded object-center " /> */}
          <img src={"/imgs/placeholder/activity.jpg"} alt="img" className="md:block hidden w-48 h-40 object-cover rounded object-center " />
        </div>
      </Link>
      {admin && (
        <div className="gap-y-4">
          <button onClick={() => onDelete(id)}>
            <GoTrash size={"1.5em"} />
          </button>
          <button onClick={() => router.push(`/admin/add-activity/${id}`)}>
            <MdEdit size={"1.5em"} />
          </button>
        </div>
      )}
    </div>
  );
};
export default Activity;