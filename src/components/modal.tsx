export default function Modal({
  children,
  toggleModal,
  setToggleModal,
  toggleSimulation,
  setToggleSimulation,
}: {
  children: React.ReactNode;
  toggleModal: boolean | undefined;
  setToggleModal: (toggleModal: boolean) => void;
  toggleSimulation: boolean | undefined;
  setToggleSimulation: (toggleSimulation: boolean) => void;
}) {
  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setToggleSimulation(true);
    setToggleModal(false);
  };
  return (
    <div
      className={`modal ${toggleModal ? "active" : "hidden"}  transition-all duration-300  bg-background/30 inset-0 justify-center mx-auto flex items-center`}
    >
      <div className="">
        <div className="relative bg-foreground rounded-md  w-120 h-120">
          <button
            onClick={() => setToggleModal(false)}
            className="text-primary absolute right-5 top-5"
          >
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          {children}
          <div className="absolute bottom-5 w-full flex justify-around">
            <button
              onClick={handleConfirmClick}
              className="border  border-primary text-primary text-shadow-xl py-4 px-8"
            >
              Confirm
            </button>
            <button
              onClick={() => setToggleModal(false)}
              className="border  border-primary text-primary text-shadow-xl py-4 px-8"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
