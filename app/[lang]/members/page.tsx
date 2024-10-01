import AnimationWrap from "@/app/components/HOC/AnimationWrap";
import HeaderBond from "@/app/components/HOC/HeaderBond";
import Member, { MemberType } from "@/app/components/Member/Member";
import { fetchData } from "@/src/services/dataService";
import Link from "next/link";
import React, { Component, FC } from "react";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { getTranslations } from "next-intl/server";

interface ProfEduType {
  name: string;
  url: string;
}

interface MemberProfType {
  name: string;
  email?: string;
  phone?: string;
  MemberTypeId: number;
  education?: ProfEduType[];
  experiences?: string;
  role: string;
  members_list: MemberType[];
}

const Page: FC = async () => {
  const memberGpData: MemberProfType[] = await fetchData("/member");
  const prof = memberGpData.filter((memberGp) => !Boolean(memberGp.MemberTypeId));
  const professor: MemberType | null = prof.length > 0 ? prof[0].members_list[0] : null;
  const t = await getTranslations("Member");

  const education = [
    { name: "1999~2004: University of Michigan, Electrical Engineering", url: "https://facebook.com/" },
    { name: "1996~1998: National Chiao-Tung University, Electro-optical Engineering", url: "https://facebook.com/" },
    { name: "1992~1996: National Chiao-Tung University, Electrophysics", url: "https://facebook.com/" },
  ];

  return (
    <div className="flex-grow bg-read-bg pb-20  ">
      <HeaderBond title="PAL Team" bg_img="/imgs/title-bond/blog-detail.png" />
      <div className="bg-white pt-8 ">
        <div className="mx-auto w-10/12 flex md:flex-row flex-col flex-col-reverse  justify-around pb-20">
          <div className="font-medium md:w-7/12 w-full md:mt-0 mt-8 ">
            <AnimationWrap delay={0.3}>
              <h3 className="md:text-2xl text-xl  font-medium mb-4 font-helvetica-neue text-header-purple">Founder Professor, {professor?.name}</h3>
            </AnimationWrap>
            <AnimationWrap delay={0.6}>
              <div className="flex flex-row text-base items-center gap-x-2 mb-2">
                <FiMail />
                <h5 className="font-medium">{professor?.email}</h5>
              </div>
              <div className="flex flex-row  text-base items-center gap-x-2 mb-2">
                <FiPhoneCall />
                <h5 className="font-medium">{professor?.phone}</h5>
              </div>
              <div className="flex flex-row  text-base items-center gap-x-2 mb-1">
                <HiOutlineAcademicCap size={20} />
                <h5 className="font-medium">Education</h5>
              </div>
              <div className="ml-7 mb-6">
                {education.map((edu, id) => (
                  <a key={id} className=" text-sm  mb-2 block">
                    {edu.name}
                  </a>
                ))}
              </div>
            </AnimationWrap>
            <AnimationWrap delay={1}>
              <h5 className="text-lg mb-1">Experiences</h5>
              <div className="font-normal leading-7 text-[#363636] " style={{ fontSize: "1.1rem" }}>
                {professor?.experiences && <div className="tiptap" dangerouslySetInnerHTML={{ __html: professor.experiences }} />}
              </div>
            </AnimationWrap>
          </div>
          <AnimationWrap delay={1.2} className="md:w-3/12 w-7/12 md:mt-0 m-auto">
            <img src={professor?.img_url} className=" rounded self-center" />
          </AnimationWrap>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        {memberGpData
          .filter((memberGp) => memberGp.MemberTypeId)
          .map((memberGp, id) => (
            <div key={id} className="w-full  mb-8 mt-12 flex flex-col justify-center">
              <AnimationWrap delay={0.2}>
                <h4 className="text-center text-2xl font-bold text-header-purple mb-4 ">{memberGp.role}</h4>
              </AnimationWrap>

              {/* <div className=" flex md:flex-row flex-col flex-wrap justify-center  gap-8 mx-auto" style={{ columnGap: 30 }}> */}
              <div className="flex flex-wrap justify-center gap-8 mx-auto" style={{ maxWidth: "1200px", columnGap: 30 }}>
                {memberGp.members_list.map((member, idm) => (
                  <AnimationWrap threshold={0.6} key={idm} delay={0.8 * (idm / 2)} initial={{ opacity: 0 }} style={{ height: "auto" }}>
                    <Member {...member} isAlumni={memberGp.MemberTypeId > 2} />
                  </AnimationWrap>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Page;
