"use client";
import Picard from "../../components/Picard";
import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { picardData } from "../../data/suggest";

const Suggest = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      id="destinations"
      data-testid="destinations"
      className="flex flex-col py-8"
    >
      <div className="min-h-[7.5rem]"></div>
      <div className="relative">
        <div
          className="scrollbar-hide grid snap-x snap-mandatory scroll-pl-2 auto-cols-[100%] grid-flow-col overflow-x-auto overscroll-y-contain px-8 md:auto-cols-[50%] lg:auto-cols-[30%]"
          ref={scrollContainer}
        >
          {picardData.map((card) => (
            <Picard
              key={card.id}
              src={card.src}
              title={card.title}
              desc={card.desc}
            />
          ))}
        </div>
        <button
          className="btn-color absolute left-6 top-1/2 -translate-y-1/2 rounded-full p-3 backdrop-blur"
          onClick={scrollLeft}
        >
          <ChevronLeftIcon scale={20} />
        </button>
        <button
          className="btn-color absolute right-6 top-1/2 -translate-y-1/2 rounded-full p-3 backdrop-blur"
          onClick={scrollRight}
        >
          <ChevronRightIcon scale={20} />
        </button>
      </div>
    </section>
  );
};

export default Suggest;
