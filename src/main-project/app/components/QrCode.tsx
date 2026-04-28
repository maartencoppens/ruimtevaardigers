"use client";

import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";

type QrCodeProps = {
  className?: string;
  nasaUrl?: string;
};

const QrCode = ({ className, nasaUrl }: QrCodeProps) => {
  const [hasLoadError, setHasLoadError] = useState(false);
  const targetUrl = nasaUrl?.trim() || null;
  const qrCodeUrl = useMemo(() => {
    if (!targetUrl) return null;

    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(targetUrl)}&size=500x500`;
  }, [targetUrl]);

  useEffect(() => {
    setHasLoadError(false);
  }, [targetUrl]);

  return (
    <Card
      noPadding
      glass={false}
      className={`max-w-60 aspect-square rounded-lg border-3 border-white/12 bg-[#2a2a2ab8] p-5 ${className || ""}`}
    >
      <div className="h-full w-full overflow-hidden bg-[#2f2f2f]">
        {qrCodeUrl && !hasLoadError ? (
          <img
            src={qrCodeUrl}
            alt="QR code linking to the NASA planet page"
            className="h-full w-full object-cover"
            onError={() => setHasLoadError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-secondary">
            {targetUrl ? "QR niet beschikbaar" : "Geen NASA-link"}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QrCode;
