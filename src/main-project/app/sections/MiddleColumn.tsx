import Image from "next/image";
import React, { Suspense } from "react";
import { Planet } from "../types/planet";
import PlanetHero from "../components/PlanetHero";
import { Canvas } from "@react-three/fiber";
import Card from "../components/Card";
import EarthFull from "../components/svg/EarthFull";
import PlanetGradient from "../components/svg/PlanetGradient";

type MiddleColumnProps = {
  planet: Planet | null;
  currentScreen: "info" | "flag-form" | "extra-info";
  onBack: () => void;
  hideContent?: boolean;
};

const MiddleColumn = ({
  planet,
  currentScreen,
  onBack,
  hideContent,
}: MiddleColumnProps) => {
  const hiddenContentClass = hideContent
    ? "opacity-0 pointer-events-none"
    : "opacity-100";
  const canvasWidthClass =
    currentScreen === "info" ? "max-w-full" : "max-w-[calc(100%-5rem)]";

  return (
    <>
      <div className="h-full min-w-0 flex flex-col justify-between w-full relative overflow-visible">
        {currentScreen === "extra-info" && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Terug"
            className={`absolute right-0 top-1/2 -translate-y-1/2 text-6xl leading-none text-white z-10 transition-opacity duration-300 ${hiddenContentClass}`}
          >
            <Image
              src="/right-arrow-button.svg"
              alt="Close icon"
              width={30}
              height={30}
            />
          </button>
        )}

        {currentScreen === "flag-form" && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Terug"
            className={`absolute left-0 top-1/2 -translate-y-1/2 text-6xl leading-none text-white z-10 transition-opacity duration-300 ${hiddenContentClass}`}
          >
            <Image
              src="/left-arrow-button.svg"
              alt="Close icon"
              width={30}
              height={30}
            />
          </button>
        )}

        <div
          className={`flex flex-col items-center transition-opacity duration-300 ${hiddenContentClass}`}
        >
          <Image
            src="/around-sun.svg"
            alt="Orbit around sun"
            width={550}
            height={60}
            className="max-w-full h-auto"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-body-md text-light-blue m-0 uppercase">
              {planet?.jaarTovAarde} dagen
            </p>
            <p className="text-body-sm text-light-blue uppercase">
              Omloopperiode
            </p>
          </div>
        </div>
        <div
          className={`relative mx-auto flex aspect-square w-[min(38vw,58dvh,42rem)] items-center justify-center ${canvasWidthClass}`}
        >
          <div
            className="absolute inset-[12%] rounded-full bg-[var(--planet-glow-color)] blur-[var(--planet-glow-blur)]"
            aria-hidden="true"
          />
          <Canvas
            className="relative z-10 w-full h-full touch-none"
            camera={{ position: [0, 0, 2.6] }}
          >
            <ambientLight intensity={1.4} />
            <directionalLight position={[4, 5, 4]} intensity={2.4} />
            <directionalLight position={[-3, -2, -4]} intensity={0.8} />
            <Suspense fallback={null}>
              <PlanetHero planetID={planet?.id} />
            </Suspense>
          </Canvas>
        </div>
        <div
          className={`min-w-0 transition-opacity duration-300 ${hiddenContentClass}`}
        >
          <div className="text-center min-w-0 pb-5">
            <h1 className="title-effect font-heading text-title-primary uppercase leading-20">
              <span className="title-effect-glow">{planet?.planeetnaam}</span>
              <span className="title-effect-shadow">{planet?.planeetnaam}</span>
              <span className="title-gradient title-effect-main">
                {planet?.planeetnaam}
              </span>
            </h1>
            <h2 className="font-heading text-body-lg text-purple uppercase leading-10">
              Mogelijk Bewoonbaar
            </h2>
          </div>
          <Card
            glassPosition="bottom"
            gradient="blue"
            className="grid w-full grid-cols-[4rem_0.125rem_minmax(0,1fr)_0.125rem_4rem] items-center gap-xl px-xl py-xs"
            radius="lg"
          >
            <div className="flex h-16 w-16 items-center justify-center">
              <EarthFull />
            </div>
            <div className="w-0.5 h-[62.5px] bg-border-gradient" />
            <div className="flex flex-col items-center justify-center text-center">
              <p className="uppercase text-light-purple text-body-sm">
                Afstand tot aarde
              </p>
              <div className="flex items-center justify-center gap-2.5">
                <span className="text-body-xl text-light-purple">
                  {planet?.afstandVanAarde}
                </span>
                <span className="uppercase text-body-md text-blue">
                  Lichtjaren
                </span>
              </div>
            </div>
            <div className="w-0.5 h-[62.5px] bg-border-gradient" />
            <div className="flex h-16 w-16 items-center justify-center">
              <PlanetGradient />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MiddleColumn;
