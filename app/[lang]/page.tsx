import { useTranslations } from "next-intl";
import Image from "next/image";
import Carousel from "../components/Carousel/index.tsx";

export default function Home() {
  const t = useTranslations("HomePage");
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="bg-gradient-custom min-h-screen text-custom-text-white">
      <Carousel images={[]} />
    </div>
  );
}
