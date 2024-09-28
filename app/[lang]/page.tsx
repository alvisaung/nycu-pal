import Carousel from "components/Carousel";

import { fetchData } from "@/src/services/dataService";
import AnimationWrap from "../components/HOC/AnimationWrap";
import { getTranslations } from "next-intl/server";
import ActivityGp from "../components/Activities/ActivityGp";

const Home = async () => {
  const data = await fetchData("/about-lab");
  const t = await getTranslations("Layout");
  const bannerUrls = data.banner_urls.map((url: string) => ({ url: url }));
  return (
    <div className="bg-black min-h-screen text-custom-text-white">
      {/**/}
      <div className="mx-auto  max-w-[1200px] ">
        <Carousel images={bannerUrls} />
      </div>
      <div className=" w-full py-6 relative  ">
        <div className="relative z-10 text-white w-11/12 md:pt-6 pt-2 pb-8  md:w-5/6 flex flex-row m-auto justify-between ">
          <div className="md:w-7/12  w-full ">
            <AnimationWrap>
              <h3 className="text-2xl mb-3 font-bold ">👏🏻 關於實驗室</h3>
            </AnimationWrap>
            <AnimationWrap delay={0.5}>
              <h5 className="text-base font-light 	">
                <div className="tiptap 2xl:text-xl text-lg tracking-wide leading-7 indent-5 " dangerouslySetInnerHTML={{ __html: data.about }} />
              </h5>
            </AnimationWrap>
          </div>

          <AnimationWrap className="hidden md:flex w-5/12 flex-col items-center justify-center">
            <img src="/imgs/photonic-1.jpg" alt="Photonic" className="w-6/12 flip-animation " style={{ borderRadius: 5 }} />
            {/* <img src="/imgs/photonic-111.png" alt="Photonic" className="w-2/6 self-end -mt-28 mr-4 " /> */}
          </AnimationWrap>
        </div>

        <video loop autoPlay muted preload="auto" className="w-full h-full top-0 bottom-0 absolute object-cover opacity-30">
          <source src="/vdo/bg-loop.mp4" type="video/mp4" />
        </video>
      </div>
      <ActivityGp q={3} />
    </div>
  );
};

export default Home;
