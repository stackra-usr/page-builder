import type { SectionSettings } from "../types";
import clsx from "clsx";

/**
 * Wraps each block on the canvas with section-level settings:
 * layout mode (contained/full-width), background image, background overlay.
 */
export function SectionWrapper({
  section,
  children,
}: {
  section?: SectionSettings;
  children: React.ReactNode;
}) {
  if (!section) return <>{children}</>;

  const isFullWidth = section.layout === "full-width";

  return (
    <div
      className={clsx("relative", isFullWidth ? "w-full" : "max-w-6xl mx-auto")}
      style={{
        backgroundImage: section.bgImage
          ? `url(${section.bgImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      {section.bgOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: section.bgOverlay }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
