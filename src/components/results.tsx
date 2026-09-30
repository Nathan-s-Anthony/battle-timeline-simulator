import { useEffect, useRef } from "react";

export default function Results() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const handleOpening = (e: React.MouseEvent<HTMLButtonElement>) => {
    const expandResults = resultsRef.current?.querySelector(".results");
    const chevron = resultsRef.current?.querySelector(".chevron");

    if (!expandResults || !chevron) return;
    expandResults.classList.toggle("active");
    chevron.classList.toggle("rotate-180");
  };
  return (
    <div className="absolute right-0 top-50" ref={resultsRef}>
      <div className="bg-red-500 w-100 top-50">
        <h4 className=" text-lg mt-4  text-shadow-2xl text-primary">
          Results:
        </h4>
      </div>
      {/* <div className="results">
        <div className="relative flex  bg-secondary  w-full ">
          <div className="p-6">
            <div className="flex w-full mt-10 justify-between">
              <div>
                <h2 className="text-2xl text-foreground text-shadow-2xl">
                  Map Legend
                </h2>
                <p className="text-shadow-2xl">Details about each icon:</p>
              </div>
              <div>
                <h2 className="text-2xl text-foreground text-shadow-2xl">
                  Results
                </h2>
                <p className="text-shadow-2xl">Decisions and results from AI</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
