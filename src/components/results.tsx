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
    <div className="" ref={resultsRef}>
      <div className=" w-9/12 results fixed rotate-0 duration-300 transition-all bottom-0 left-0 right-0 ml-auto ">
        <div className="relative h-full bg-secondary">
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
            <div
              onClick={(e) => handleOpening(e)}
              className=" chevron cursor-pointer rounded-tr-md rounded-tl-md absolute right-0 top-2 animate-bounce left-0 text-center flex justify-center z-60"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 18.75 7.5-7.5 7.5 7.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
