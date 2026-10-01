export default function InfoPanel({
  name,
  desc,
  subHeading,
}: {
  name: string;
  desc: string;
  subHeading: string;
}) {
  return (
    <div className="relative">
      <span className="text-secondary text-shadow-xl">
        BATTLE TIMELINE SIMULATION
      </span>
      <div className="flex flex-col gap-4">
        <div key={`simulation-heading-${name}`}>
          <span className="text-primary/60 text-xs text-shadow-xl">
            {name ?? "Battle"}{" "}
          </span>
          <h1 className="font-sans text-primary text-shadow-xl">
            {name ?? "Battle"}
          </h1>
          <span className="text-primary/40  text-xs text-shadow-xl">
            {name ?? "Battle Description"}
          </span>
        </div>
      </div>
    </div>
  );
}
