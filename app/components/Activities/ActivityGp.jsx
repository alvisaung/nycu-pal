"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ActivityFilter from "./Filter.jsx";
import AnimationWrap from "../HOC/AnimationWrap";
import Activity, { ActivityData, ActivityType } from ".";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useTranslations } from "next-intl";

const ActivityGp = ({ q }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const query = q ? `q=${q}` : "";
  const topic_id = selectedTopic ? `topic_id=${selectedTopic}` : "";

  const { data: activitiesData, getData } = useFetchData(`/events?${query}&${topic_id}`);
  const t = useTranslations("Layout");
  useEffect(() => {
    getData();
  }, [selectedTopic]);
  return (
    <div className="bg-white font-medium rounded-t-md  text-black">
      <div className="w-11/12 md:w-10/12 flex m-auto py-8 flex flex-row justify-between items-start">
        <div className="md:w-9/12">
          <div className="flex flow-row w-full justify-between items-center mb-6">
            <div className="text-2xl font-bold  text-header-purple">💡{t("Events")}</div>
            <div className="text-base  cursor-pointer  text-header-purple underline">
              <Link href="/events">All</Link>
            </div>
          </div>
          {activitiesData &&
            activitiesData.map((activity, idx) => (
              <AnimationWrap delay={0.4 * (idx / 2)} key={idx}>
                <Activity {...activity} lastItem={idx == activitiesData.length - 1} />
              </AnimationWrap>
            ))}
        </div>
        <div className="md:w-2/12">
          <ActivityFilter selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
        </div>
      </div>
    </div>
  );
};

export default ActivityGp;
