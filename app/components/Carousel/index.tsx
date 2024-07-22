"use client";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import styles from "style/banner.module.css";

interface BannerType {
  url: string;
  is_video?: boolean;
}

export default function Carousel(images: BannerType[]) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 6,
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <div>
      <div ref={sliderRef} className={`keen-slider ${styles.img}`}>
        {images.map((img, id) => {
          return (
            <div key={id}>
              <img src={img.url} alt={"Banner"} className={`keen-slider__slide ${styles.slide_img}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Arrow(props: any) {
  if (props.disabled) return <></>;
  return (
    <div onClick={props.onClick} className={`${styles.arrow_box}  ${props.left ? "arrow--left" : "arrow--right"} `}>
      <svg className={` arrow`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
        {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
      </svg>
    </div>
  );
}
