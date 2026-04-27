import { useRef, useState, useCallback, useEffect } from "react";
import clsx from "clsx";

/**
 * Inline editable text component.
 * Double-click to edit, blur/Escape/Enter to commit.
 */
export function InlineEditable({
  value,
  field,
  blockId,
  multiline,
  className,
  as: Tag = "span",
  onSave,
}: {
  value: string;
  field: string;
  blockId: string;
  multiline?: boolean;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  onSave: (blockId: string, field: string, value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const originalValue = useRef(value);

  const startEditing = useCallback(() => {
    originalValue.current = value;
    setIsEditing(true);
  }, [value]);

  const commitEdit = useCallback(() => {
    if (!ref.current) return;
    const newValue = ref.current.textContent || "";
    setIsEditing(false);
    if (newValue !== originalValue.current) {
      onSave(blockId, field, newValue);
    }
  }, [blockId, field, onSave]);

  const cancelEdit = useCallback(() => {
    if (ref.current) {
      ref.current.textContent = originalValue.current;
    }
    setIsEditing(false);
  }, []);

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      // Place cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
      }
      if (e.key === "Enter" && !multiline) {
        e.preventDefault();
        commitEdit();
      }
    },
    [multiline, commitEdit, cancelEdit],
  );

  return (
    <Tag
      ref={ref as any}
      className={clsx(
        className,
        isEditing &&
          "outline-none ring-1 ring-[#634CF8]/30 bg-[#634CF8]/5 rounded px-1 -mx-1",
        !isEditing && "cursor-text",
      )}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onBlur={isEditing ? commitEdit : undefined}
      onDoubleClick={(e) => {
        e.stopPropagation();
        startEditing();
      }}
      onKeyDown={isEditing ? handleKeyDown : undefined}
    >
      {value}
    </Tag>
  );
}
