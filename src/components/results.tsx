import { useEffect, useRef, useState } from "react";
import { WarTypes } from "../types/war/warTypes";

export default function Results({ data }: { data: WarTypes[] }) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [toggleResultsPanel, setToggleResultsPanel] = useState<boolean>(true);

  const handleResultsMenu = () => {
    setToggleResultsPanel(!toggleResultsPanel);
  };

  return (
    <div
      className={`bg-background  flex absolute transition-all duration-300 right-0 top-10  w-3/12 lg:w-3/12  flex-col z-60 justify-between   ${toggleResultsPanel ? "translate-x-0" : "translate-x-full"}  p-10`}
      ref={resultsRef}
    >
      <div
        onClick={() => handleResultsMenu()}
        className="absolute  hover-group -left-5 top-60 h-30 bg-secondary flex justify-center items-center"
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
      <div className=" flex flex-col gap-4 w-full h-130 top-0 ">
        <h2 className="text-5xl font-sans text-primary text-shadow-xl  text-shadow-2xl ">
          Tactical Viewer
        </h2>
        <div className="">
          <div className="text-primary">
            {data?.map((war) => {
              return (
                <div key={war.id}>
                  <div>
                    <h4 className="text-2xl ">{war.name}</h4>
                    <p>{war.description}</p>
                  </div>
                  <div className="">
                    <h4>Campaigns</h4>
                    {war.campaigns.map((campaign) => {
                      return (
                        <div key={campaign.id}>
                          <h5>{campaign.name}</h5>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
