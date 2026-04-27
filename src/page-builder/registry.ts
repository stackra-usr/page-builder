/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * HeroUI Component Registry
 * Scanned from:
 *   - .docs/heroui-3/packages/react/src/components/ (82 dirs → 70 public)
 *   - .docs/heroui-native-main/src/components/       (40 dirs → 38 public)
 *   - .docs/heroui-3/packages/styles/components/      (CSS files)
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ── Component Category ──
export type ComponentCategory =
  | "layout"
  | "navigation"
  | "data-display"
  | "data-entry"
  | "feedback"
  | "overlay"
  | "typography"
  | "media"
  | "utility";

// ── Platform ──
export type Platform = "react" | "native" | "both";

// ── Component Variant ──
export interface ComponentVariant {
  name: string;
  values: string[];
}

// ── Component Definition ──
export interface ComponentDef {
  /** PascalCase import name */
  name: string;
  /** kebab-case CSS class root */
  cssClass: string;
  /** Human-readable label */
  label: string;
  /** Category for sidebar grouping */
  category: ComponentCategory;
  /** Available on which platform */
  platform: Platform;
  /** Emoji icon for sidebar */
  icon: string;
  /** Short description */
  description: string;
  /** Known variants from source */
  variants?: ComponentVariant[];
  /** Sub-components (compound pattern) */
  subComponents?: string[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// FULL COMPONENT REGISTRY
// ═══════════════════════════════════════════════════════════════════════════════

export const COMPONENT_REGISTRY: ComponentDef[] = [
  // ── Layout ──
  {
    name: "Card",
    cssClass: "card",
    label: "Card",
    category: "layout",
    platform: "both",
    icon: "🃏",
    description: "Flexible container for grouping related content",
    variants: [
      {
        name: "variant",
        values: ["transparent", "default", "secondary", "tertiary"],
      },
    ],
    subComponents: [
      "Card.Header",
      "Card.Title",
      "Card.Description",
      "Card.Content",
      "Card.Footer",
    ],
  },
  {
    name: "Surface",
    cssClass: "surface",
    label: "Surface",
    category: "layout",
    platform: "both",
    icon: "📐",
    description: "Base container surface component",
    variants: [
      { name: "variant", values: ["default", "secondary", "tertiary"] },
    ],
  },
  {
    name: "Separator",
    cssClass: "separator",
    label: "Separator",
    category: "layout",
    platform: "both",
    icon: "➖",
    description: "Visual divider between content sections",
  },
  {
    name: "Fieldset",
    cssClass: "fieldset",
    label: "Fieldset",
    category: "layout",
    platform: "react",
    icon: "📦",
    description: "Groups related form fields with a legend",
  },
  {
    name: "Toolbar",
    cssClass: "toolbar",
    label: "Toolbar",
    category: "layout",
    platform: "react",
    icon: "🔧",
    description: "Container for grouping action buttons",
  },
  {
    name: "ScrollShadow",
    cssClass: "scroll-shadow",
    label: "Scroll Shadow",
    category: "layout",
    platform: "both",
    icon: "📜",
    description: "Adds shadow indicators to scrollable areas",
  },

  // ── Navigation ──
  {
    name: "Tabs",
    cssClass: "tabs",
    label: "Tabs",
    category: "navigation",
    platform: "both",
    icon: "📑",
    description: "Organize content into switchable panels",
    variants: [
      { name: "variant", values: ["primary", "secondary"] },
      { name: "orientation", values: ["horizontal", "vertical"] },
    ],
    subComponents: [
      "Tabs.ListContainer",
      "Tabs.List",
      "Tabs.Tab",
      "Tabs.Panel",
      "Tabs.Indicator",
      "Tabs.Separator",
    ],
  },
  {
    name: "Breadcrumbs",
    cssClass: "breadcrumbs",
    label: "Breadcrumbs",
    category: "navigation",
    platform: "react",
    icon: "🔗",
    description: "Shows the user's location in a hierarchy",
  },
  {
    name: "Pagination",
    cssClass: "pagination",
    label: "Pagination",
    category: "navigation",
    platform: "react",
    icon: "📄",
    description: "Navigate between pages of content",
  },
  {
    name: "Link",
    cssClass: "link",
    label: "Link",
    category: "navigation",
    platform: "react",
    icon: "🔗",
    description: "Navigational text link",
  },
  {
    name: "LinkButton",
    cssClass: "link-button",
    label: "Link Button",
    category: "navigation",
    platform: "native",
    icon: "🔗",
    description: "Button-styled navigation link (Native)",
  },

  // ── Data Display ──
  {
    name: "Avatar",
    cssClass: "avatar",
    label: "Avatar",
    category: "data-display",
    platform: "both",
    icon: "👤",
    description: "Display user profile images or initials",
    subComponents: ["Avatar.Image", "Avatar.Fallback"],
  },
  {
    name: "Badge",
    cssClass: "badge",
    label: "Badge",
    category: "data-display",
    platform: "react",
    icon: "🏷️",
    description: "Small count or status indicator",
  },
  {
    name: "Chip",
    cssClass: "chip",
    label: "Chip",
    category: "data-display",
    platform: "both",
    icon: "🏷️",
    description: "Compact element for tags or attributes",
    subComponents: ["Chip.Label"],
  },
  {
    name: "Kbd",
    cssClass: "kbd",
    label: "Keyboard Key",
    category: "data-display",
    platform: "react",
    icon: "⌨️",
    description: "Display keyboard shortcuts",
    subComponents: ["Kbd.Abbr", "Kbd.Content"],
  },
  {
    name: "Table",
    cssClass: "table",
    label: "Table",
    category: "data-display",
    platform: "react",
    icon: "📊",
    description: "Display data in rows and columns",
  },
  {
    name: "ListBox",
    cssClass: "list-box",
    label: "List Box",
    category: "data-display",
    platform: "react",
    icon: "📋",
    description: "Selectable list of options",
  },
  {
    name: "ListGroup",
    cssClass: "list-group",
    label: "List Group",
    category: "data-display",
    platform: "native",
    icon: "📋",
    description: "Grouped list items (Native)",
  },
  {
    name: "TagGroup",
    cssClass: "tag-group",
    label: "Tag Group",
    category: "data-display",
    platform: "both",
    icon: "🏷️",
    description: "Group of removable tags",
  },
  {
    name: "Accordion",
    cssClass: "accordion",
    label: "Accordion",
    category: "data-display",
    platform: "both",
    icon: "📂",
    description: "Collapsible content panels",
    variants: [{ name: "variant", values: ["default", "surface"] }],
    subComponents: [
      "Accordion.Item",
      "Accordion.Heading",
      "Accordion.Trigger",
      "Accordion.Panel",
      "Accordion.Body",
      "Accordion.Indicator",
    ],
  },
  {
    name: "Disclosure",
    cssClass: "disclosure",
    label: "Disclosure",
    category: "data-display",
    platform: "react",
    icon: "📂",
    description: "Single collapsible content section",
  },
  {
    name: "DisclosureGroup",
    cssClass: "disclosure-group",
    label: "Disclosure Group",
    category: "data-display",
    platform: "react",
    icon: "📂",
    description: "Group of collapsible sections",
  },
  {
    name: "Skeleton",
    cssClass: "skeleton",
    label: "Skeleton",
    category: "data-display",
    platform: "both",
    icon: "💀",
    description: "Loading placeholder animation",
  },

  // ── Data Entry / Forms ──
  {
    name: "Button",
    cssClass: "button",
    label: "Button",
    category: "data-entry",
    platform: "both",
    icon: "🔘",
    description: "Trigger actions and events",
    variants: [
      {
        name: "variant",
        values: ["primary", "secondary", "tertiary", "danger"],
      },
      { name: "size", values: ["sm", "md", "lg"] },
    ],
  },
  {
    name: "ButtonGroup",
    cssClass: "button-group",
    label: "Button Group",
    category: "data-entry",
    platform: "react",
    icon: "🔘",
    description: "Group related buttons together",
  },
  {
    name: "ToggleButton",
    cssClass: "toggle-button",
    label: "Toggle Button",
    category: "data-entry",
    platform: "react",
    icon: "🔀",
    description: "Button with on/off state",
  },
  {
    name: "ToggleButtonGroup",
    cssClass: "toggle-button-group",
    label: "Toggle Button Group",
    category: "data-entry",
    platform: "react",
    icon: "🔀",
    description: "Group of toggle buttons",
  },
  {
    name: "TextField",
    cssClass: "textfield",
    label: "Text Field",
    category: "data-entry",
    platform: "both",
    icon: "📝",
    description: "Single-line text input with label",
  },
  {
    name: "TextArea",
    cssClass: "textarea",
    label: "Text Area",
    category: "data-entry",
    platform: "both",
    icon: "📝",
    description: "Multi-line text input",
  },
  {
    name: "Input",
    cssClass: "input",
    label: "Input",
    category: "data-entry",
    platform: "both",
    icon: "📝",
    description: "Base input element",
    variants: [{ name: "variant", values: ["default", "secondary"] }],
  },
  {
    name: "InputGroup",
    cssClass: "input-group",
    label: "Input Group",
    category: "data-entry",
    platform: "both",
    icon: "📝",
    description: "Input with prefix/suffix addons",
    subComponents: [
      "InputGroup.Prefix",
      "InputGroup.Input",
      "InputGroup.Suffix",
    ],
  },
  {
    name: "InputOTP",
    cssClass: "input-otp",
    label: "Input OTP",
    category: "data-entry",
    platform: "both",
    icon: "🔢",
    description: "One-time password input",
  },
  {
    name: "NumberField",
    cssClass: "number-field",
    label: "Number Field",
    category: "data-entry",
    platform: "react",
    icon: "🔢",
    description: "Numeric input with stepper",
  },
  {
    name: "SearchField",
    cssClass: "search-field",
    label: "Search Field",
    category: "data-entry",
    platform: "both",
    icon: "🔍",
    description: "Search input with clear button",
  },
  {
    name: "Select",
    cssClass: "select",
    label: "Select",
    category: "data-entry",
    platform: "both",
    icon: "📋",
    description: "Dropdown selection from a list",
  },
  {
    name: "ComboBox",
    cssClass: "combo-box",
    label: "Combo Box",
    category: "data-entry",
    platform: "react",
    icon: "📋",
    description: "Searchable dropdown selection",
  },
  {
    name: "Autocomplete",
    cssClass: "autocomplete",
    label: "Autocomplete",
    category: "data-entry",
    platform: "react",
    icon: "🔍",
    description: "Text input with suggestions",
  },
  {
    name: "Checkbox",
    cssClass: "checkbox",
    label: "Checkbox",
    category: "data-entry",
    platform: "both",
    icon: "☑️",
    description: "Toggle a boolean value",
  },
  {
    name: "CheckboxGroup",
    cssClass: "checkbox-group",
    label: "Checkbox Group",
    category: "data-entry",
    platform: "react",
    icon: "☑️",
    description: "Group of related checkboxes",
  },
  {
    name: "RadioGroup",
    cssClass: "radio-group",
    label: "Radio Group",
    category: "data-entry",
    platform: "both",
    icon: "🔘",
    description: "Select one option from a group",
  },
  {
    name: "Switch",
    cssClass: "switch",
    label: "Switch",
    category: "data-entry",
    platform: "both",
    icon: "🔀",
    description: "Toggle between two states",
  },
  {
    name: "Slider",
    cssClass: "slider",
    label: "Slider",
    category: "data-entry",
    platform: "both",
    icon: "🎚️",
    description: "Select a value within a range",
    subComponents: [
      "Slider.Track",
      "Slider.Fill",
      "Slider.Thumb",
      "Slider.Output",
    ],
  },
  {
    name: "DatePicker",
    cssClass: "date-picker",
    label: "Date Picker",
    category: "data-entry",
    platform: "react",
    icon: "📅",
    description: "Select a date from a calendar",
  },
  {
    name: "DateRangePicker",
    cssClass: "date-range-picker",
    label: "Date Range Picker",
    category: "data-entry",
    platform: "react",
    icon: "📅",
    description: "Select a date range",
  },
  {
    name: "DateField",
    cssClass: "date-field",
    label: "Date Field",
    category: "data-entry",
    platform: "react",
    icon: "📅",
    description: "Segmented date input",
  },
  {
    name: "TimeField",
    cssClass: "time-field",
    label: "Time Field",
    category: "data-entry",
    platform: "react",
    icon: "🕐",
    description: "Segmented time input",
  },
  {
    name: "Calendar",
    cssClass: "calendar",
    label: "Calendar",
    category: "data-entry",
    platform: "react",
    icon: "📅",
    description: "Full calendar date picker",
  },
  {
    name: "RangeCalendar",
    cssClass: "range-calendar",
    label: "Range Calendar",
    category: "data-entry",
    platform: "react",
    icon: "📅",
    description: "Calendar for selecting date ranges",
  },
  {
    name: "ColorPicker",
    cssClass: "color-picker",
    label: "Color Picker",
    category: "data-entry",
    platform: "react",
    icon: "🎨",
    description: "Select a color value",
  },
  {
    name: "ColorArea",
    cssClass: "color-area",
    label: "Color Area",
    category: "data-entry",
    platform: "react",
    icon: "🎨",
    description: "2D color selection area",
  },
  {
    name: "ColorSlider",
    cssClass: "color-slider",
    label: "Color Slider",
    category: "data-entry",
    platform: "react",
    icon: "🎨",
    description: "Single-channel color slider",
  },
  {
    name: "ColorField",
    cssClass: "color-field",
    label: "Color Field",
    category: "data-entry",
    platform: "react",
    icon: "🎨",
    description: "Text input for color values",
  },
  {
    name: "ColorSwatch",
    cssClass: "color-swatch",
    label: "Color Swatch",
    category: "data-entry",
    platform: "react",
    icon: "🎨",
    description: "Display a color sample",
  },
  {
    name: "ColorSwatchPicker",
    cssClass: "color-swatch-picker",
    label: "Color Swatch Picker",
    category: "data-entry",
    platform: "react",
    icon: "🎨",
    description: "Pick from predefined color swatches",
  },
  {
    name: "Form",
    cssClass: "form",
    label: "Form",
    category: "data-entry",
    platform: "react",
    icon: "📋",
    description: "Form validation and submission",
  },

  // ── Feedback ──
  {
    name: "Alert",
    cssClass: "alert",
    label: "Alert",
    category: "feedback",
    platform: "both",
    icon: "⚠️",
    description: "Display important messages",
  },
  {
    name: "Toast",
    cssClass: "toast",
    label: "Toast",
    category: "feedback",
    platform: "both",
    icon: "🍞",
    description: "Temporary notification message",
  },
  {
    name: "ProgressBar",
    cssClass: "progress-bar",
    label: "Progress Bar",
    category: "feedback",
    platform: "react",
    icon: "📊",
    description: "Linear progress indicator",
  },
  {
    name: "ProgressCircle",
    cssClass: "progress-circle",
    label: "Progress Circle",
    category: "feedback",
    platform: "react",
    icon: "⭕",
    description: "Circular progress indicator",
  },
  {
    name: "Meter",
    cssClass: "meter",
    label: "Meter",
    category: "feedback",
    platform: "react",
    icon: "📊",
    description: "Display a value within a known range",
  },
  {
    name: "Spinner",
    cssClass: "spinner",
    label: "Spinner",
    category: "feedback",
    platform: "both",
    icon: "🔄",
    description: "Loading spinner animation",
  },

  // ── Overlays ──
  {
    name: "Modal",
    cssClass: "modal",
    label: "Modal",
    category: "overlay",
    platform: "react",
    icon: "🪟",
    description: "Dialog overlay for focused interactions",
    variants: [
      { name: "size", values: ["xs", "sm", "md", "lg", "cover", "full"] },
      { name: "backdrop", values: ["opaque", "blur", "transparent"] },
    ],
    subComponents: [
      "Modal.Backdrop",
      "Modal.Container",
      "Modal.Dialog",
      "Modal.Header",
      "Modal.Body",
      "Modal.Footer",
      "Modal.CloseTrigger",
      "Modal.Heading",
      "Modal.Icon",
    ],
  },
  {
    name: "Drawer",
    cssClass: "drawer",
    label: "Drawer",
    category: "overlay",
    platform: "react",
    icon: "📥",
    description: "Slide-out panel for supplementary content",
    variants: [
      { name: "placement", values: ["top", "bottom", "left", "right"] },
      { name: "backdrop", values: ["opaque", "blur", "transparent"] },
    ],
    subComponents: [
      "Drawer.Backdrop",
      "Drawer.Content",
      "Drawer.Dialog",
      "Drawer.Header",
      "Drawer.Body",
      "Drawer.Footer",
      "Drawer.Handle",
      "Drawer.CloseTrigger",
      "Drawer.Heading",
    ],
  },
  {
    name: "AlertDialog",
    cssClass: "alert-dialog",
    label: "Alert Dialog",
    category: "overlay",
    platform: "react",
    icon: "⚠️",
    description: "Confirmation dialog requiring user action",
  },
  {
    name: "Dialog",
    cssClass: "dialog",
    label: "Dialog",
    category: "overlay",
    platform: "native",
    icon: "🪟",
    description: "Dialog overlay (Native)",
  },
  {
    name: "Popover",
    cssClass: "popover",
    label: "Popover",
    category: "overlay",
    platform: "both",
    icon: "💬",
    description: "Floating content anchored to a trigger",
  },
  {
    name: "Tooltip",
    cssClass: "tooltip",
    label: "Tooltip",
    category: "overlay",
    platform: "react",
    icon: "💡",
    description: "Informative text on hover/focus",
    subComponents: ["Tooltip.Content", "Tooltip.Trigger", "Tooltip.Arrow"],
  },
  {
    name: "Dropdown",
    cssClass: "dropdown",
    label: "Dropdown",
    category: "overlay",
    platform: "react",
    icon: "📋",
    description: "Action menu triggered by a button",
    subComponents: [
      "Dropdown.Popover",
      "Dropdown.Menu",
      "Dropdown.Item",
      "Dropdown.Section",
      "Dropdown.ItemIndicator",
      "Dropdown.SubmenuTrigger",
      "Dropdown.SubmenuIndicator",
    ],
  },
  {
    name: "Menu",
    cssClass: "menu",
    label: "Menu",
    category: "overlay",
    platform: "native",
    icon: "📋",
    description: "Context menu (Native)",
  },
  {
    name: "BottomSheet",
    cssClass: "bottom-sheet",
    label: "Bottom Sheet",
    category: "overlay",
    platform: "native",
    icon: "📥",
    description: "Slide-up panel from bottom (Native)",
  },

  // ── Typography / Labels ──
  {
    name: "Label",
    cssClass: "label",
    label: "Label",
    category: "typography",
    platform: "both",
    icon: "🏷️",
    description: "Accessible label for form controls",
  },
  {
    name: "Description",
    cssClass: "description",
    label: "Description",
    category: "typography",
    platform: "both",
    icon: "📝",
    description: "Helper text for form fields",
  },
  {
    name: "FieldError",
    cssClass: "field-error",
    label: "Field Error",
    category: "typography",
    platform: "both",
    icon: "❌",
    description: "Error message for form fields",
  },
  {
    name: "ErrorMessage",
    cssClass: "error-message",
    label: "Error Message",
    category: "typography",
    platform: "react",
    icon: "❌",
    description: "Standalone error message display",
  },

  // ── Utility ──
  {
    name: "CloseButton",
    cssClass: "close-button",
    label: "Close Button",
    category: "utility",
    platform: "both",
    icon: "✖️",
    description: "Button for dismissing overlays",
  },
  {
    name: "PressableFeedback",
    cssClass: "pressable-feedback",
    label: "Pressable Feedback",
    category: "utility",
    platform: "native",
    icon: "👆",
    description: "Touch feedback wrapper (Native)",
  },
  {
    name: "ControlField",
    cssClass: "control-field",
    label: "Control Field",
    category: "utility",
    platform: "native",
    icon: "🎛️",
    description: "Generic control field wrapper (Native)",
  },
  {
    name: "SkeletonGroup",
    cssClass: "skeleton-group",
    label: "Skeleton Group",
    category: "utility",
    platform: "native",
    icon: "💀",
    description: "Group of skeleton loaders (Native)",
  },
];

// ── Helpers ──

/** Get components filtered by category */
export function getComponentsByCategory(
  category: ComponentCategory,
): ComponentDef[] {
  return COMPONENT_REGISTRY.filter((c) => c.category === category);
}

/** Get components filtered by platform */
export function getComponentsByPlatform(platform: Platform): ComponentDef[] {
  return COMPONENT_REGISTRY.filter(
    (c) => c.platform === platform || c.platform === "both",
  );
}

/** Get only React (web) components */
export function getReactComponents(): ComponentDef[] {
  return getComponentsByPlatform("react");
}

/** Get only Native components */
export function getNativeComponents(): ComponentDef[] {
  return getComponentsByPlatform("native");
}

/** All unique categories */
export const ALL_CATEGORIES: ComponentCategory[] = [
  "layout",
  "navigation",
  "data-display",
  "data-entry",
  "feedback",
  "overlay",
  "typography",
  "utility",
];

/** Category labels for display */
export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  layout: "Layout",
  navigation: "Navigation",
  "data-display": "Data Display",
  "data-entry": "Data Entry",
  feedback: "Feedback",
  overlay: "Overlays",
  typography: "Typography",
  media: "Media",
  utility: "Utility",
};

/** Category icons */
export const CATEGORY_ICONS: Record<ComponentCategory, string> = {
  layout: "📐",
  navigation: "🧭",
  "data-display": "📊",
  "data-entry": "📝",
  feedback: "🔔",
  overlay: "🪟",
  typography: "🔤",
  media: "🖼️",
  utility: "🔧",
};
