import Image from "next/image";

type SliderProps = {
  variant?: "primary" | "secondary";
  mode?: "icon" | "arrow";
  value?: number;
  min?: number;
  max?: number;
  scale?: "linear" | "log";
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  leftIcon?: string;
  rightIcon?: string;
  markerIcon?: string;
};

const Slider = ({
  variant = "primary",
  mode = "icon",
  value,
  min,
  max,
  scale = "linear",
  label,
  leftLabel,
  rightLabel,
  markerIcon = "/planet-purple-accent.svg",
}: SliderProps) => {
  const safeValue = value ?? 0;
  const safeMin = min ?? 0;
  const safeMax = max ?? 100;

  //berekening percentage met logaritmische schaal als scale="log"
  const rawPercentage =
    scale === "log" && safeValue > 0 && safeMin > 0 && safeMax > safeMin
      ? ((Math.log10(safeValue) - Math.log10(safeMin)) /
          (Math.log10(safeMax) - Math.log10(safeMin))) *
        100
      : ((safeValue - safeMin) / (safeMax - safeMin)) * 100;

  const percentage = Math.min(100, Math.max(0, rawPercentage));

  if (mode === "arrow") {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-4 text-body-md text-blue">
            <span className="shrink-0 whitespace-nowrap">
              {leftLabel ?? safeMin}
            </span>
            <div className="relative flex-1">
              <div className="relative h-7.75 rounded-md px-2">
                {/* geblurde gradient achtergrond */}
                <div
                  className={`absolute inset-0 rounded-md slider-gradient-${variant} blur-[1.5px]`}
                />
                {/* arrow bovenop, niet geblurd */}
                <div className="relative h-full w-full">
                  <Image
                    src="/slider-arrow.svg"
                    alt="Arrow"
                    width={32}
                    height={32}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-2/3"
                    style={{ left: `${percentage}%` }}
                  />
                </div>
              </div>
              {label && (
                <span
                  className="absolute top-full mt-2 -translate-x-1/2 whitespace-nowrap text-body-md text-blue"
                  style={{ left: `${percentage}%` }}
                >
                  {label}
                </span>
              )}
            </div>
            <span className="shrink-0 whitespace-nowrap">
              {rightLabel ?? safeMax}
            </span>
          </div>
          <div className="min-h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-4 text-body-md text-blue">
          <span className="shrink-0 whitespace-nowrap">{leftLabel}</span>
          <div className="relative flex-1">
            <div className="relative h-7.75 rounded-md px-2">
              {/* geblurde gradient achtergrond */}
              <div
                className={`absolute inset-0 rounded-md slider-gradient-${variant} blur-[1.5px]`}
              />
              {/* image bovenop, niet geblurd */}
              <div className="relative h-full w-full">
                <Image
                  src={markerIcon}
                  alt="Slider icon"
                  width={30}
                  height={30}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${percentage}%` }}
                />
              </div>
            </div>
            {label && (
              <span
                className="absolute top-full mt-2 -translate-x-1/2 whitespace-nowrap text-body-md text-blue"
                style={{ left: `${percentage}%` }}
              >
                {label}
              </span>
            )}
          </div>
          <span className="shrink-0 whitespace-nowrap">{rightLabel}</span>
        </div>
        <div className="min-h-10" />
      </div>
    </div>
  );
};

export default Slider;
