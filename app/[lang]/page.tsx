import Carousel from "components/Carousel";
import Activity, { ActivityData, ActivityType } from "../components/Activities";
import ActivityFilter from "../components/Activities/Filter";
import Link from "next/link";
import { fetchData } from "@/src/services/dataService";
import AnimationWrap from "../components/HOC/AnimationWrap";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const data = await fetchData("/about-lab");
  const activitiesData: ActivityData[] = await fetchData("/events?q=3");
  const t = await getTranslations("Layout");
  console.log(data);
  const bannerUrls = data.banner_urls.map((url: string) => ({ url: url }));
  return (
    <div className="bg-gradient-custom min-h-screen text-custom-text-white">
      <Carousel images={bannerUrls} />
      <div className=" w-full py-8 relative  ">
        <div className="relative z-10 text-white w-11/12 md:pt-6 pt-2 pb-8  md:w-5/6 flex flex-row m-auto justify-between ">
          <div className="md:w-7/12  w-full ">
            <AnimationWrap>
              <h3 className="text-2xl mb-3 font-bold ">👏🏻 關於實驗室</h3>
            </AnimationWrap>
            <AnimationWrap delay={0.5}>
              <h5 className="text-base font-light leading-6 indent-3	">
                <div className="tiptap" dangerouslySetInnerHTML={{ __html: data.about }} />
              </h5>
            </AnimationWrap>
          </div>

          <AnimationWrap className="hidden md:flex w-5/12 flex-col mt-11 items-center">
            <img src="/imgs/photonic-1.png" alt="Photonic" className="w-8/12" />
            <img src="/imgs/photonic-2-circle.png" alt="Photonic" className="w-2/6 self-end -mt-14 mr-4 " />
          </AnimationWrap>
        </div>

        {/* <video loop autoPlay muted preload="auto" className="w-full h-full top-0 bottom-0 absolute object-cover opacity-30">
          <source src="/vdo/bg-loop.mp4" type="video/mp4" />
        </video> */}
      </div>
      <div className="bg-white font-medium rounded-t-md  text-black">
        <div className="w-11/12 md:w-10/12 flex m-auto py-8 flex flex-row justify-between items-start">
          <div className="md:w-9/12">
            <div className="flex flow-row w-full justify-between items-center mb-6">
              <div className="text-2xl font-bold  text-header-purple">💡{t("Events")}</div>
              <div className="text-base  cursor-pointer  text-header-purple underline">
                <Link href="/events">All</Link>
              </div>
            </div>
            {activitiesData.map((activity, idx) => (
              <AnimationWrap delay={0.4 * (idx / 2)} key={idx}>
                <Activity {...activity} lastItem={idx == activitiesData.length - 1} />
              </AnimationWrap>
            ))}
          </div>
          <div className="md:w-2/12">
            <ActivityFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
