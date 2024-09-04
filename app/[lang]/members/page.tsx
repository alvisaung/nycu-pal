import AnimationWrap from "@/app/components/HOC/AnimationWrap";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import Member, { MemberType } from "@/app/components/Member/Member";
import { fetchData } from "@/src/services/dataService";
import Link from "next/link";
import React, { Component, FC } from "react";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";

interface MemberGpType {
  role: string;
  members_list: MemberType[];
}
interface ProfEduType {
  name: string;
  url: string;
}
interface MemberProfType {
  name: string;
  email?: string;
  phone?: string;
  role: string;
  education: ProfEduType[];
  experiences?: string;
  members_list: MemberType[];
}

const professor: MemberProfType = {
  name: "Peichen Yu",
  email: "alvisaung@gmail.com",
  phone: "09-72642408",
  education: [
    { name: "University of Michigan, Ann Arbor, USA", url: "https://facebook.com/" },
    { name: "National Chiao-Tung University, Taiwan", url: "https://facebook.com/" },
    { name: "National Chiao-Tung University, Taiwan", url: "https://facebook.com/" },
  ],
  experiences: "我是一位在光電領域擁有豐富經驗的專業人士。自2009年起，我在國立陽明交通大學擔任光電工程學系教授，專攻光學微影和半導體製程，尤其專精於光學近似校正技術。在此之前，我曾在美國英特爾公司擔任設計工程師，負責開發65nm和45nm技術節點的光學近似校正相關設計規則和算法。我的職業生涯橫跨學術界和業界，為光電工程領域做出了重要貢獻。",
};

export const role = {
  professor: { key: "professor", value: "" },
  phd: { key: "phd", value: "Postdoctoral Scholars" },
  master_1: { key: "master_1", value: "Master First Year Students" },
};

const index: FC = async () => {
  const memberGpData: MemberProfType[] = await fetchData("/member");
  const professor: MemberProfType = memberGpData.filter((memberGp) => memberGp.role == role.professor.key)[0].members_list[0];
  professor.education = [
    { name: "University of Michigan, Ann Arbor, USA", url: "https://facebook.com/" },
    { name: "National Chiao-Tung University, Taiwan", url: "https://facebook.com/" },
    { name: "National Chiao-Tung University, Taiwan", url: "https://facebook.com/" },
  ];

  return (
    <div className="flex-grow bg-read-bg pb-20 font-space-grotesk ">
      <HeaderBond title="Our Amazing Team" bg_img="/imgs/title-bond/blog-detail.png" />
      <div className="bg-white pt-8 ">
        <div className="mx-auto w-10/12 flex md:flex-row flex-col flex-col-reverse  justify-around pb-20">
          <div className="font-medium md:w-7/12 w-full md:mt-0 mt-8 ">
            <AnimationWrap>
              <h3 className="md:text-2xl text-xl  font-medium mb-4 font-helvetica text-header-purple">Founder Professor, {professor.name}</h3>
            </AnimationWrap>
            <AnimationWrap delay={0.4}>
              <div className="flex flex-row text-base items-center gap-x-2 mb-2">
                <FiMail />
                <h5 className="">{professor.email}</h5>
              </div>
              <div className="flex flex-row  text-base items-center gap-x-2 mb-2">
                <FiPhoneCall />
                <h5>{professor.phone}</h5>
              </div>
              <div className="flex flex-row  text-base items-center gap-x-2 mb-1">
                <HiOutlineAcademicCap size={20} />
                <h5 className=" ">Education</h5>
              </div>
              <div className="ml-7 mb-6">
                {professor.education.map((edu, id) => (
                  <a target="_blank" key={id} href={edu.url} className="underline text-sm text-[#0088CC] mb-2 block">
                    {edu.name}
                  </a>
                ))}
              </div>
            </AnimationWrap>
            <AnimationWrap delay={0.8}>
              <h5 className=" mb-1">Experiences</h5>
              <div className="font-normal leading-7 text-[#363636]">
                <div dangerouslySetInnerHTML={{ __html: professor.experiences }} />
              </div>
            </AnimationWrap>
          </div>
          <AnimationWrap delay={0.4} className="md:w-3/12 w-7/12 md:mt-0 m-auto">
            <img src="/imgs/professor.png" className=" h-fit rounded self-center" />
          </AnimationWrap>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        {memberGpData
          .filter((memberGp) => memberGp.role !== role.professor.key)
          .map((memberGp, id) => (
            <div key={id} className="w-full  mb-8 mt-12 flex flex-col justify-center">
              <AnimationWrap>
                <h4 className="text-center text-2xl font-bold text-header-purple mb-4 ">{role[memberGp.role].value}</h4>
              </AnimationWrap>

              <div className=" flex md:flex-row flex-col flex-wrap justify-start  gap-8 mx-auto" style={{ columnGap: 30 }}>
                {memberGp.members_list.map((member, idm) => (
                  <AnimationWrap threshold={0.6} key={idm} delay={0.4 * (idm / 2)} initial={{ opacity: 0 }}>
                    <Member {...member} />
                  </AnimationWrap>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default index;