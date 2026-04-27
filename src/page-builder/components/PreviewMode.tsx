import { Button } from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";

import type { BlockInstance, DesignSettings } from "../types";
import { BlockRenderer } from "./BlockRenderer";

const FONT_FAMILIES: Record<string, string> = {
  inter: "'Inter', system-ui, sans-serif",
  "plus-jakarta": "'Plus Jakarta Sans', sans-serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "dm-sans": "'DM Sans', sans-serif",
  sora: "'Sora', sans-serif",
};

/**
 * Full-screen preview mode — shows the page without any builder chrome.
 * Press Escape or click the floating close button to exit.
 */
export function PreviewMode({
  blocks,
  design,
  onClose,
}: {
  blocks: BlockInstance[];
  design: DesignSettings;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const fontFamily =
    FONT_FAMILIES[design.typography] || "system-ui, sans-serif";
  const canvasWidth = { desktop: "100%", tablet: "768px", mobile: "375px" }[
    device
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F0F0F3] dark:bg-[#0a0a0a]">
      {/* Floating toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl bg-foreground/90 dark:bg-surface/95 backdrop-blur-xl shadow-2xl border border-white/10 px-4 py-2">
        {/* Device switcher */}
        <div className="flex items-center gap-0.5 rounded-lg bg-white/10 p-0.5">
          {(["desktop", "tablet", "mobile"] as const).map((d) => (
            <button
              className={clsx(
                "flex h-7 w-8 items-center justify-center rounded-md transition-all text-xs",
                device === d
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80",
              )}
              key={d}
              onClick={() => setDevice(d)}
            >
              {d === "desktop" ? "🖥" : d === "tablet" ? "📱" : "📲"}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-white/20" />

        <span className="text-[11px] text-white/60 font-medium">
          Preview Mode
        </span>

        <div className="w-px h-5 bg-white/20" />

        <Button
          size="sm"
          style={{ backgroundColor: "#634CF8", color: "#fff" }}
          onPress={onClose}
        >
          ← Back to Editor
        </Button>
      </div>

      {/* Page preview */}
      <div className="flex-1 overflow-y-auto pt-16 pb-8 px-4">
        <div
          className={clsx(
            "mx-auto overflow-hidden transition-all duration-300",
            design.mood === "dark"
              ? "bg-[#0f0f1a] text-white"
              : "bg-white text-[#1a1a2e]",
            device === "desktop"
              ? "rounded-none shadow-none"
              : "rounded-xl shadow-2xl border border-separator/30",
          )}
          style={{ maxWidth: canvasWidth, fontFamily }}
        >
          {blocks.map((block) => (
            <BlockRenderer
              block={block}
              design={design}
              isSelected={false}
              key={block.id}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="text-[10px] text-muted bg-white/80 dark:bg-surface/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          Press <kbd className="font-mono font-semibold">Esc</kbd> to exit
          preview
        </span>
      </div>
    </div>
  );
}
