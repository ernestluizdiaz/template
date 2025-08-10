"use client";
import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  direction?: "left" | "right";
  interactive?: boolean;
}

const HorizontalLoop: FC<CurvedLoopProps> = ({
  marqueeText = "Cris Sauquillo ✦ UI/UX Designer ✦",
  speed = 2,
  className,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `horizontal-loop-${uid}`;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  const pathD = `M0,25 L1700,25`;
  const textLength = spacing;
  const totalText = useMemo(() => {
    if (!textLength) return text;
    const repeatCount = Math.ceil((1700 * 2) / textLength);
    return text.repeat(repeatCount);
  }, [text, textLength]);
  const ready = spacing > 0;

  // Scroll animation (fade-in/out)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (measureRef.current) {
      const len = measureRef.current.getComputedTextLength();
      setSpacing(len);
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0"
        );
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset >= wrapPoint) newOffset -= wrapPoint;

        textPathRef.current.setAttribute("startOffset", newOffset + "px");
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0"
    );
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset >= wrapPoint) newOffset -= wrapPoint;

    textPathRef.current.setAttribute("startOffset", newOffset + "px");
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      ref={containerRef}
      className={`relative w-full mt-40 transition-opacity duration-1500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l" />

      {/* Marquee loop */}
      <div
        className="flex items-center justify-center w-full"
        style={{ cursor: cursorStyle }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <svg
          className="w-full block aspect-[100/5] font-bold uppercase leading-none"
          style={{ fontSize: "clamp(1rem, 5vw, 2rem)" }}
          viewBox="0 0 1700 50"
        >
          {/* Hidden measurement text */}
          <text
            ref={measureRef}
            xmlSpace="preserve"
            style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
          >
            {text}
          </text>

          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="none"
            strokeWidth="1"
          />

          {ready && (
            <text
              xmlSpace="preserve"
              className={`fill-white ${className ?? ""}`}
            >
              <textPath
                ref={textPathRef}
                href={`#${pathId}`}
                startOffset={offset + "px"}
                xmlSpace="preserve"
              >
                {totalText}
              </textPath>
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};

export default HorizontalLoop;
