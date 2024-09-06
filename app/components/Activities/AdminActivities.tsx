"use client";
import React, { useEffect, useState } from "react";
import TopicList, { TopicType } from "./TopicListAdmin";
import Activity, { ActivityData } from ".";
import { useRouter } from "next/navigation";
import { fetchData } from "@/src/services/dataService";
import { useFetchData } from "@/src/hooks/useFetchData";

const AdminActivities = () => {
  const router = useRouter();
  const { data: activitiesData, delData }: { data: ActivityData[]; delData: (params: { id: string }) => void } = useFetchData("/events");
  const onDelete = (id: string) => {
    delData({ id: id });
  };

  return (
    <div className="flex flex-row w-full gap-x-8">
      <div className="bg-blue w-9/12">
        <button onClick={() => router.push("/admin/add-activity")} className="rounded bg-[#0077B5] text-white px-5 py-2 pt-3 font-medium mb-4 hover:bg-[#006399] ">
          + Add Activities
        </button>
        {activitiesData.map((activity, idx) => (
          <div key={idx}>
            <Activity {...activity} lastItem={idx == activitiesData.length - 1} admin onDelete={onDelete} />
          </div>
        ))}
      </div>
      <div className="w-2/12 ml-auto">
        <TopicList topic_type={TopicType.EVENT} />
      </div>
    </div>
  );
};

export default AdminActivities;
