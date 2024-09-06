import { fetchData } from "@/src/services/dataService";
import React, { Component, FC } from "react";
import { ActivityData, ActivityType } from ".";

const ActivityFilter: FC = async () => {
  const data = await fetchData("/events-type");
  return (
    <div className="hidden md:block  font-medium">
      <div className="flex flex-row items-center justify-between mb-4 cursor-pointer" style={{ borderBottom: "1px solid rgba(163,163,163,0.8)" }}>
        <h5 className="text-base text-header-purple">Topic</h5>
        <img src="/imgs/down-arrow.png" style={{ width: "12px", height: "12px" }} />
      </div>
      <li className="list-none my-2 flex flex-row items-center cursor-pointer">
        <input type="checkbox" style={{ width: "14px", height: "14px" }} />
        <p className="ml-2 text-sm  text-header-purple">All</p>
      </li>
      {data.map((type: ActivityData, id: string) => (
        <li key={id} className="list-none my-2 flex flex-row items-center cursor-pointer">
          <input type="checkbox" style={{ width: "14px", height: "14px" }} />
          <p className="ml-2 text-sm  text-header-purple">{type.title}</p>
        </li>
      ))}

      {/* <li className="list-none my-2 flex flex-row items-center cursor-pointer">
        <input type="checkbox" style={{ width: "14px", height: "14px" }} />
        <p className="ml-2 text-sm   text-header-purple">Conferences</p>
      </li> */}
    </div>
  );
};
export default ActivityFilter;
