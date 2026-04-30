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

  const baseSize = 80;
  const planetBigger = safeDiameter >= 1;
  const maxSize = 220;

  const earthSize = planetBigger ? baseSize : baseSize / safeDiameter;
  const planetSize = planetBigger ? baseSize * safeDiameter : baseSize;

  const scale = Math.min(1, maxSize / Math.max(earthSize, planetSize));

  const finalEarthSize = earthSize * scale;
  const finalPlanetSize = planetSize * scale;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="relative flex items-center justify-center"
        style={{ width: maxSize, height: maxSize }}
      >
        {/* Planeet cirkel */}
        <div
          className={`absolute rounded-full ${planetBigger ? "z-10 bg-[#6F6DD8]/20" : "z-0 border-2 border-[#6F6DD8]/60 bg-[#6F6DD8]/10"}`}
          style={{ width: finalPlanetSize, height: finalPlanetSize }}
        />
        {/* Aarde SVG */}
        <div className={`absolute ${planetBigger ? "z-20" : "z-10"}`}>
          <Image
            src="/earthFull.svg"
            alt="Earth"
            width={finalEarthSize}
            height={finalEarthSize}
          />
        </div>
      </div>
    </div>
  );
};

export default DiameterVisualisation;
