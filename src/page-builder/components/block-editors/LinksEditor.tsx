/**
 * Simple string list editor for navigation links, tags, etc.
 */
export function LinksEditor({
  items,
  label,
  addLabel,
  onChange,
}: {
  items: string[];
  label: string;
  addLabel?: string;
  onChange: (items: string[]) => void;
}) {
  const addItem = () => onChange([...items, ""]);

  const removeItem = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  const updateItem = (index: number, value: string) => {
    onChange(items.map((item, i) => (i === index ? value : item)));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] font-semibold text-muted">{label}</label>
        <span className="text-[10px] text-muted/60">{items.length}</span>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        {items.map((item, index) => (
          <div className="flex items-center gap-1" key={index}>
            <input
              className="flex-1 h-7 rounded border border-separator/40 bg-[#FAFAFA] dark:bg-surface px-2 text-[11px] text-foreground outline-none focus:border-[#634CF8]"
              placeholder={`Link ${index + 1}`}
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
            />
            <button
              className="text-[10px] text-muted hover:text-foreground px-0.5 disabled:opacity-30"
              disabled={index === 0}
              onClick={() => moveItem(index, -1)}
            >
              ↑
            </button>
            <button
              className="text-[10px] text-muted hover:text-foreground px-0.5 disabled:opacity-30"
              disabled={index === items.length - 1}
              onClick={() => moveItem(index, 1)}
            >
              ↓
            </button>
            <button
              className="text-[10px] text-danger hover:text-danger/80 px-0.5"
              onClick={() => removeItem(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        className="w-full h-7 rounded-lg border-2 border-dashed border-separator/50 text-[10px] font-medium text-muted hover:text-[#634CF8] hover:border-[#634CF8]/30 transition-colors"
        onClick={addItem}
      >
        + {addLabel || "Add link"}
      </button>
    </div>
  );
}
