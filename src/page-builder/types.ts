// ── Block Types (page sections you drag to build) ──
export type BlockType =
  | "navbar"
  | "hero"
  | "features"
  | "content"
  | "testimonials"
  | "pricing"
  | "stats"
  | "team"
  | "faq"
  | "gallery"
  | "cta"
  | "contact"
  | "logos"
  | "banner"
  | "footer"
  // Primitives
  | "text"
  | "image"
  | "video"
  | "button-group"
  | "columns"
  | "spacer"
  | "divider"
  | "code"
  | "html";

export type BlockCategory = "sections" | "content" | "layout" | "media";

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: string;
  category: BlockCategory;
  description: string;
  /** Default props when a new instance is created */
  defaultProps: Record<string, unknown>;
}

export interface BlockInstance {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

// ── Animation Presets ──
export type AnimationPreset =
  | "none"
  | "fade-in"
  | "fade-up"
  | "fade-down"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "zoom-out"
  | "bounce";

// ── Section Settings (per-block layout/background) ──
export interface SectionSettings {
  layout: "contained" | "full-width";
  bgImage: string;
  bgOverlay: string;
}

// ── Form Action (for contact blocks) ──
export interface FormAction {
  method: "email" | "webhook" | "localStorage";
  email?: string;
  webhookUrl?: string;
}

// ── Component Types (UI elements inside blocks — curated for page builders) ──
export type ComponentType =
  | "Button"
  | "Card"
  | "Avatar"
  | "Badge"
  | "Chip"
  | "Input"
  | "TextField"
  | "TextArea"
  | "Select"
  | "Checkbox"
  | "Switch"
  | "RadioGroup"
  | "Slider"
  | "Accordion"
  | "Tabs"
  | "Table"
  | "Link"
  | "Separator"
  | "Tooltip"
  | "Popover";

export type ComponentCategory = "actions" | "forms" | "display" | "navigation";

export interface ComponentDefinition {
  type: ComponentType;
  label: string;
  icon: string;
  category: ComponentCategory;
  description: string;
}

// ── Design Settings ──
export type MoodType = "light" | "dark";
export type BackgroundThemeType = "solid" | "pattern" | "gradient";
export type TypographyType =
  | "inter"
  | "plus-jakarta"
  | "space-grotesk"
  | "poppins"
  | "dm-sans"
  | "sora";
export type RadiusType =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface DesignSettings {
  mood: MoodType;
  mainColor: string;
  backgroundTheme: BackgroundThemeType;
  backgroundOpacity: number;
  typography: TypographyType;
  radius: RadiusType;
}

// ── Template ──
export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: "landing" | "portfolio" | "business" | "saas";
  blocks: BlockInstance[];
  design: DesignSettings;
}

// ── Builder State ──
export type SidebarPanel =
  | "blocks"
  | "components"
  | "design"
  | "templates"
  | "pages"
  | "menus";

export interface BuilderState {
  blocks: BlockInstance[];
  design: DesignSettings;
  selectedBlockId: string | null;
  sidebarPanel: SidebarPanel;
  isDrawerOpen: boolean;
  previewMode: "desktop" | "tablet" | "mobile";
}
