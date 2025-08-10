// components/GlassIcon.tsx
import React from "react";
import Image from "next/image";
import localFont from "next/font/local";

const nataSans = localFont({
  src: "fonts/NataSans-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nataSans",
});

interface GlassIconProps {
  src: string;
  alt: string;
  label: string;
  color?: string;
}

const GlassIcon: React.FC<GlassIconProps> = ({
  src,
  alt,
  label,
  color = "hsl(0, 0%, 90%)",
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group"
    >
      <span
        className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
        style={{
          background: color,
          boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
        }}
      ></span>

      <span
        className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
        style={{
          boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
        }}
      >
        <span className="m-auto w-[2.5em] h-[2.5em] flex items-center justify-center">
          <Image src={src} alt={alt} width={40} height={40} />
        </span>
      </span>

      <span className={`${nataSans.className} absolute top-full left-1/2 -translate-x-1/2 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]`}>
        {label}
      </span>
    </button>
  );
};

export default GlassIcon;
