import TopicList from "@/app/components/Activities/TopicListAdmin";
import AnimationWrap from "@/app/components/HOC/AnimationWrap";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import Publication, { PublicationProps } from "@/app/components/Publications";
import FloatingYear from "@/app/components/Publications/FloatingYear";
import { fetchData } from "@/src/services/dataService";
import React, { Component, FC } from "react";

interface PublicationGp {
  type: string;
  publication_list: PubYrGp[];
}
interface PubYrGp {
  year: string;
  publications: PublicationProps[];
}

const index: FC = async () => {
  const publications: PublicationGp[] = await fetchData("/publication");

  return (
    <div className="bg-read-bg flex-grow">
      <HeaderBond title="Publications" bg_img="/imgs/title-bond/research.png" />
      {/* <div style={{ height: "1000px", width: "100px" }}></div> */}
      <div className="m-auto w-11/12 md:w-10/12 mb-24 mt-8 flex flex-row justify-between gap-x-16 relative">
        <div className="w-3/12 hidden md:block  ">
          <FloatingYear />
        </div>
        <div className="md:w-9/12 w-full">
          {publications.map((pub, id) => (
            <div key={id}>
              <h3 className="font-medium text-2xl text-header-purple mb-6 pb-4 " style={{ borderBottom: "1px solid #e1e1e1" }}>
                {pub.type}
              </h3>
              {pub.publication_list.map((pub_yr, idj) => (
                <div id={`${pub.type}-${pub_yr.year}`} className="mb-4" key={idj}>
                  <h5 className="font-medium text-xl text-header-purple mb-2">{pub_yr.year}</h5>
                  {pub_yr.publications.map((paper, idx) => (
                    <Publication {...paper} key={idx} index={idx} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default index;
