import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

import type { BlockInstance, DesignSettings } from "../types";
import { BlockRenderer } from "./BlockRenderer";

// ── Sortable Block Wrapper ──
function SortableBlock({
  block,
  design,
  isSelected,
  onDelete,
  onSelect,
}: {
  block: BlockInstance;
  design: DesignSettings;
  isSelected: boolean;
  onDelete: () => void;
  onSelect: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "relative group/block",
        isDragging && "z-50 opacity-40 scale-[0.98]",
      )}
      style={style}
    >
      {/* Drag handle + actions — left gutter */}
      <div
        className={clsx(
          "absolute -left-11 top-1/2 -translate-y-1/2 flex flex-col gap-1 transition-all duration-150",
          isSelected
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-1 group-hover/block:opacity-100 group-hover/block:translate-x-0",
        )}
      >
        <button
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white dark:bg-surface border border-separator/50 text-muted hover:text-foreground hover:border-[#634CF8]/30 cursor-grab active:cursor-grabbing shadow-sm transition-colors"
          title="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 16 16">
            <circle cx="5" cy="4" r="1.2" />
            <circle cx="11" cy="4" r="1.2" />
            <circle cx="5" cy="8" r="1.2" />
            <circle cx="11" cy="8" r="1.2" />
            <circle cx="5" cy="12" r="1.2" />
            <circle cx="11" cy="12" r="1.2" />
          </svg>
        </button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white dark:bg-surface border border-separator/50 text-muted hover:text-danger hover:border-danger/30 shadow-sm transition-colors"
          title="Delete block"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </button>
      </div>

      <BlockRenderer
        block={block}
        design={design}
        isSelected={isSelected}
        onClick={onSelect}
      />
    </div>
  );
}

// ── Drop Zone ──
function CanvasDropZone({
  id,
  isEmpty,
  isDragActive,
}: {
  id: string;
  isEmpty: boolean;
  isDragActive?: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  if (isEmpty) {
    return (
      <div
        ref={setNodeRef}
        className={clsx(
          "flex flex-col items-center justify-center gap-4 text-center rounded-2xl border-2 border-dashed transition-all duration-200 m-6",
          isOver
            ? "border-[#634CF8] bg-[#634CF8]/5 min-h-[300px]"
            : "border-separator/40 bg-transparent min-h-[400px]",
        )}
      >
        <div
          className={clsx(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors",
            isOver ? "bg-[#634CF8]/10" : "bg-surface",
          )}
        >
          <span className="text-3xl">{isOver ? "📥" : "🏗️"}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {isOver ? "Drop to add block" : "Start building your page"}
          </p>
          <p className="text-xs text-muted mt-1 max-w-[240px]">
            {isOver
              ? "Release to place the block here"
              : "Drag blocks from the left panel or pick a template to get started"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "transition-all duration-150 mx-4",
        isOver
          ? "h-14 rounded-lg border-2 border-dashed border-[#634CF8] bg-[#634CF8]/5 flex items-center justify-center my-1"
          : isDragActive
            ? "h-8 rounded border border-dashed border-separator/60 my-0.5"
            : "h-3",
      )}
    >
      {isOver && (
        <span className="text-[11px] font-semibold text-[#634CF8]">
          ← Drop here →
        </span>
      )}
    </div>
  );
}

// ── Canvas ──
export function Canvas({
  blocks,
  design,
  isDragActive,
  previewMode,
  selectedBlockId,
  onBlockSelect,
  onBlockDelete,
}: {
  blocks: BlockInstance[];
  design: DesignSettings;
  isDragActive?: boolean;
  previewMode: "desktop" | "tablet" | "mobile";
  selectedBlockId: string | null;
  onBlockSelect: (id: string | null) => void;
  onBlockDelete: (id: string) => void;
}) {
  // Make the entire canvas a droppable fallback
  const { setNodeRef: setCanvasRef } = useDroppable({
    id: "canvas-drop-empty",
  });

  const canvasWidth = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }[previewMode];

  // Typography font family mapping
  const fontFamily =
    {
      inter: "'Inter', system-ui, sans-serif",
      "plus-jakarta": "'Plus Jakarta Sans', sans-serif",
      "space-grotesk": "'Space Grotesk', sans-serif",
      poppins: "'Poppins', sans-serif",
      "dm-sans": "'DM Sans', sans-serif",
      sora: "'Sora', sans-serif",
    }[design.typography] || "system-ui, sans-serif";

  // The page preview should reflect the design mood, not the builder theme
  const pageMoodClass = design.mood === "dark" ? "dark" : "";

  // Background styles based on design settings
  const bgStyles: React.CSSProperties = {};
  if (design.backgroundTheme === "pattern") {
    const opacity = design.backgroundOpacity / 100;
    bgStyles.backgroundImage = `radial-gradient(circle, rgba(${parseInt(design.mainColor.slice(0, 2), 16)}, ${parseInt(design.mainColor.slice(2, 4), 16)}, ${parseInt(design.mainColor.slice(4, 6), 16)}, ${opacity * 0.15}) 1px, transparent 1px)`;
    bgStyles.backgroundSize = "20px 20px";
  } else if (design.backgroundTheme === "gradient") {
    const opacity = design.backgroundOpacity / 100;
    bgStyles.backgroundImage = `linear-gradient(135deg, rgba(${parseInt(design.mainColor.slice(0, 2), 16)}, ${parseInt(design.mainColor.slice(2, 4), 16)}, ${parseInt(design.mainColor.slice(4, 6), 16)}, ${opacity * 0.1}) 0%, transparent 50%, rgba(${parseInt(design.mainColor.slice(0, 2), 16)}, ${parseInt(design.mainColor.slice(2, 4), 16)}, ${parseInt(design.mainColor.slice(4, 6), 16)}, ${opacity * 0.05}) 100%)`;
  }

  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      onClick={() => onBlockSelect(null)}
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--separator) 0.5px, transparent 0.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Canvas width indicator */}
      {previewMode !== "desktop" && (
        <div className="text-center mb-2">
          <span className="text-[10px] font-mono text-muted bg-white dark:bg-surface rounded-full px-3 py-1 shadow-sm border border-separator/30">
            {previewMode === "tablet" ? "768px" : "375px"}
          </span>
        </div>
      )}

      <div
        ref={setCanvasRef}
        className={clsx(
          "mx-auto min-h-full overflow-hidden transition-all duration-300",
          pageMoodClass,
          design.mood === "dark"
            ? "bg-[#0f0f1a] text-white"
            : "bg-white text-[#1a1a2e]",
          previewMode === "desktop"
            ? "rounded-none shadow-none border-x border-separator/20"
            : "rounded-xl shadow-xl border border-separator/30",
        )}
        style={{ maxWidth: canvasWidth, fontFamily, ...bgStyles }}
      >
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 text-center min-h-[400px] m-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#634CF8]/10">
              <span className="text-3xl">🏗️</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Start building your page
              </p>
              <p className="text-xs text-muted mt-1 max-w-[240px]">
                Drag blocks from the left panel or pick a template to get
                started
              </p>
            </div>
          </div>
        ) : (
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="pl-14 pr-4 py-2 flex flex-col">
              {blocks.map((block, index) => (
                <div key={block.id}>
                  {index === 0 && (
                    <CanvasDropZone
                      id={`drop-before-${block.id}`}
                      isEmpty={false} isDragActive={isDragActive}
                    />
                  )}
                  <SortableBlock
                    block={block}
                    design={design}
                    isSelected={selectedBlockId === block.id}
                    onDelete={() => onBlockDelete(block.id)}
                    onSelect={() => onBlockSelect(block.id)}
                  />
                  <CanvasDropZone
                    id={`drop-after-${block.id}`}
                    isEmpty={false} isDragActive={isDragActive}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
