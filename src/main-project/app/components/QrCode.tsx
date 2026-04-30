"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Card from "./Card";

type QrCodeProps = {
  className?: string;
  nasaUrl?: string;
};

const QrCode = ({ className, nasaUrl }: QrCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);
  const targetUrl = nasaUrl?.trim() || null;

  useEffect(() => {
    if (!canvasRef.current || !targetUrl) return;

    setHasError(false);

    QRCode.toCanvas(canvasRef.current, targetUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }).catch(() => setHasError(true));
  }, [targetUrl]);

  return (
    <Card
      noPadding
      glass={false}
      className={`w-full h-full rounded-lg border-3 border-white/12 bg-[#2a2a2ab8] p-5 ${className || ""}`}
    >
      <div className="relative h-full w-full overflow-hidden bg-[#2f2f2f]">
        {targetUrl && !hasError ? (
          <canvas
            ref={canvasRef}
            className="block h-full w-full max-h-full max-w-full"
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
