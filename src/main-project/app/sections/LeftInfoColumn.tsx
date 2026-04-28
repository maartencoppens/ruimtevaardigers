import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { Planet } from "../types/planet";
import DiameterVisualisation from "../components/DiameterVisualisation";

type LeftColumnInfoProps = {
  planet: Planet | null;
  onShowExtraInfo: () => void;
  onSearchFurther?: () => void;
  style?: string;
};

const LeftInfoColumn = ({
  planet,
  onShowExtraInfo,
  onSearchFurther,
  style,
}: LeftColumnInfoProps) => {
  return (
    <div className="flex flex-col justify-between h-full w-full min-w-0">
      <div className="flex flex-col gap-lg">
        <Card
          glassPosition="left"
          gradient="blue"
          className="flex flex-col gap-xs px-4xl py-xs"
          radius="lg"
        >
          <h3 className="text-subtitle-secondary font-subheading uppercase text-light-purple">
            Grootte
          </h3>
          <div className="flex gap-xs">
            <DiameterVisualisation diameter={planet?.diameterPlaneet} />
            <div className="w-full flex flex-col justify-center gap-2xs">
              <div className="flex flex-col justify-between">
                <div className="flex gap-1.75">
                  <Image
                    src="/diameter-icon.svg"
                    alt="Diameter"
                    width={20}
                    height={15}
                  />
                  <h4 className="uppercase text-light-blue text-body-sm">
                    Diameter
                  </h4>
                </div>
                <div className="flex gap-2.5 items-end justify-center">
                  <span className="text-light-blue text-body-xl spreading-1">
                    {planet?.diameterPlaneet} x
                  </span>
                  <span className="uppercase text-body-md text-blue">
                    aarde
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex gap-1.75">
                  <Image
                    src="/weight-icon.svg"
                    alt="Weight"
                    width={20}
                    height={15}
                  />
                  <h4 className="uppercase text-light-blue text-body-sm">
                    Massa
                  </h4>
                </div>
                <div className="flex gap-2.5 items-end justify-center">
                  <span className="text-light-blue text-body-xl">
                    {planet?.massaPlaneet} x
                  </span>
                  <span className="uppercase text-body-md text-blue">
                    aarde
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card
          glassPosition="left"
          gradient="blue"
          className="flex flex-col gap-2xs justify-center"
          radius="lg"
        >
          <div className="flex justify-between p-2.5 border-b-2 border-grey-transparent">
            <h3 className="text-subtitle-secondary font-subheading uppercase text-light-purple">
              Afstand van de ster
            </h3>
            <Image src="/sun-purple.svg" alt="Sun" width={32} height={32} />
          </div>
          <Slider
            variant="primary"
            mode="icon"
            value={planet?.afstandVanSter}
            min={0.005}
            max={100}
            scale="log"
            leftIcon="/fire.svg"
            markerIcon="/planet-purple-accent.svg"
            rightIcon="/ice.svg"
            leftLabel="DICHT"
            label={`${planet?.afstandVanSter} AE`}
            rightLabel="VER"
          />
        </Card>
        <Card
          glassPosition="left"
          gradient="blue"
          className="flex flex-col gap-2xs justify-center"
          radius="lg"
        >
          <div className="flex justify-between p-2.5 border-b-2 border-grey-transparent">
            <h3 className="text-subtitle-secondary font-subheading uppercase text-light-purple">
              Zwaartekracht
            </h3>
            <Image
              src="/gravitatie-laag.svg"
              alt="Sun"
              width={19}
              height={40}
            />
          </div>
          <Slider
            variant="primary"
            mode="icon"
            value={planet?.gravitatiekracht}
            min={0}
            max={2}
            scale="linear"
            markerIcon="/planet-purple-accent.svg"
            leftLabel="LAAG"
            label={`${planet?.gravitatiekracht} g`}
            rightLabel="HOOG"
          />
        </Card>
      </div>
      <div className="flex items-center gap-3xs">
        <Button
          label="?"
          rounded={true}
          glassPosition="left"
          gradient="purple"
          onClick={onShowExtraInfo}
        />
        <Button
          label="Zoek verder"
          glassPosition="left"
          gradient="purple"
          onClick={onSearchFurther}
        />
      </div>
    </div>
  );
};

export default LeftInfoColumn;
