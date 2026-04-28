import Image from "next/image";
import React from "react";

type ButtonProps = {
  label?: string;
  icon?: string;
  rounded?: boolean;
  glassPosition?: "left" | "right" | "bottom";
  gradient?: "blue" | "purple";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = ({
  label,
  icon,
  rounded,
  glassPosition = "bottom",
  gradient = "blue",
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      data-glass-position={glassPosition}
      data-glass-gradient={gradient}
      onClick={onClick}
      disabled={disabled}
      className={`liquid-glass-card isolate flex text-subtitle-secondary text-light-purple uppercase items-center justify-center gap-2xs ${rounded ? "h-20 w-20 shrink-0 rounded-full p-0" : "w-fit rounded-[20px] px-lg py-2xs"}`}
    >
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-tint"></div>
      <div className="liquidGlass-shine"></div>
      {icon && <Image src={icon} alt="" width={20} height={20} />}
      {label}
      {children}
    </button>
  );
};

export default Button;
