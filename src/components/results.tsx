import { useEffect, useRef, useState } from "react";
import { instance } from "../lib/axios";

export default function Results() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [toggleResultsPanel, setToggleResultsPanel] = useState<boolean>(true);
  const [battlesDataExpress, setBattlesDataExpress] = useState([]);

  const handleResultsMenu = () => {
    setToggleResultsPanel(!toggleResultsPanel);
  };

  return (
    <div className="absolute overflow-hidden right-0 bottom-18">
      <div
        className={`bg-background flex  transition-all duration-300  relative  flex-col  justify-between  w-12/12 lg:w-4/12 ml-auto ${toggleResultsPanel ? "translate-x-full" : ""}  `}
        ref={resultsRef}
      >
        <div
          onClick={() => handleResultsMenu()}
          className="absolute  hover-group  -left-5 z-60 rotate-180 top-60 h-30 bg-secondary flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 hover-group:translate-x-1 transition-all duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>

        <div className=" flex flex-col gap-4 w-full h-130 p-10 top-0 ">
          <h2 className="text-6xl font-sans text-primary text-shadow-xl w-full text-shadow-2xl ">
            Results
          </h2>
          <div className="min-h-100 w-250">
            <div className="text-primary">
              {battlesDataExpress.message ?? "Loading"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
