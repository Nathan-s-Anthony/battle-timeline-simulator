export default function InfoPanel({
  name,
  desc,
  subHeading,
}: {
  name: string;
  desc: string;
  subHeading: string;
}) {
  console.log(name, "name battle");
  return (
    <div className="">
      <span className="text-secondary text-shadow-xl">
        BATTLE TIMELINE SIMULATION
      </span>
      <div className="flex flex-col gap-4">
        <div key={`simulation-heading-${name}`}>
          <span className="text-primary/60 text-xs text-shadow-xl">
            {subHeading}
          </span>
          <h1 className="text-6xl font-sans text-primary text-shadow-xl">
            {name}
          </h1>
          <span className="text-primary/40  text-xs text-shadow-xl">
            {desc}
          </span>
        </div>
      </div>
    </div>
  );
}
