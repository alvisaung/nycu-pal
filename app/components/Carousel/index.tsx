"use client";
import React, { FC, useState } from "react";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import styles from "style/banner.module.css";

interface BannerType {
  url: string;
  is_video?: boolean;
}

const Carousel: FC<{ images: BannerType[]; removeDot?: any }> = ({ images, removeDot }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      defaultAnimation: {
        duration: 1200,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className={styles.img_carousal_gp}>
      <div ref={sliderRef} className={`keen-slider `}>
        {images.map((img, id) => {
          return (
            <div key={id}>
              <img src={img.url} alt={"Banner"} className={`keen-slider__slide object-contain ${styles.slide_img} max-h-[450px] 2xl:max-h-[600px] md:max-h-[450px] sm:max-h-[600px]`} />
            </div>
          );
        })}
      </div>
      {loaded && instanceRef.current && (
        <div className="md:block hidden">
          <Arrow left onClick={() => instanceRef.current?.prev()} disabled={currentSlide === 0} />
          <Arrow onClick={() => instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} />
        </div>
      )}

      {!Boolean(removeDot) && loaded && instanceRef.current && (
        <div className={`${styles.dots} `}>
          {[...Array(instanceRef.current.track.details.slides.length)].map((m, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`${styles.dot} ${currentSlide === idx ? styles.active : ""} `}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};
function Arrow(props: any) {
  if (props.disabled) return <></>;
  return (
    <div onClick={props.onClick} className={`${styles.arrow_box}   ${props.left ? "arrow--left" : styles.arrow_right} `}>
      {props.left && <img src="/imgs/chevron.png" alt="Arrow Left" className="w-5 -scale-100" />}
      {!props.left && <img src="/imgs/chevron.png" alt="Arrow Right" className="w-5" />}
    </div>
  );
}
export default Carousel;
