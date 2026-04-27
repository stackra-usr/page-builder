import { useState, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { BLOCK_DEFINITIONS } from "../data";
import type { BlockDefinition } from "../types";

/**
 * Block search/filter with instant results.
 * Shows matching blocks from all categories.
 */
export function BlockSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return BLOCK_DEFINITIONS.filter(
      (b) =>
        b.label.toLowerCase().includes(q) ||
        b.type.includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.includes(q),
    );
  }, [query]);

  return (
    <div className="mb-3">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <input
          className="w-full h-9 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface pl-9 pr-3 text-[12px] text-foreground outline-none focus:border-[#634CF8] placeholder:text-muted/50"
          placeholder="Search blocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted hover:text-foreground"
            onClick={() => setQuery("")}
          >
            ✕
          </button>
        )}
      </div>

      {query && results.length > 0 && (
        <div className="mt-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
          <p className="text-[9px] text-muted/60 px-1">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
          {results.map((block) => (
            <SearchResultItem block={block} key={block.type} />
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="mt-2 rounded-lg bg-[#F8F8FA] dark:bg-surface p-3 text-center">
          <p className="text-[11px] text-muted">No blocks match "{query}"</p>
        </div>
      )}
    </div>
  );
}

function SearchResultItem({ block }: { block: BlockDefinition }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `search-block-${block.type}`,
    data: { type: "sidebar-block", blockType: block.type },
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "flex items-center gap-2.5 rounded-lg border border-separator/30 bg-white dark:bg-surface px-3 py-2 cursor-grab active:cursor-grabbing select-none transition-all",
        isDragging
          ? "opacity-50 border-[#634CF8]"
          : "hover:border-[#634CF8]/30",
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-sm">{block.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-foreground">{block.label}</p>
        <p className="text-[9px] text-muted truncate">{block.description}</p>
      </div>
      <span className="text-[8px] text-muted/50 uppercase">
        {block.category}
      </span>
    </div>
  );
}
