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
    <div
      className=" bg-background flex overflow-hidden absolute right-0 bottom-0 h-70   flex-col z-60 justify-between  w-12/12 lg:w-6/12 "
      ref={resultsRef}
    >
      <div className=" flex flex-col gap-4 w-full h-130 p-10 top-0 ">
        <h2 className="text-6xl font-sans text-primary text-shadow-xl w-full text-shadow-2xl ">
          Results
        </h2>
        <div className="min-h-100 w-full">
          <p className="text-primary/80 text-sm ">
            lorem ipsum dolor sit amet consectetur adipiscing elit non
            temporibus eiusmod dolor cum enim occaecat duis consectetur et rerum
            expedita pariatur quo esse cupiditate ullamco et quo non animi nam
            id anim aliqua anim minus cupidatat in aut deserunt deleniti odio
            elit deserunt ut animi cupidatat velit fugiat sit cumque
          </p>
        </div>
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
