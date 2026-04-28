import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { Filter } from "bad-words";
import { baddwords } from "@/public/curseWords";

type FlagFormProps = {
  initials: string;
  setInitials: (initials: string) => void;
  pattern: string;
  setPattern: (pattern: string) => void;
  patternArray: string[];
  submitting: boolean;
  error: string | null;
  handleSubmit: () => void;
};

const FlagForm = ({
  initials,
  setInitials,
  pattern,
  patternArray,
  setPattern,
  submitting,
  error,
  handleSubmit,
}: FlagFormProps) => {
  const previewInitials = initials.trim().slice(0, 3) || "XDD";
  const [initialsError, setInitialsError] = useState<string | null>(null);
  const badWordsFilter = useMemo(() => {
    const filter = new Filter();
    filter.addWords(...baddwords);
    return filter;
  }, []);

  const validateInitials = (value: string) => {
    const normalizedInitials = value.toUpperCase();
    const sanitizedInitials = normalizedInitials.replace(/[^A-Z]/g, "");
    const hadInvalidCharacters = normalizedInitials !== sanitizedInitials;

    if (sanitizedInitials && badWordsFilter.isProfane(sanitizedInitials)) {
      return {
        sanitizedInitials,
        error: "Deze initialen zijn niet toegestaan.",
      };
    }

    if (hadInvalidCharacters) {
      return {
        sanitizedInitials,
        error: "Alleen letters zijn toegestaan.",
      };
    }

    return {
      sanitizedInitials,
      error: null,
    };
  };

  const handleInitialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { sanitizedInitials, error } = validateInitials(e.target.value);
    setInitialsError(error);
    setInitials(sanitizedInitials);
  };

  useEffect(() => {
    const { sanitizedInitials, error } = validateInitials(initials);

    if (sanitizedInitials !== initials) {
      setInitials(sanitizedInitials);
      return;
    }

    setInitialsError(error);
  }, [badWordsFilter, initials, setInitials]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="relative w-full p-3 py-6 flex flex-col">
        <h2 className="text-title-primary font-bold title-gradient text-center border-b-2 border-border-tertiary pb-1">
          PLAATS JE VLAG
        </h2>
        <h3 className="mt-sm text-center text-subtitle-primary text-text-secondary">
          Kies jouw kleuren
        </h3>

        <div className="mt-sm grid grid-cols-[1fr_0.9fr] gap-sm">
          <div className="flex flex-col gap-sm">
            <div>
              <label
                htmlFor="initials"
                className="mb-2 block text-center text-subtitle-secondary text-text-secondary"
              >
                Jouw initialen
              </label>
              <Card>
                <input
                  id="initials"
                  type="text"
                  value={initials}
                  onChange={handleInitialsChange}
                  placeholder="XDD"
                  maxLength={3}
                  autoComplete="off"
                  className="w-full bg-transparent text-center text-4xl font-bold uppercase tracking-[0.35em] text-text-secondary caret-text-secondary outline-none placeholder:text-white/40"
                />
              </Card>
            </div>

            <div>
              <p className="mb-2 text-center text-subtitle-secondary text-text-secondary">
                Kleur vlag
              </p>
              <Card className="p-4">
                <div className="flex flex-wrap justify-center gap-1">
                  {patternArray.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setPattern(color)}
                      aria-label={`Kies kleur ${color}`}
                      className={`h-10 w-10 transition ${pattern === color ? "ring-2 ring-white" : ""}`}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>
              </Card>
            </div>
            <div className="w-full h-3">
              {(initialsError || error) && (
                <p className="text-center text-danger">
                  {initialsError || error}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={submitting || Boolean(initialsError)}
              >
                {submitting ? "Submitting..." : "Plant je vlag"}
              </Button>
            </div>
          </div>

          <Card className="w-full">
            <div className="relative flex min-h-72 w-full items-start justify-end overflow-hidden rounded-xl px-4 py-3">
              <div
                aria-hidden="true"
                className="absolute right-[1.05rem] top-5 z-10 h-50 w-61"
                style={{
                  backgroundColor: pattern,
                  maskImage: "url('/personalized-flag.svg')",
                  WebkitMaskImage: "url('/personalized-flag.svg')",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              <div className="absolute right-[1.05rem] top-5 z-20 flex h-50 w-61 items-center justify-center pr-8 text-6xl font-bold uppercase tracking-[0.08em] text-white">
                {previewInitials}
              </div>
              <img
                src="/stam.svg"
                alt=""
                aria-hidden="true"
                className="relative z-30 ml-auto h-92 w-[1.1rem] object-fill"
              />
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default FlagForm;
