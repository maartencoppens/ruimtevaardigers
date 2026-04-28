import Image from "next/image";
import React from "react";

type DiameterVisualisationProps = {
  diameter?: number | string | null;
};

const DiameterVisualisation = ({ diameter }: DiameterVisualisationProps) => {
  const parsedDiameter =
    typeof diameter === "number"
      ? diameter
      : Number(String(diameter ?? "1").replace(",", "."));

  const safeDiameter =
    Number.isFinite(parsedDiameter) && parsedDiameter > 0 ? parsedDiameter : 1;

  const earthSize = 84;
  const basePlanetSize = 140;
  const planetSize = Math.min(basePlanetSize * safeDiameter, 260);

  return (
    <div className="flex flex-col items-start gap-2 w-full h-full">
      <div className="flex items-center">
        <div
          className={`relative flex h-65 w-65 items-center justify-center ${planetSize > earthSize && "z-10"}`}
        >
          <div
            className="rounded-full bg-[#6F6DD8]/20"
            style={{
              width: `${planetSize}px`,
              height: `${planetSize}px`,
            }}
          />
          <div className="absolute flex items-center justify-center">
            <Image
              src="/earth.svg"
              alt="Earth"
              width={earthSize}
              height={earthSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiameterVisualisation;
