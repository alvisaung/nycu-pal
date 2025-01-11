"use client";
import React, { FC, useState } from "react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import styles from "style/banner.module.css";

interface BannerType {
  url: string;
  is_video?: boolean;
}

interface CarouselProps {
  images: BannerType[];
  removeDot?: boolean;
  is_banner?: boolean;
}

const Carousel: FC<CarouselProps> = ({ images, removeDot, is_banner }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Initialize Keen Slider
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      defaultAnimation: { duration: 1200 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      // Autoplay plugin
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);

        const nextTimeout = () => {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), 2000);
        };

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

  // If it's a banner, use fixed heights; if not, use aspect ratio
  const slideClass = is_banner
    ? "relative w-[100%] h-[300px] md:w-[80%] md:h-[400px] lg:w-[70%] lg:h-[550px] 2xl:w-[55%] 2xl:h-[680px]"
    : "relative w-full aspect-[4/3]";

  return (
    <div className={styles.img_carousal_gp}>
      {/* The Keen Slider wrapper: remove 'relative' here if you like */}
      <div ref={sliderRef} className="keen-slider">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`keen-slider__slide flex justify-center`} 
            // ^ flex + justify-center to horizontally center the container
          >
            
            <div 
              className= {slideClass}
            >
              <Image
                src={img.url}
                alt="Banner"
                layout="fill"      // or "fill" in Next 13
                // objectFit="cover"  // or className="object-cover"
                priority={idx === 0}
                className={`  ${is_banner ?" object-cover": "object-contain"} object-center `}
              />
            </div>
          </div>
        ))}
        {/* Dots */}
        {!removeDot && loaded && instanceRef.current && (
          <div
            className={`${styles.dots} absolute bottom-0 md:bottom-0 left-0 right-0`}
          >
            {[...Array(instanceRef.current.track.details.slides.length)].map(
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`${styles.dot} ${
                    currentSlide === idx ? styles.active : ""
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
