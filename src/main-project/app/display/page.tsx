"use client";

import type { Flag } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MiddleColumn from "../sections/MiddleColumn";
import LeftInfoColumn from "../sections/LeftInfoColumn";
import RightInfoColumn from "../sections/RightInfoColumn";
import { Planet } from "../types/planet";
import Idle from "../sections/Idle";
import VideoBackground from "../components/VideoBackground";
import FlagForm from "../sections/FlagForm";
import ExtraInfo from "../sections/ExtraInfo";
import Button from "../components/Button";
import { useGLTF } from "@react-three/drei";
import { plane } from "three/examples/jsm/Addons.js";

const PATTERNS = ["#9b51e0", "#2f3c97"];

type State = "idle" | "planet-info";
type currentPlanetScreen = "info" | "flag-form" | "extra-info";
type FlagsResponse = {
  flag: Flag;
  flags: Flag[];
};

function DisplayPage() {
  const [state, setState] = useState<State>("idle");
  const [planetId, setPlanetId] = useState<string | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [initials, setInitials] = useState("");
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPlanetOverlay, setShowPlanetOverlay] = useState(true);

  const [currentScreen, setCurrentScreen] =
    useState<currentPlanetScreen>("info");

  const gridLayout =
    currentScreen === "info"
      ? "grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)]"
      : currentScreen === "extra-info"
        ? "grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0fr)]"
        : "grid-cols-[minmax(0,0fr)_minmax(0,1fr)_minmax(0,1.2fr)]";

  // Fetch planet info when planetId changes
  useEffect(() => {
    if (planetId === null) {
      setPlanet(null);
      return;
    }

    const fetchPlanet = async () => {
      console.log(planetId);
      try {
        const res = await fetch(`/api/planet?planetId=${planetId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch planet");
        const data = await res.json();
        setPlanet(data);
        console.log(data);
      } catch {
        setPlanet(null);
      }
    };
    void fetchPlanet();
  }, [planetId]);

  //websocket to listen for zoom events from the main page
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);

    ws.onmessage = async (event) => {
      try {
        console.log("[ws] raw event data:", event.data);

        const raw =
          typeof event.data === "string"
            ? event.data
            : event.data instanceof Blob
              ? await event.data.text()
              : new TextDecoder().decode(event.data);

        console.log("[ws] decoded raw payload:", raw);

        const payload = JSON.parse(raw) as {
          type?: string;
          isZoomedIn?: boolean | number | string;
          planetId?: string | number | null;
        };

        console.log("[ws] parsed payload:", payload);

        if (payload.type === "flags-updated") {
          return;
        }

        const isZoomedIn =
          payload.isZoomedIn === true || Number(payload.isZoomedIn) === 1;
        const nextPlanetId =
          payload.planetId === null || payload.planetId === undefined
            ? null
            : Number(payload.planetId) + 1;

        console.log("[ws] mapped values:", {
          incomingPlanetId: payload.planetId,
          mappedPlanetId: nextPlanetId,
          isZoomedIn,
        });

        if (isZoomedIn) {
          const nextPlanetIdString =
            nextPlanetId !== null && Number.isFinite(nextPlanetId)
              ? String(nextPlanetId)
              : null;

          setPlanetId(nextPlanetIdString);

          setInitials("");
          setPattern(PATTERNS[0]);
          setError(null);
          setShowPlanetOverlay(true);
          if (nextPlanetIdString) {
            useGLTF.preload(`/models/planet-${nextPlanetIdString}.glb`);
          }
          setState("planet-info");
        } else {
          // Reset to idle when zoomed out
          setState("idle");
          setPlanetId(null);
        }
      } catch {
        console.error("Invalid WS message", event.data);
      }
    };

    ws.onerror = () => console.error("WebSocket error");

    return () => ws.close();
  }, []);

  //submit flag to API
  const handleSubmit = async () => {
    if (!initials.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initials: initials.trim(),
          pattern,
          planetId: planetId,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = (await res.json()) as FlagsResponse;
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);

      ws.addEventListener("open", () => {
        ws.send(
          JSON.stringify({
            type: "flags-updated",
            flags: data.flags,
          }),
        );
        ws.close();
      });

      setCurrentScreen("info");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-dvh">
      <VideoBackground />

      <div className="relative z-10">
        {/* ── IDLE ── */}
        {state === "idle" && <Idle />}

        {/* PLANET INFO */}
        {state === "planet-info" && (
          <div className="relative h-svh overflow-hidden">
            <div
              className={`grid ${gridLayout} gap-xs display-container h-full overflow-visible transition-all duration-500`}
            >
              <div
                className={`relative min-w-0 overflow-hidden transition-opacity duration-300 ${
                  showPlanetOverlay || currentScreen === "flag-form"
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <div
                  className={`h-full transition-opacity duration-300 ${
                    currentScreen === "extra-info"
                      ? "opacity-0 pointer-events-none absolute inset-0"
                      : "opacity-100"
                  }`}
                >
                  <LeftInfoColumn
                    planet={planet}
                    onShowExtraInfo={() => setCurrentScreen("extra-info")}
                    onSearchFurther={async () => {
                      setState("idle");
                      const protocol =
                        window.location.protocol === "https:" ? "wss" : "ws";
                      const ws = new WebSocket(
                        `${protocol}://${window.location.host}/api/ws`,
                      );

                      ws.addEventListener("open", () => {
                        ws.send(
                          JSON.stringify({
                            type: "search-further",
                          }),
                        );
                        ws.close();
                      });
                    }}
                  />
                </div>
                <div
                  className={`h-full transition-opacity duration-300 ${
                    currentScreen === "extra-info"
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none absolute inset-0"
                  }`}
                >
                  <ExtraInfo planet={planet} />
                </div>
              </div>

              <div className="min-w-0 overflow-hidden">
                <MiddleColumn
                  planet={planet}
                  currentScreen={currentScreen}
                  onBack={() => setCurrentScreen("info")}
                  hideContent={showPlanetOverlay}
                />
              </div>

              <div
                className={`relative min-w-0 overflow-hidden transition-opacity duration-300 ${
                  showPlanetOverlay || currentScreen === "extra-info"
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <div
                  className={`h-full transition-opacity duration-300 ${
                    currentScreen === "flag-form"
                      ? "opacity-0 pointer-events-none absolute inset-0"
                      : "opacity-100"
                  }`}
                >
                  <RightInfoColumn
                    planet={planet}
                    onShowFlagForm={() => setCurrentScreen("flag-form")}
                  />
                </div>
                <div
                  className={`h-full transition-opacity duration-300 ${
                    currentScreen === "flag-form"
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none absolute inset-0"
                  }`}
                >
                  <FlagForm
                    initials={initials}
                    setInitials={setInitials}
                    pattern={pattern}
                    setPattern={setPattern}
                    patternArray={PATTERNS}
                    submitting={submitting}
                    error={error}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>

            {showPlanetOverlay && (
              <div className=" absolute inset-0 z-20 flex flex-col items-center justify-between pb-lg pt-20 gap-md">
                <h1 className=" text-text-secondary text-subtitle-primary font-heading text-center leading-8">
                  Je hebt een planeet gevonden!
                </h1>
                <div className="flex flex-col justify-center items-center gap-lg">
                  <h2 className="text-text-secondary text-title-primary font-heading text-center">
                    {planet?.planeetnaam}
                  </h2>
                  <Button onClick={() => setShowPlanetOverlay(false)}>
                    <p className="text-title-secondary">Ontdek</p>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default dynamic(async () => DisplayPage, {
  ssr: false,
});
