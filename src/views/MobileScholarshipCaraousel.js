"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScholarshipCard from "./ScholarshipCard";

const ScholarshipCarousel = ({ items, openModal }) => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold mb-4 text-white px-4">Featured Scholarships</h2>
      <div className="flex items-center">
        <button onClick={() => scroll(-300)} className="p-2">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-2 scroll-smooth"
        >
          {items.map((item, idx) => (
            <div key={idx} className="min-w-[280px] max-w-xs">
              <ScholarshipCard item={item} openModal={openModal} />
            </div>
          ))}
        </div>

        <button onClick={() => scroll(300)} className="p-2">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ScholarshipCarousel;
