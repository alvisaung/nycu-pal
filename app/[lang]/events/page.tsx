import Activity, { ActivityData } from "@/app/components/Activities";
import ActivityGp from "@/app/components/Activities/ActivityGp";
import ActivityFilter from "@/app/components/Activities/Filter";
import AnimationWrap from "@/app/components/HOC/AnimationWrap";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import React, { FC } from "react";

const index: FC = async () => {
  return (
    <div>
      <HeaderBond title="Activities" bg_img="/imgs/title-bond/activity.png" />
      <ActivityGp q={null} />
      {/* <div className=" w-10/12 md:w-9/12 flex m-auto py-8 flex flex-row justify-between items-start">
        <div className="md:w-9/12">
          {activitiesData.map((activity, idx) => (
            <AnimationWrap delay={0.4 * (idx / 2)} key={idx}>
              <Activity {...activity} lastItem={idx == activitiesData.length - 1} />
            </AnimationWrap>
          ))}
        </div>
        <div className="md:w-44">
          <ActivityFilter />
        </div>
      </div> */}
    </div>
  );
};

export default index;
