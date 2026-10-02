import { useEffect } from "react";
import {
  formatSimulationDate,
  formatSimulationTime,
} from "../../../lib/formatClock";

export default function Clock({ clock }: { clock: any }) {
  const formateDate = clock && formatSimulationDate(clock);
  const formateTime = clock && formatSimulationTime(clock);
  return (
    <div className="clock flex justify-center absolute top-0 left-0 right-0 z-60 ">
      <div className="bg-background  relative  w-50 rounded-b-md  text-center p-2">
        <div className="flex flex-col justify-between  rounded-t-md p-2">
          <div>
            <span className="text-primary">{formateDate}</span>
          </div>
          <div>
            <span className="text-primary">{formateTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
