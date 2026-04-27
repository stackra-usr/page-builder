import clsx from "clsx";

export interface BlockStyles {
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  fullWidth?: boolean;
  cssClass?: string;
  animation?:
    | "none"
    | "fade-in"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "zoom-in"
    | "bounce";
  animationDelay?: number;
}

/**
 * Per-block style overrides — padding, margin, background, animation, CSS class.
 */
export function BlockStyleEditor({
  styles,
  onChange,
}: {
  styles: BlockStyles;
  onChange: (styles: BlockStyles) => void;
}) {
  const update = (key: keyof BlockStyles, value: unknown) => {
    onChange({ ...styles, [key]: value });
  };

  return (
    <div className="flex flex-col gap-3 border-t border-separator/40 pt-3 mt-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60">
        Style Overrides
      </p>

      {/* Spacing — visual box model */}
      <div>
        <label className="text-[10px] font-semibold text-muted block mb-2">
          Spacing
        </label>
        <div className="relative bg-[#F8F8FA] dark:bg-surface rounded-lg p-3">
          {/* Margin label */}
          <p className="text-[8px] text-muted/50 absolute top-1 left-2">
            margin
          </p>

          {/* Margin inputs */}
          <div className="flex flex-col items-center gap-1">
            <SpacingInput
              placeholder="0"
              value={styles.marginTop}
              onChange={(v) => update("marginTop", v)}
            />
            <div className="flex items-center gap-1 w-full">
              <SpacingInput
                className="w-12"
                placeholder="0"
                value={styles.marginBottom}
                onChange={(v) => update("marginBottom", v)}
              />

              {/* Padding box */}
              <div className="flex-1 bg-[#634CF8]/5 border border-[#634CF8]/20 rounded-md p-2">
                <p className="text-[8px] text-[#634CF8]/50 mb-1">padding</p>
                <div className="flex flex-col items-center gap-1">
                  <SpacingInput
                    accent
                    placeholder="0"
                    value={styles.paddingTop}
                    onChange={(v) => update("paddingTop", v)}
                  />
                  <div className="flex items-center gap-1 w-full">
                    <SpacingInput
                      accent
                      className="w-10"
                      placeholder="0"
                      value={styles.paddingLeft}
                      onChange={(v) => update("paddingLeft", v)}
                    />
                    <div className="flex-1 h-6 rounded bg-white dark:bg-background border border-separator/30" />
                    <SpacingInput
                      accent
                      className="w-10"
                      placeholder="0"
                      value={styles.paddingRight}
                      onChange={(v) => update("paddingRight", v)}
                    />
                  </div>
                  <SpacingInput
                    accent
                    placeholder="0"
                    value={styles.paddingBottom}
                    onChange={(v) => update("paddingBottom", v)}
                  />
                </div>
              </div>

              <SpacingInput
                className="w-12"
                placeholder="0"
                value={styles.marginBottom}
                onChange={(v) => update("marginBottom", v)}
              />
            </div>
            <SpacingInput
              placeholder="0"
              value={styles.marginBottom}
              onChange={(v) => update("marginBottom", v)}
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <div>
        <label className="text-[10px] font-semibold text-muted block mb-1.5">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 h-8 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-2 text-[11px] font-mono outline-none focus:border-[#634CF8]"
            placeholder="transparent"
            value={styles.backgroundColor || ""}
            onChange={(e) => update("backgroundColor", e.target.value)}
          />
          <div className="relative">
            <div
              className="h-8 w-8 rounded-lg border border-separator/40"
              style={{
                backgroundColor: styles.backgroundColor || "transparent",
              }}
            />
            <input
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="color"
              value={styles.backgroundColor || "#ffffff"}
              onChange={(e) => update("backgroundColor", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Full Width */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-semibold text-muted">
          Full Width
        </label>
        <button
          className={clsx(
            "relative h-5 w-9 rounded-full transition-colors",
            styles.fullWidth ? "bg-[#634CF8]" : "bg-muted/20",
          )}
          onClick={() => update("fullWidth", !styles.fullWidth)}
        >
          <div
            className={clsx(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
              styles.fullWidth ? "translate-x-4" : "translate-x-0.5",
            )}
          />
        </button>
      </div>

      {/* Animation */}
      <div>
        <label className="text-[10px] font-semibold text-muted block mb-1.5">
          Animation
        </label>
        <select
          className="w-full h-8 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-2 text-[11px] outline-none focus:border-[#634CF8]"
          value={styles.animation || "none"}
          onChange={(e) => update("animation", e.target.value)}
        >
          <option value="none">None</option>
          <option value="fade-in">Fade In</option>
          <option value="slide-up">Slide Up</option>
          <option value="slide-left">Slide from Left</option>
          <option value="slide-right">Slide from Right</option>
          <option value="zoom-in">Zoom In</option>
          <option value="bounce">Bounce</option>
        </select>
        {styles.animation && styles.animation !== "none" && (
          <div className="mt-2">
            <label className="text-[9px] text-muted block mb-1">
              Delay (ms)
            </label>
            <input
              className="w-full h-7 rounded border border-separator/40 bg-[#FAFAFA] dark:bg-surface px-2 text-[10px] outline-none"
              max={2000}
              min={0}
              step={100}
              type="number"
              value={styles.animationDelay || 0}
              onChange={(e) =>
                update("animationDelay", parseInt(e.target.value) || 0)
              }
            />
          </div>
        )}
      </div>

      {/* CSS Class */}
      <div>
        <label className="text-[10px] font-semibold text-muted block mb-1.5">
          CSS Class
        </label>
        <input
          className="w-full h-8 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-2 text-[11px] font-mono outline-none focus:border-[#634CF8]"
          placeholder="custom-class"
          value={styles.cssClass || ""}
          onChange={(e) => update("cssClass", e.target.value)}
        />
      </div>
    </div>
  );
}

function SpacingInput({
  value,
  placeholder,
  accent,
  className,
  onChange,
}: {
  value?: number;
  placeholder: string;
  accent?: boolean;
  className?: string;
  onChange: (v: number) => void;
}) {
  return (
    <input
      className={clsx(
        "h-6 w-10 rounded text-center text-[10px] font-mono outline-none border",
        accent
          ? "border-[#634CF8]/20 bg-white dark:bg-background text-[#634CF8] focus:border-[#634CF8]"
          : "border-separator/30 bg-white dark:bg-background text-foreground focus:border-[#634CF8]",
        className,
      )}
      placeholder={placeholder}
      type="number"
      value={value || ""}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
    />
  );
}
