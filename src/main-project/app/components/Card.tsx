import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  glass?: boolean;
  glassPosition?: "left" | "right" | "bottom";
  gradient?: "blue" | "purple";
  radius?: "sm" | "md" | "lg";
};

const radiusClasses = {
  sm: "rounded-[24px]",
  md: "rounded-[32px]",
  lg: "rounded-[48px]",
};

const Card = ({
  children,
  className,
  noPadding = false,
  glass = true,
  glassPosition = "bottom",
  gradient = "blue",
  radius = "sm",
}: CardProps) => {
  const radiusClass = radiusClasses[radius];

  if (glass) {
    return (
      <div
        data-glass-position={glassPosition}
        data-glass-gradient={gradient}
        className={`relative w-full ${radiusClass} ${noPadding ? "" : "py-2.5 px-7.5"} ${className || ""} liquid-glass-card`}
      >
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>

        {children}
      </div>
    );
  }

  return (
    <div
      className={`bg-black/80 w-full ${radiusClass} ${noPadding ? "" : "py-2.5 px-7.5"} ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
