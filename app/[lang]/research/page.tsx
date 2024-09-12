import AnimationWrap from "@/app/components/HOC/AnimationWrap";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import ResearchTopicAccordion from "@/app/components/Research/ResearchTopicAccordion";
import { fetchData } from "@/src/services/dataService";
import React, { FC } from "react";

export interface researchBranch {
  id?: number;
  tempId?: number;
  title: string;
  description: string;
  media_url?: string[];
  is_img: boolean | null;
}
export interface researchTopicType {
  id?: number;
  title: string;
  ResearchBranches?: researchBranch[] | [];
  media_url: string[];
  description: string;
  is_img: boolean;
  tempId?: number;
}

const index: FC = async () => {
  // const researchTopic: researchTopicType[] = [
  //   {
  //     id: Date.now(),
  //     title: "超穎透鏡 (Metalens) ",
  //     desc: "隨著手機、電腦和其他電子產品變得越來越小，內置的光學元件卻很難縮小，因為用傳統的玻璃切割彎曲技術很難製造出多功能、高效率的微型鏡片，而且玻璃鏡片通常需要堆疊才能正確聚焦光線。超穎透鏡是未來相機鏡頭的關鍵技術，由上千萬至上億個次波長奈米柱狀結構所組成的超穎透鏡，這些奈米柱可以任意控制光波的振幅、相位、吸收反射等物理性質，這是傳統折射透鏡無法實現的。",
  //     url: "www.google.com",
  //     branch: [
  //       {
  //         id: Date.now(),
  //         branch_title: "Intelligent Proximity Correction, IPC",
  //         branch_media_url: "/vdo/placeholder/intelligent.mp4",
  //         is_img: false,
  //         branch_desc: "​本技術團隊提出結合深度學習微影模型及分布式光罩修正流程，整合出智能光學微影技術，又稱作智能鄰近修正(Intelligent Proximity Correction, IPC)，並藉由IPC技術成功在8吋玻璃基板製造出332顆大面積，直徑8毫米，每顆包含超過7000萬組奈米結構每顆包含超過7000萬組奈米,並藉由IPC技術成功在8吋玻璃基板製造出332顆大面積，直徑8毫米，每顆包含7000萬組... ",
  //       },
  //     ],
  //   },
  //   {
  //     id: Date.now(),
  //     title: "反向微影技術 (Inverse Lithography Technology， ILT)",
  //     desc: "隨著手機、電腦和其他電子產品變得越來越小，內置的光學元件卻很難縮小，因為用傳統的玻璃切割彎曲技術很難製造出多功能、高效率的微型鏡片，而且玻璃鏡片通常需要堆疊才能正確聚焦光線。超穎透鏡是未來相機鏡頭的關鍵技術，由上千萬至上億個次波長奈米柱狀結構所組成的超穎透鏡，這些奈米柱可以任意控制光波的振幅、相位、吸收反射等物理性質，這是傳統折射透鏡無法實現的。",
  //     url: "www.google.com",
  //   },
  //   {
  //     id: Date.now(),
  //     title: "量子退火 (Quantum Annealing)  ",
  //     desc: "隨著手機、電腦和其他電子產品變得越來越小，內置的光學元件卻很難縮小，因為用傳統的玻璃切割彎曲技術很難製造出多功能、高效率的微型鏡片，而且玻璃鏡片通常需要堆疊才能正確聚焦光線。超穎透鏡是未來相機鏡頭的關鍵技術，由上千萬至上億個次波長奈米柱狀結構所組成的超穎透鏡，這些奈米柱可以任意控制光波的振幅、相位、吸收反射等物理性質，這是傳統折射透鏡無法實現的。",
  //     url: "www.google.com",
  //   },
  // ];
  const researchTopic: researchTopicType[] = await fetchData("research-topic", "get");
  const researchStatement = await fetchData("research", "get");
  // const researchStatement = {
  //   desc: "在自然界中，物理系統往往會向最低能量狀態演化，例如：物體從山上滑下來，熱的東西冷卻下來等等...。這種行為也適用於量子系統。想像一下，有一個旅行者透過尋找代表問題的能源景觀中的最低谷來尋找最佳解決方案。在自然界中，物理系統往往會向最低能量狀態演化，例如：物體從山上滑下來，熱的東西冷卻下來等等...。這種行為也適用於量子系統。 在自然界中，物理系統往往會向最低能量狀態演化，例如：物體從山上滑下來，熱的東西冷卻下來等等...。這種行為也適用於量子系統。<br /> <li>Metalens</li> <li>ILT</li> <li>Quantum Annealing</li>",
  //   vdo_url: "/vdo/bg-loop-lab.mp4",
  // };
  return (
    <div className="flex-grow bg-read-bg text-black">
      <HeaderBond title="Research Themes" bg_img="/imgs/title-bond/research.png" />
      <div className="m-auto w-11/12 md:w-10/12 mb-24 mt-8 ">
        <AnimationWrap>
          <h3 className="font-bold text-2xl text-header-purple mb-2">Research Statement</h3>
        </AnimationWrap>

        <AnimationWrap delay={0.2}>
          <video loop autoPlay muted preload="auto" className="rounded w-5/12 mb-4">
            <source src={"/vdo/bg-loop-lab.mp4"} type="video/mp4" />
          </video>
        </AnimationWrap>
        <AnimationWrap delay={0.4}>
          <div className="text-base font-light leading-7 mb-5 text-black" dangerouslySetInnerHTML={{ __html: researchStatement[0].statement }} />
        </AnimationWrap>
        {researchTopic.map((topic, id) => (
          <AnimationWrap threshold={0.4} key={id} delay={id * 0.2}>
            <ResearchTopicAccordion trigger={`${id + 1}. ${topic.title}`}>
              {/* <h3 className="text-xl font-medium mb-1">{research.title}</h3> */}

              <div className="flex flex-row md:flex-wrap gap-x-8">{topic.media_url && topic.media_url.map((url: string, id) => <img src={url} alt="Topic Img" className={`rounded w-full md:w-3/12 mb-4 ${id > 0 && " hidden md:flex"}`} />)}</div>

              <div className="font-light text-base  text-black leading-7" dangerouslySetInnerHTML={{ __html: topic.description }} />
              {topic.ResearchBranches &&
                topic.ResearchBranches.map((branch) => (
                  <>
                    <h3 className="text-lg font-medium mb-1 mt-3">{branch.title}</h3>
                    <div className="flex flex-col md:flex-wrap gap-x-8">{branch.media_url && branch.media_url.map((url, id) => <img src={url} alt="Statement Img" className={`rounded w-full md:w-3/12 mb-4  ${id > 0 && "hidden"}`} />)}</div>

                    {/* {branch.is_img ? (
                    <>
                    </>
                  ) : (
                    <div style={{ height: 180 }} className="w-5/12  mb-4   relative">
                      <video loop autoPlay muted preload="auto" className="rounded  object-cover  w-full h-full top-0 bottom-0 absolute object-cover ">
                        <source src={"/vdo/placeholder/intelligent.mp4"} type="video/mp4" />
                      </video>
                    </div>
                  )} */}
                    {/* <div className="w-5/12  mb-4   relative" style={{ width: 180, height: 180 }}>
                      <video loop autoPlay muted preload="auto" className="rounded  object-cover  w-full h-full top-0 bottom-0 absolute object-cover ">
                        <source src={"/vdo/placeholder/intelligent.mp4"} type="video/mp4" />
                      </video>
                    </div> */}
                    <div className="text-black font-light leading-7" dangerouslySetInnerHTML={{ __html: branch.description }} />
                  </>
                ))}
            </ResearchTopicAccordion>
          </AnimationWrap>
        ))}
      </div>
    </div>
  );
};
export default index;
