import { Planeet } from "@prisma/client";
import React from "react";
import Card from "../components/Card";
import QrCode from "../components/QrCode";

type ExtraInfoProps = {
  planet: Planeet | null;
};

const ExtraInfo = ({ planet }: ExtraInfoProps) => {
  return (
    <div className="h-full flex items-center justify-between w-full">
      <Card className="w-full p-4 flex flex-col gap-xs relative text-light-blue">
        <h2 className="text-title-primary font-bold title-gradient text-center border-b-4 border-border-tertiary pb-2">
          Extra Info
        </h2>
        <div className="flex flex-col gap-lg text-body-md">
          <div className="flex flex-col gap-2xs">
            <h3 className="text-subtitle-primary text-light-purple">
              Help, wat betekent dit?
            </h3>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">AE</span> ≈ 194,6
              mln. km (Astronomische eenheid, gemiddelde afstand aarde-zon)
            </p>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">g</span> = 9,81 m/s²
              (Versnelling waarmee een voorwerp naar de aarde toe valt)
            </p>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">Lichtjaar</span> ≈
              9,46 bln. km (Afstand die licht in 1 jaar aflegt)
            </p>
          </div>

          <div className="flex flex-col gap-2xs">
            <h3 className="text-subtitle-primary text-light-purple">
              Nieuwsgierig?
            </h3>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">Weetje</span>:{" "}
              {planet?.weetje}
            </p>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">Planeettype</span> ={" "}
              {planet?.planeettype}
            </p>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">Stertype</span> ={" "}
              {planet?.stertype}
            </p>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">Stermassa</span> ={" "}
              {planet?.stermassa}
            </p>
            <p className="text-body-primary">
              <span className="text-light-purple font-bold">Stergrootte</span> ={" "}
              {planet?.sterstraal}
            </p>
          </div>
        </div>
        <div className="max-w-60 aspect-square absolute bottom-2 right-2">
          <QrCode nasaUrl={planet?.nasaUrl ?? undefined} />
        </div>
      </Card>
    </div>
  );
};

export default ExtraInfo;
