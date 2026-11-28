"use client";

import { useRef, useState, type PointerEvent } from "react";

type GlyphMask = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  pixelRatio: number;
  padding: number;
  leftBearing: number;
  ascent: number;
};

const HIT_ALPHA_THRESHOLD = 28;
const MASK_PADDING = 4;

function createGlyphMask(
  character: string,
  font: string,
  pixelRatio: number,
): GlyphMask | null {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return null;
  }

  context.font = font;
  context.textBaseline = "alphabetic";
  const metrics = context.measureText(character);
  const leftBearing = metrics.actualBoundingBoxLeft;
  const ascent = metrics.actualBoundingBoxAscent;
  const descent = metrics.actualBoundingBoxDescent;
  const width = Math.ceil(
    (leftBearing + metrics.actualBoundingBoxRight + MASK_PADDING * 2) *
      pixelRatio,
  );
  const height = Math.ceil(
    (ascent + descent + MASK_PADDING * 2) * pixelRatio,
  );

  if (width <= 0 || height <= 0) {
    return null;
  }

  canvas.width = width;
  canvas.height = height;
  context.scale(pixelRatio, pixelRatio);
  context.font = font;
  context.textBaseline = "alphabetic";
  context.fillStyle = "#fff";
  context.fillText(
    character,
    MASK_PADDING + leftBearing,
    MASK_PADDING + ascent,
  );

  return {
    data: context.getImageData(0, 0, width, height).data,
    width,
    height,
    pixelRatio,
    padding: MASK_PADDING,
    leftBearing,
    ascent,
  };
}

export default function HeroName() {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const masksRef = useRef(new Map<string, GlyphMask>());
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (event.pointerType === "touch") {
      clearActiveLetter();
      return;
    }

    if (!svgRef.current || !textRef.current) {
      return;
    }

    const svg = svgRef.current;
    const screenMatrix = svg.getScreenCTM();

    if (!screenMatrix) {
      return;
    }

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const localPoint = point.matrixTransform(screenMatrix.inverse());
    const text = textRef.current;
    const font = getComputedStyle(text).font;
    const pixelRatio = window.devicePixelRatio || 1;
    const letters = text.querySelectorAll("tspan");
    let hitIndex: number | null = null;

    letters.forEach((letter, index) => {
      if (hitIndex !== null || !letter.textContent?.trim()) {
        return;
      }

      const character = letter.textContent;
      const cacheKey = `${font}\u0000${pixelRatio}\u0000${character}`;
      let mask = masksRef.current.get(cacheKey);

      if (!mask) {
        mask = createGlyphMask(character, font, pixelRatio) ?? undefined;
        if (mask) {
          masksRef.current.set(cacheKey, mask);
        }
      }

      if (!mask) {
        return;
      }

      const origin = letter.getStartPositionOfChar(0);
      const glyphLeft = origin.x - mask.leftBearing;
      const glyphTop = origin.y - mask.ascent;
      const pixelX = Math.floor(
        (localPoint.x - glyphLeft + mask.padding) * mask.pixelRatio,
      );
      const pixelY = Math.floor(
        (localPoint.y - glyphTop + mask.padding) * mask.pixelRatio,
      );

      if (
        pixelX < 0 ||
        pixelY < 0 ||
        pixelX >= mask.width ||
        pixelY >= mask.height
      ) {
        return;
      }

      const alpha = mask.data[(pixelY * mask.width + pixelX) * 4 + 3];
      if (alpha >= HIT_ALPHA_THRESHOLD) {
        hitIndex = index;
      }
    });

    setActiveLetter((current) =>
      current === hitIndex ? current : hitIndex,
    );
  }

  function clearActiveLetter() {
    setActiveLetter(null);
  }

  return (
    <h1 className="hero-name" aria-label="Akshat Lal">
      <span className="hero-name-layer hero-name-shadow" aria-hidden="true">
        {Array.from("AKSHAT LAL").map((letter, index) => (
          <span
            className={`hero-name-letter hero-name-shadow-letter${activeLetter === index ? " is-active" : ""}`}
            key={index}
          >
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </span>
      <span className="hero-name-layer hero-name-face" aria-hidden="true">
        {Array.from("AKSHAT LAL").map((letter, index) => (
          <span
            className={`hero-name-letter hero-name-face-letter${activeLetter === index ? " is-active" : ""}`}
            key={index}
          >
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </span>
      <svg
        ref={svgRef}
        className="hero-name-svg"
        aria-hidden="true"
        focusable="false"
        onPointerMove={handlePointerMove}
        onPointerLeave={clearActiveLetter}
      >
        <text ref={textRef} className="hero-name-hit-target" x="0" y="0.88em">
          {Array.from("AKSHAT LAL").map((letter, index) => (
            <tspan key={index}>
              {letter === " " ? "\u00a0" : letter}
            </tspan>
          ))}
        </text>
      </svg>
    </h1>
  );
}
