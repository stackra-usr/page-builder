import { Button } from "@heroui/react";

/**
 * Floating action bar that appears at the bottom when there are unsaved changes.
 */
export function FloatingBar({
  visible,
  onSave,
  onDiscard,
  onPreview,
}: {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onPreview: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 rounded-2xl bg-foreground/90 dark:bg-surface/95 backdrop-blur-xl shadow-2xl border border-white/10 px-5 py-2.5">
        <div className="flex items-center gap-2 mr-2">
          <div className="h-2 w-2 rounded-full bg-[#634CF8] animate-pulse" />
          <span className="text-[12px] font-medium text-background dark:text-foreground">
            Unsaved changes
          </span>
        </div>

        <button
          className="text-[12px] font-medium text-background/60 dark:text-muted hover:text-background dark:hover:text-foreground transition-colors px-2 py-1"
          onClick={onDiscard}
        >
          Discard
        </button>

        <button
          className="text-[12px] font-medium text-background/60 dark:text-muted hover:text-background dark:hover:text-foreground transition-colors px-2 py-1"
          onClick={onPreview}
        >
          Preview
        </button>

        <Button
          size="sm"
          style={{ backgroundColor: "#634CF8", color: "#fff" }}
          onPress={onSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
