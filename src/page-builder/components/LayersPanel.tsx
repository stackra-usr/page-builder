import clsx from "clsx";
import type { BlockInstance } from "../types";
import { BLOCK_DEFINITIONS } from "../data";

/**
 * Layers panel — tree view of all blocks with selection, visibility, and reorder.
 * Similar to Figma/Photoshop layers panel.
 */
export function LayersPanel({
  blocks,
  selectedBlockId,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
}: {
  blocks: BlockInstance[];
  selectedBlockId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
          Layers
        </p>
        <span className="text-[10px] text-muted/60 tabular-nums">
          {blocks.length} blocks
        </span>
      </div>

      {blocks.length === 0 && (
        <div className="rounded-lg bg-[#F8F8FA] dark:bg-surface p-4 text-center">
          <p className="text-[11px] text-muted">No blocks on this page</p>
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        {blocks.map((block, index) => {
          const def = BLOCK_DEFINITIONS.find((d) => d.type === block.type);
          const isSelected = selectedBlockId === block.id;
          const label = getBlockLabel(block);

          return (
            <div
              className={clsx(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-pointer transition-all group",
                isSelected
                  ? "bg-[#634CF8]/10 border border-[#634CF8]/30"
                  : "hover:bg-[#F5F5F5] dark:hover:bg-surface border border-transparent",
              )}
              key={block.id}
              onClick={() => onSelect(block.id)}
            >
              {/* Index */}
              <span className="text-[9px] text-muted/40 tabular-nums w-4 text-right shrink-0">
                {index + 1}
              </span>

              {/* Icon */}
              <span className="text-xs shrink-0">{def?.icon || "📦"}</span>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p
                  className={clsx(
                    "text-[11px] font-medium truncate",
                    isSelected ? "text-[#634CF8]" : "text-foreground",
                  )}
                >
                  {def?.label || block.type}
                </p>
                {label && (
                  <p className="text-[9px] text-muted/60 truncate">{label}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="h-5 w-5 flex items-center justify-center rounded text-[9px] text-muted hover:text-foreground hover:bg-white dark:hover:bg-background disabled:opacity-20"
                  disabled={index === 0}
                  title="Move up"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp(block.id);
                  }}
                >
                  ↑
                </button>
                <button
                  className="h-5 w-5 flex items-center justify-center rounded text-[9px] text-muted hover:text-foreground hover:bg-white dark:hover:bg-background disabled:opacity-20"
                  disabled={index === blocks.length - 1}
                  title="Move down"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown(block.id);
                  }}
                >
                  ↓
                </button>
                <button
                  className="h-5 w-5 flex items-center justify-center rounded text-[9px] text-muted hover:text-foreground hover:bg-white dark:hover:bg-background"
                  title="Duplicate"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(block.id);
                  }}
                >
                  ⧉
                </button>
                <button
                  className="h-5 w-5 flex items-center justify-center rounded text-[9px] text-danger hover:bg-danger/10"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(block.id);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Extract a human-readable label from block props */
function getBlockLabel(block: BlockInstance): string {
  const p = block.props;
  if (p.headline) return p.headline as string;
  if (p.title) return p.title as string;
  if (p.logo) return p.logo as string;
  if (p.text) return p.text as string;
  if (p.content) return (p.content as string).slice(0, 40);
  if (p.heading) return p.heading as string;
  if (p.copyright) return p.copyright as string;
  return "";
}
