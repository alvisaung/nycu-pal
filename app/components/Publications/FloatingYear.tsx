"use client";
import { fetchData } from "@/src/services/dataService";
import React, { useState, useEffect, useRef } from "react";

interface YearSection {
  title: string;
  Publications: number[];
}

const FloatingYear: React.FC = () => {
  const [sections, setSections] = useState<YearSection[]>([]);

  const getData = async () => {
    const sections_: YearSection[] = await fetchData("/publication-type");
    setSections(sections_);
    let openSec_ = sections_.map((sec) => sec.title);
    setOpenSections(openSec_);
  };
  useEffect(() => {
    getData();
  }, []);

  const [openSections, setOpenSections] = useState<string[]>([]);

  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currTitle, setCurrTitle] = useState<string | null>(null);
  const toggleSection = (title: string) => {
    setOpenSections((prevSections) => {
      if (prevSections.includes(title)) {
        return prevSections.filter((sec) => sec !== title);
      } else {
        return [...prevSections, title];
      }
    });
  };

  const scrollToYear = (sec: string, year: number) => {
    const element = document.getElementById(`${sec}-${year}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 400;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight / 2;
      let foundYear: number | null = null;
      let foundTitle: string | null = null;
      let sec = null;
      // Flatten all years from all sections
      sections.forEach((section) => {
        for (const year of section.Publications) {
          const element = document.getElementById(`${section.title}-${year}`);

          if (element) {
            const { top, bottom } = element.getBoundingClientRect();

            if (top <= scrollPosition && bottom >= scrollPosition) {
              foundYear = year;
              sec = section.title;
              foundTitle = section.title;
              break;
            }
          }
        }
      });
      // Find the year whose section is currently in view
      setCurrentYear(foundYear);
      setCurrTitle(foundTitle);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div style={{ background: "#F3F3F3" }} className="sticky top-10   font-medium  drop-shadow-lg rounded ">
      {sections.map((section) => (
        <div key={section.title}>
          <button onClick={() => toggleSection(section.title)} style={{ borderBottom: "1px solid #DDDDDD" }} className="w-full px-4 py-2 text-base flex justify-between items-center  hover:bg-gray-100">
            {section.title}
            <svg className={`w-4 h-4 transition-transform ${openSections.includes(section.title) ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="transition-all duration-1000 ease-in-out">
            {openSections.includes(section.title) &&
              section.Publications.map((year) => (
                <button key={year} style={{ borderBottom: "1px solid #DDDDDD" }} onClick={() => scrollToYear(section.title, year)} className={`w-full pl-8 py-2 pt-3 text-sm text-left hover:bg-gray-200 ${currentYear === year && currTitle == section.title ? "bg-[#6F808D] font-bold text-white" : ""}`}>
                  {year}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default FloatingYear;
