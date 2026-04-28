import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import { Planet } from "../types/planet";
import Button from "../components/Button";

const temperatuurZon = 5778;

type RightInfoColumnProps = {
  planet: Planet | null;
  onShowFlagForm: () => void;
};

const RightInfoColumn = ({ planet, onShowFlagForm }: RightInfoColumnProps) => {
  const temperatuurVergelijkingMetZon = planet
    ? Number((planet.temperatuurSter / temperatuurZon).toFixed(1))
    : null;

  return (
    <>
      <div className="h-full w-full min-w-0 flex flex-col justify-between overflow-visible">
        <div className="flex flex-col gap-xs">
          <div className="w-full min-w-0 flex flex-col gap-xl">
            <Card
              glassPosition="right"
              gradient="purple"
              className="flex flex-col justify-center items-end gap-1"
              radius="sm"
            >
              <div className="flex gap-3xs items-center justify-center">
                <h2 className="text-subtitle-primary text-light-purple uppercase">
                  Ster
                </h2>
                <Image src="/sun-purple.svg" alt="Sun" width={40} height={40} />
              </div>
              <p className="uppercase text-body-md text-light-purple">
                Locale ster
              </p>
            </Card>
          </div>
          <div className="flex flex-col gap-2xs w-full">
            <Card
              glass
              glassPosition="right"
              className="flex flex-col justify-center items-center w-full px-xl pt-xs pb-4xl gap-2xl"
              radius="lg"
            >
              <div className="w-full flex justify-between p-4xs pt-0 border-b-2 border-grey-transparent">
                <h3 className="uppercase text-light-purple text-subtitle-secondary">
                  Levenslijn
                </h3>
                <Image
                  src="/levenslijn-icon.svg"
                  alt="Lifeline icon"
                  width={48}
                  height={28}
                />
              </div>
              <div className="flex flex-col items-center gap-2xs w-full">
                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="uppercase text-body-lg text-light-blue">
                    {planet?.levensduurSter} miljard jaar
                  </p>
                  <p className="uppercase text-blue text-body-sm">
                    geschatte leeftijd
                  </p>
                </div>
                <Slider
                  value={planet?.levensduurSter ?? 0}
                  mode="arrow"
                  leftLabel="0"
                  rightLabel="6.8"
                />
              </div>
            </Card>
            <div className="grid grid-cols-[1.47fr_1fr] gap-sm w-full">
              <Card
                glassPosition="right"
                className="flex flex-col justify-center gap-2xs p-xs min-w-0"
                radius="md"
              >
                <div className="w-full flex items-center justify-start p-4xs pt-0 border-b-2 border-grey-transparent">
                  <h3 className="uppercase text-light-purple text-subtitle-tertiary ">
                    Aantal planeten
                  </h3>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2xs">
                    <Image
                      src="/planet-blue.svg"
                      alt="Planets icon"
                      width={40}
                      height={40}
                    />
                    <p className="text-body-xl text-light-blue">
                      {planet?.aantalPlanetenStelsel}
                    </p>
                  </div>
                  <p className="uppercase text-body-sm text-blue">
                    planeten in het systeem
                  </p>
                </div>
              </Card>
              <Card
                glassPosition="right"
                className="flex flex-col justify-center p-xs gap-2xs min-w-0"
                radius="md"
              >
                <div className="w-full flex items-center justify-center p-4xs pt-0 border-b-2 border-grey-transparent">
                  <h3 className="uppercase text-light-purple text-subtitle-tertiary">
                    temperatuur
                  </h3>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2xs">
                    <p className="text-body-xl text-light-blue">
                      {planet?.temperatuurSter} °C
                    </p>
                  </div>
                  <p className="uppercase text-body-sm text-blue">
                    {temperatuurVergelijkingMetZon ?? "-"} x de zon
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            label="Plant je vlag"
            icon="/flag-purple.svg"
            glassPosition="right"
            gradient="purple"
            onClick={onShowFlagForm}
          />
        </div>
      </div>
    </>
  );
};

export default RightInfoColumn;
