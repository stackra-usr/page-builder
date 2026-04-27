import { useState } from "react";
import { Button, Slider } from "@heroui/react";
import clsx from "clsx";

import { ChevronUpIcon, ArrowLeftIcon } from "@/components/icons";

// Types
type SectionTitleType = "type1" | "type2";
type MoodType = "light" | "dark";
type BackgroundThemeType = "solid" | "pattern" | "gradient";
type TypographyType =
  | "mori"
  | "plus-jakarta"
  | "space-grotesk"
  | "poppins"
  | "gilroy"
  | "sora";
type RadiusType = "16" | "08" | "06" | "04" | "02" | "00";

interface PageBuilderState {
  sectionTitle: SectionTitleType;
  mood: MoodType;
  mainColor: string;
  backgroundTheme: BackgroundThemeType;
  backgroundOpacity: number;
  typography: TypographyType;
  radius: RadiusType;
}

// Collapsible Section
function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-separator/60 py-5">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[13px] font-semibold text-foreground tracking-wide">
          {title}
        </span>
        <ChevronUpIcon
          className={clsx(
            "h-3.5 w-3.5 text-muted transition-transform duration-200",
            !isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={clsx(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

// Selection Card
function SelectionCard({
  selected,
  children,
  label,
  className,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  label: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "flex flex-col items-center gap-2 rounded-xl border-2 p-2.5 transition-all cursor-pointer",
        selected
          ? "border-[#634CF8] bg-[#634CF8]/5"
          : "border-separator/70 bg-background hover:border-muted",
        className,
      )}
      onClick={onClick}
    >
      {children}
      <span className="flex items-center gap-1.5 text-[11px]">
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#634CF8]" />}
        <span
          className={clsx(
            selected ? "text-[#634CF8] font-semibold" : "text-muted",
          )}
        >
          {label}
        </span>
      </span>
    </button>
  );
}

export default function PageBuilderPage() {
  const [state, setState] = useState<PageBuilderState>({
    sectionTitle: "type1",
    mood: "dark",
    mainColor: "634CF8",
    backgroundTheme: "solid",
    backgroundOpacity: 15,
    typography: "mori",
    radius: "16",
  });

  const updateState = <K extends keyof PageBuilderState>(
    key: K,
    value: PageBuilderState[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background">
      {/* Top Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-separator/50 bg-white/80 dark:bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
          <span className="text-sm font-semibold text-foreground">
            Page Builder
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="tertiary">
              Preview
            </Button>
            <Button size="sm" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </nav>

      {/* Two-Panel Layout */}
      <div className="mx-auto flex max-w-[1400px]">
        {/* ── Left Panel ── */}
        <aside className="w-[440px] shrink-0 border-r border-separator/50 bg-white dark:bg-background">
          <div className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto px-8 py-6">
            {/* Back + Header */}
            <div className="mb-4">
              <button className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl border border-separator/70 bg-white dark:bg-surface transition-colors hover:bg-[#F5F5F5] dark:hover:bg-surface/80">
                <ArrowLeftIcon className="h-4 w-4 text-muted" />
              </button>
              <h1 className="text-[26px] font-bold text-foreground leading-tight">
                Design
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Differentiate the visual features of your payment page according
                to your brand identity.
              </p>
            </div>

            {/* Section Titles */}
            <CollapsibleSection title="Section Titles">
              <div className="flex gap-3">
                <SelectionCard
                  label="Type 1"
                  selected={state.sectionTitle === "type1"}
                  onClick={() => updateState("sectionTitle", "type1")}
                >
                  <div className="flex h-[52px] w-[60px] flex-col items-start justify-center rounded-lg bg-[#F7F7F8] dark:bg-surface p-2.5">
                    <div className="text-[10px] font-bold text-foreground">
                      Title
                    </div>
                    <div className="mt-1.5 h-[1px] w-7 bg-muted/30" />
                  </div>
                </SelectionCard>
                <SelectionCard
                  label="Type 2"
                  selected={state.sectionTitle === "type2"}
                  onClick={() => updateState("sectionTitle", "type2")}
                >
                  <div className="flex h-[52px] w-[60px] flex-col items-start justify-center rounded-lg bg-[#F7F7F8] dark:bg-surface p-2.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-medium text-muted/60">
                        |
                      </span>
                      <span className="text-[10px] font-bold text-foreground">
                        Title
                      </span>
                    </div>
                    <div className="mt-1.5 h-[1px] w-7 bg-muted/30" />
                  </div>
                </SelectionCard>
              </div>
            </CollapsibleSection>

            {/* Mood */}
            <CollapsibleSection title="Mood">
              <div className="flex gap-3">
                <SelectionCard
                  label="Light"
                  selected={state.mood === "light"}
                  onClick={() => updateState("mood", "light")}
                >
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-white border border-separator/60">
                    <svg
                      className="h-5 w-5 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      />
                    </svg>
                  </div>
                </SelectionCard>
                <SelectionCard
                  label="Dark"
                  selected={state.mood === "dark"}
                  onClick={() => updateState("mood", "dark")}
                >
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#1A1A2E]">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  </div>
                </SelectionCard>
              </div>
            </CollapsibleSection>

            {/* Main Color */}
            <CollapsibleSection title="Main Color">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    aria-label="Main color hex code"
                    className="h-10 w-full rounded-xl border border-separator/70 bg-white dark:bg-surface px-3 text-sm font-mono text-foreground outline-none transition-colors focus:border-[#634CF8] focus:ring-1 focus:ring-[#634CF8]/20"
                    value={state.mainColor}
                    onChange={(e) => updateState("mainColor", e.target.value)}
                  />
                </div>
                <div
                  className="h-10 w-10 shrink-0 rounded-xl shadow-sm"
                  style={{ backgroundColor: `#${state.mainColor}` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted">
                Enter the hex code of your brand color.
              </p>
            </CollapsibleSection>

            {/* Background Theme */}
            <CollapsibleSection title="Background Theme">
              <div className="flex gap-3">
                <SelectionCard
                  label="Solid"
                  selected={state.backgroundTheme === "solid"}
                  onClick={() => updateState("backgroundTheme", "solid")}
                >
                  <div className="h-[52px] w-[60px] rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800" />
                </SelectionCard>
                <SelectionCard
                  label="Pattern"
                  selected={state.backgroundTheme === "pattern"}
                  onClick={() => updateState("backgroundTheme", "pattern")}
                >
                  <div className="h-[52px] w-[60px] rounded-lg bg-[#F7F7F8] dark:bg-surface overflow-hidden relative">
                    <svg
                      className="absolute inset-0 h-full w-full opacity-20"
                      viewBox="0 0 60 52"
                    >
                      <pattern
                        height="6"
                        id="dots-l"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        x="0"
                        y="0"
                      >
                        <circle cx="3" cy="3" fill="currentColor" r="0.8" />
                      </pattern>
                      <rect fill="url(#dots-l)" height="52" width="60" />
                    </svg>
                  </div>
                </SelectionCard>
                <SelectionCard
                  label="Gradient"
                  selected={state.backgroundTheme === "gradient"}
                  onClick={() => updateState("backgroundTheme", "gradient")}
                >
                  <div className="h-[52px] w-[60px] rounded-lg bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:from-purple-900/40 dark:via-gray-800 dark:to-blue-900/40" />
                </SelectionCard>
              </div>

              {/* Opacity Slider */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1">
                  <Slider
                    aria-label="Background opacity"
                    maxValue={100}
                    minValue={0}
                    value={state.backgroundOpacity}
                    onChange={(val) =>
                      updateState("backgroundOpacity", val as number)
                    }
                  >
                    <Slider.Track>
                      <Slider.Fill />
                      <Slider.Thumb />
                    </Slider.Track>
                  </Slider>
                </div>
                <div className="flex h-9 w-14 items-center justify-center rounded-lg border border-separator/70 bg-white dark:bg-surface text-xs font-medium text-foreground tabular-nums">
                  %{state.backgroundOpacity}
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </aside>

        {/* ── Right Panel ── */}
        <main className="flex-1 bg-[#FAFAFA] dark:bg-background">
          <div className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto p-8 max-w-[680px]">
            {/* Typographies */}
            <CollapsibleSection title="Typographies">
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    {
                      id: "mori",
                      label: "Mori",
                      family: "'PP Mori', sans-serif",
                    },
                    {
                      id: "plus-jakarta",
                      label: "Plus Jakarta",
                      family: "'Plus Jakarta Sans', sans-serif",
                    },
                    {
                      id: "space-grotesk",
                      label: "Space Gr...",
                      family: "'Space Grotesk', sans-serif",
                    },
                    {
                      id: "poppins",
                      label: "Poppins",
                      family: "'Poppins', sans-serif",
                    },
                    {
                      id: "gilroy",
                      label: "Gilroy",
                      family: "'Gilroy', sans-serif",
                    },
                    { id: "sora", label: "Sora", family: "'Sora', sans-serif" },
                  ] as const
                ).map((font) => (
                  <SelectionCard
                    className="flex-1"
                    key={font.id}
                    label={font.label}
                    selected={state.typography === font.id}
                    onClick={() => updateState("typography", font.id)}
                  >
                    <div className="flex h-16 w-full items-center justify-center rounded-lg bg-[#F7F7F8] dark:bg-surface">
                      <span
                        className="text-[28px] font-bold text-foreground"
                        style={{ fontFamily: font.family }}
                      >
                        Aa
                      </span>
                    </div>
                  </SelectionCard>
                ))}
              </div>
            </CollapsibleSection>

            {/* Radius */}
            <CollapsibleSection title="Radius">
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { id: "16", label: "16" },
                    { id: "08", label: "08" },
                    { id: "06", label: "06" },
                    { id: "04", label: "04" },
                    { id: "02", label: "02" },
                    { id: "00", label: "00 - Sharp" },
                  ] as const
                ).map((r) => (
                  <SelectionCard
                    className="flex-1"
                    key={r.id}
                    label={r.label}
                    selected={state.radius === r.id}
                    onClick={() => updateState("radius", r.id)}
                  >
                    <div
                      className="h-16 w-full border-2 border-separator/50 bg-[#F7F7F8] dark:bg-surface"
                      style={{ borderRadius: `${parseInt(r.id)}px` }}
                    />
                  </SelectionCard>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </main>
      </div>
    </div>
  );
}
