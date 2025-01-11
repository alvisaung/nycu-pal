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
    ? "relative w-full h-[300px] md:h-[500px] lg:h-[600px]"
    : "relative w-full aspect-[4/3]";

  return (
    <div className={styles.img_carousal_gp}>
      {/* The Keen Slider wrapper: remove 'relative' here if you like */}
      <div ref={sliderRef} className="keen-slider">
        {images.map((img, idx) => (
          <div key={idx} className={`keen-slider__slide ${slideClass}`}>
            <Image
              src={img.url}
              alt="Banner"
              layout="fill"         // or "fill" + style={{objectFit:'contain'}} in Next.js 13
              objectFit="contain"
              objectPosition="top"
              quality={90}
              priority={idx === 0}
            />
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
