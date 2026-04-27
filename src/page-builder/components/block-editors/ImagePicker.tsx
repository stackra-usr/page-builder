import { useState } from "react";

/**
 * Image URL picker with preview.
 * Shows the current image, allows URL input, and provides quick placeholder options.
 */
export function ImagePicker({
  value,
  label,
  onChange,
}: {
  value: string;
  label?: string;
  onChange: (url: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const placeholders = [
    { label: "AI 1", url: "https://img.heroui.chat/image/ai?w=800&h=400&u=1" },
    { label: "AI 2", url: "https://img.heroui.chat/image/ai?w=800&h=400&u=2" },
    { label: "AI 3", url: "https://img.heroui.chat/image/ai?w=800&h=400&u=3" },
    { label: "AI 4", url: "https://img.heroui.chat/image/ai?w=800&h=400&u=5" },
    { label: "AI 5", url: "https://img.heroui.chat/image/ai?w=800&h=400&u=10" },
    { label: "AI 6", url: "https://img.heroui.chat/image/ai?w=800&h=400&u=15" },
  ];

  return (
    <div>
      {label && (
        <label className="text-[11px] font-semibold text-muted block mb-1.5">
          {label}
        </label>
      )}

      {/* Preview */}
      {value && (
        <div className="relative rounded-lg overflow-hidden border border-separator/40 mb-2 group">
          <img alt="Preview" className="w-full h-24 object-cover" src={value} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button
              className="text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg px-3 py-1"
              onClick={() => setIsEditing(true)}
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* URL input */}
      {(isEditing || !value) && (
        <div className="flex flex-col gap-2">
          <input
            className="w-full h-8 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-3 text-[11px] text-foreground outline-none focus:border-[#634CF8]"
            placeholder="https://example.com/image.jpg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />

          {/* Quick placeholders */}
          <div>
            <p className="text-[9px] text-muted/60 mb-1">Quick picks:</p>
            <div className="grid grid-cols-3 gap-1">
              {placeholders.map((p) => (
                <button
                  className="h-10 rounded border border-separator/30 overflow-hidden hover:border-[#634CF8]/40 transition-colors"
                  key={p.label}
                  onClick={() => {
                    onChange(p.url);
                    setIsEditing(false);
                  }}
                >
                  <img
                    alt={p.label}
                    className="w-full h-full object-cover"
                    src={p.url}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
