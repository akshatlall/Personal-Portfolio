"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { LINKS } from "../portfolio-data";

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans px-6 sm:px-10" ref={containerRef}>
      <div className="mx-auto max-w-7xl flex items-center justify-start">
        <div className="w-full sm:w-2/3 px-2 sm:px-10 flex flex-col items-start justify-center mt-16 md:mt-24">
          <h2 className="mb-2 font-serif-accent text-2xl sm:text-3xl font-bold italic text-[#d1c8ff]">
            Experience
          </h2>
          <p className="text-sm sm:text-lg leading-relaxed text-[#eae5df]/90">
            With hands-on experience across{" "}
            <span className="font-serif-accent italic font-bold text-white">
              robotics leadership
            </span>
            ,{" "}
            <span className="font-serif-accent italic font-bold text-white">
              PCB design
            </span>
            , and{" "}
            <span className="font-serif-accent italic font-bold text-white">
              full-stack software
            </span>
            , I enjoy taking complex hardware and software systems from first
            principles to reliable execution.
          </p>

          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-[38px] sm:h-[42px] items-center justify-center rounded-full bg-[#9284d9] px-6 text-sm sm:text-base font-bold text-[#151226] transition-colors hover:bg-[#d1c8ff]"
          >
            View my Resume
          </a>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto mt-4 max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-12 md:pt-24 md:gap-10"
          >
            <div className="sticky top-36 z-40 flex max-w-xs lg:max-w-sm md:w-full flex-col md:flex-row items-center self-start">
              <div className="absolute left-3 md:left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#04020e]">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-[#4c4282]" />
              </div>
              <div className="flex flex-col">
                <h3 className="hidden md:block md:pl-20 font-serif-accent italic font-bold md:text-4xl text-[#d1c8ff]">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="hidden md:block md:pl-20 font-serif-accent italic font-bold md:text-lg text-[#7d71bf]">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="relative w-full pl-16 pr-2 md:pl-4">
              <div className="flex flex-col md:hidden mb-3">
                <h3 className="font-serif-accent italic font-bold text-2xl text-[#d1c8ff]">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="font-serif-accent italic text-sm text-[#7d71bf]">
                    {item.subtitle}
                  </p>
                )}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[#7635cc] via-[#2364cc] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
