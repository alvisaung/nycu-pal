import AnimationWrap from "@/app/components/HOC/AnimationWrap";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import ResearchTopicAccordion from "@/app/components/Research/ResearchTopicAccordion";
import { fetchData } from "@/src/services/dataService";
import React, { FC } from "react";
import parse from "html-react-parser";
import Link from "next/link";

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
  const researchTopic: researchTopicType[] = await fetchData("research-topic", "get");
  const researchStatement = await fetchData("research", "get");
  const truncateHTML = (html: string, maxLength: number) => {
    const plainText = html.replace(/<[^>]+>/g, ""); // Strip HTML tags
    if (plainText.length <= maxLength) {
      return html;
    }
    return `${plainText.substring(0, maxLength)}...`;
  };

  return (
    <div className="flex-grow bg-read-bg text-black">
      <HeaderBond title="Research Themes" bg_img="/imgs/title-bond/research.png" />
      <div className="m-auto w-11/12 md:w-10/12 mb-24 mt-8 ">
        <AnimationWrap>
          <h3 className="font-bold text-2xl text-header-purple mb-2">Research Statement</h3>
        </AnimationWrap>
        <AnimationWrap delay={0.2}>
          <div className="flex flex-row md:flex-wrap gap-x-8">{researchStatement[0].media_url && researchStatement[0].media_url.map((url: string, id: number) => <img src={url} alt="Statement Img" className={`rounded  rounded md:w-5/12 h-fit mb-4  `} />)}</div>
        </AnimationWrap>
        <AnimationWrap delay={0.4}>
          <div className="text-base  leading-7 tracking-wide mb-5  tiptap" dangerouslySetInnerHTML={{ __html: researchStatement[0].statement }} />
        </AnimationWrap>
        {researchTopic.map((topic, id) => (
          <AnimationWrap threshold={0.4} key={id} delay={id * 0.2}>
            <ResearchTopicAccordion trigger={`${id + 1}. ${topic.title}`}>
              <div className="flex flex-row md:flex-wrap gap-x-8">{topic.media_url && topic.media_url.map((url: string, id) => <img src={url} alt="Topic Img" className={`rounded w-full md:w-3/12 mb-4 ${id > 0 && " hidden md:flex"}`} />)}</div>
              <div className="text-base text-black leading-7 tiptap">
                <span className=" text-base  text-black leading-7 tiptap" dangerouslySetInnerHTML={{ __html: truncateHTML(topic.description, 300) }} />
                {topic.description.length > 300 && <Link href={`/research/${topic.id}`}>Read More</Link>}
              </div>
            </ResearchTopicAccordion>
          </AnimationWrap>
        ))}
      </div>
    </div>
  );
};
export default index;

/* {topic.ResearchBranches &&
                topic.ResearchBranches.map((branch) => (
                  <>
                    <h3 className="text-lg font-medium mb-1 mt-3">{branch.title}</h3>
                    <div className="flex flex-col md:flex-wrap gap-x-8">{branch.media_url && branch.media_url.map((url, id) => <img src={url} alt="Statement Img" className={`rounded w-full md:w-3/12 mb-4  ${id > 0 && "hidden"}`} />)}</div>

                    <div className="text-black font-medium  leading-7" dangerouslySetInnerHTML={{ __html: branch.description }} />
                  </>
                ))} */
