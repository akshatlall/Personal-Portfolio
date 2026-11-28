"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

type PreviewPosition = {
  x: number;
  y: number;
  placement: "above" | "below";
};

type HoverPreviewProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  description?: string;
  mark?: string;
  className?: string;
  href?: string;
  imageOnly?: boolean;
  previewImage?: {
    src: string;
    width: number;
    height: number;
  };
};

export default function HoverPreview({
  children,
  title,
  eyebrow,
  description,
  mark,
  className,
  href,
  previewImage,
  imageOnly = false,
}: HoverPreviewProps) {
  const previewId = useId();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<PreviewPosition | null>(null);
  const [pinned, setPinned] = useState(false);

  function showAt(x: number, y: number) {
    const cardWidth = previewImage ? 360 : 276;
    const cardHeight = imageOnly ? 180 : previewImage ? 300 : 176;
    const halfWidth = Math.min(
      cardWidth / 2,
      Math.max(0, (window.innerWidth - 24) / 2),
    );
    const boundedX = Math.min(
      Math.max(x, halfWidth + 12),
      window.innerWidth - halfWidth - 12,
    );
    const hasRoomBelow = y + cardHeight + 24 <= window.innerHeight;
    const hasRoomAbove = y >= cardHeight + 24;
    const placement = !hasRoomBelow && hasRoomAbove ? "above" : "below";
    const boundedY =
      placement === "above"
        ? Math.max(y, cardHeight + 24)
        : Math.min(
            y + 12,
            Math.max(12, window.innerHeight - cardHeight - 12),
          );

    setPosition({
      x: boundedX,
      y: boundedY,
      placement,
    });
  }

  function handlePointer(event: PointerEvent<HTMLElement>) {
    showAt(event.clientX, event.clientY);
  }

  function handleFocus(event: FocusEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    showAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function closeIfUnfocused() {
    const activeElement = document.activeElement;
    if (
      pinned ||
      activeElement === anchorRef.current ||
      activeElement === buttonRef.current
    ) {
      return;
    }

    setPosition(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      setPinned(false);
      setPosition(null);
    }
  }

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    if (pinned) {
      setPinned(false);
      setPosition(null);
      return;
    }

    setPinned(true);
    const rect = event.currentTarget.getBoundingClientRect();
    showAt(
      event.clientX || rect.left + rect.width / 2,
      event.clientY || rect.top + rect.height / 2,
    );
  }

  const triggerProps = {
    className: `hover-preview-trigger${className ? ` ${className}` : ""}`,
    onPointerEnter: handlePointer,
    onPointerMove: handlePointer,
    onPointerLeave: closeIfUnfocused,
    onFocus: handleFocus,
    onBlur: closeIfUnfocused,
    onKeyDown: handleKeyDown,
    "aria-describedby": position ? previewId : undefined,
  };

  const trigger = href ? (
    <a
      ref={anchorRef}
      {...triggerProps}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <button
      ref={buttonRef}
      {...triggerProps}
      type="button"
      aria-expanded={Boolean(position)}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );

  return (
    <>
      {trigger}
      {position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={[
              "hover-preview-card",
              `hover-preview-${position.placement}`,
              previewImage && "hover-preview-with-image",
              imageOnly && "hover-preview-image-only",
            ]
              .filter(Boolean)
              .join(" ")}
            id={previewId}
            role="tooltip"
            style={{ left: position.x, top: position.y }}
          >
            {previewImage && (
              <Image
                src={previewImage.src}
                width={previewImage.width}
                height={previewImage.height}
                alt={
                  imageOnly
                    ? "Screenshot of the University of Waterloo Computer Engineering program page"
                    : ""
                }
                aria-hidden={!imageOnly}
                className="hover-preview-image"
                style={{
                  aspectRatio: `${previewImage.width} / ${previewImage.height}`,
                }}
                unoptimized
              />
            )}
            {!imageOnly && (
              <>
                {mark && (
                  <span className="hover-preview-mark" aria-hidden="true">
                    {mark}
                  </span>
                )}
                <span className="hover-preview-copy">
                  {eyebrow && (
                    <span className="hover-preview-eyebrow">{eyebrow}</span>
                  )}
                  {title && (
                    <strong className="hover-preview-title">{title}</strong>
                  )}
                  {description && (
                    <span className="hover-preview-description">
                      {description}
                    </span>
                  )}
                </span>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
