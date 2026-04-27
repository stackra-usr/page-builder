# Requirements Document

## Introduction

This document specifies the remaining features for the Page Builder application — a React/TypeScript drag-and-drop website builder using HeroUI v3, Tailwind CSS v4, and @dnd-kit. The application is approximately 85% complete with a three-panel layout, 24 block renderers, 6 templates, full design panel, rich text editing, multi-page CRUD, SEO analyzer, and more already implemented. This specification covers the 12 remaining features across five tiers: core functionality, block editing, design system, polish/UX, and platform features.

## Glossary

- **Page_Builder**: The main React application that provides a visual drag-and-drop interface for building web pages from composable blocks
- **Canvas**: The central panel of the Page_Builder where blocks are rendered in a vertical list and can be selected, reordered, and visually previewed
- **Block**: A self-contained page section (e.g., hero, navbar, features, footer) represented by a `BlockInstance` with a type, unique ID, and props
- **Block_Renderer**: The component (`BlockRenderer.tsx`) responsible for rendering a Block's visual representation on the Canvas based on its type and props
- **Design_Settings**: The global design configuration object containing mood, mainColor, backgroundTheme, backgroundOpacity, typography, and radius values
- **Right_Panel**: The right sidebar panel that displays block properties, page settings, SEO analysis, and the layers panel
- **Layers_Panel**: A tree-view list of all blocks on the current page, displayed in the Right_Panel, supporting selection, deletion, duplication, and arrow-based reordering
- **Sidebar**: The left panel containing block palette, component library, design settings, templates, pages, and menus tabs
- **Floating_Bar**: The bottom bar that appears when unsaved changes exist, offering Save, Discard, and Preview actions
- **Preview_Mode**: A full-screen rendering of the current page blocks and design settings without builder chrome
- **Pages_State**: The data structure managing multiple pages, each with its own blocks array, design settings, and page settings (title, slug, SEO metadata, custom CSS/code)
- **Block_Style_Override**: Per-block style customizations stored in `block.props._styles` that override global design settings
- **Drop_Zone**: A droppable area between blocks on the Canvas where new blocks from the Sidebar can be placed via drag-and-drop
- **HTML_Exporter**: The module responsible for generating standalone HTML files from page blocks and design settings
- **React_Exporter**: The module responsible for generating clean React component files from page blocks and design settings
- **Section_Settings**: Per-block configuration for layout width, background image, and background overlay that wraps the block renderer output
- **Global_Block**: A block (typically navbar or footer) marked as "global" that automatically appears on all pages in the Pages_State
- **Form_Handler**: The configuration and runtime logic for processing contact form block submissions via email, webhook, or localStorage
- **Clipboard_Manager**: The module managing copy/paste operations for blocks, storing serialized block data for within-page and cross-page transfer
- **Selection_Manager**: The module managing single and multi-block selection state, supporting shift-click for range selection and bulk operations
- **Animation_Preset**: A named CSS animation configuration (e.g., fade-in, slide-up, zoom-in) that can be assigned to a block and previewed on the Canvas

## Requirements

### Requirement 1: HTML Export

**User Story:** As a page builder user, I want to export my page as a standalone HTML file, so that I can host or share the built page independently.

#### Acceptance Criteria

1. WHEN the user triggers the HTML export action, THE HTML_Exporter SHALL generate a complete standalone HTML document containing all page blocks rendered as static HTML with inline CSS styles.
2. THE HTML_Exporter SHALL include the selected Google Font from Design_Settings as a `<link>` element in the generated HTML `<head>` section.
3. THE HTML_Exporter SHALL apply the Design_Settings mood (light/dark), mainColor, backgroundTheme, backgroundOpacity, typography, and radius values as inline CSS custom properties or styles in the generated document.
4. THE HTML_Exporter SHALL apply any Block_Style_Override values from each block's `_styles` prop as inline styles on the corresponding HTML element.
5. THE HTML_Exporter SHALL include the page's custom CSS (from `PageSettings.customCSS`) in a `<style>` tag and custom head/body code (from `PageSettings.headCode` and `PageSettings.bodyCode`) in the appropriate locations.
6. WHEN the HTML document is generated, THE HTML_Exporter SHALL trigger a browser file download with the filename derived from the page slug (e.g., `home.html`).
7. IF a block type has no corresponding HTML renderer mapping, THEN THE HTML_Exporter SHALL render a placeholder comment indicating the unsupported block type.

### Requirement 2: Improved Drag-and-Drop Hit Areas

**User Story:** As a page builder user, I want larger and more forgiving drop zones between blocks, so that I can place new blocks precisely without struggling with tiny 3px targets.

#### Acceptance Criteria

1. WHEN a drag operation is active (a block is being dragged from the Sidebar or reordered), THE Canvas SHALL expand each Drop_Zone between blocks to a minimum height of 32 pixels.
2. WHILE no drag operation is active, THE Canvas SHALL render Drop_Zones at their default compact height (current 12px / `h-3`).
3. WHEN the user hovers a dragged block over a Drop_Zone, THE Canvas SHALL display a visual insertion indicator with a highlighted line and label showing the drop position.
4. THE Canvas SHALL use proximity-based drop detection so that dragging near the top half of a block targets the drop zone above it, and dragging near the bottom half targets the drop zone below it.

### Requirement 3: Inline Canvas Editing

**User Story:** As a page builder user, I want to click on text content directly on the Canvas to edit it in place, so that I can make quick text changes without switching to the Right_Panel.

#### Acceptance Criteria

1. WHEN the user double-clicks a text-editable field (headline, subtitle, content, title, ctaText, copyright, banner text) on a selected Block on the Canvas, THE Block_Renderer SHALL switch that text element to an inline contentEditable mode.
2. WHILE a text element is in inline contentEditable mode, THE Block_Renderer SHALL apply a subtle visual indicator (e.g., a text cursor and light background highlight) to show the element is editable.
3. WHEN the user finishes editing (by clicking outside the element or pressing Escape), THE Block_Renderer SHALL save the updated text value to the block's props and exit contentEditable mode.
4. WHEN the user presses Enter in a single-line editable field (headline, title, ctaText), THE Block_Renderer SHALL commit the edit and exit contentEditable mode.
5. THE Block_Renderer SHALL support inline editing for the following block types and fields: hero (headline, subtitle, ctaText), text (content), content (heading, body), cta (headline, subtitle, ctaText), banner (text), footer (copyright), features (title), testimonials (title), pricing (title), faq (title), team (title), gallery (title), contact (title), logos (title), stats (no inline — numeric items only).

### Requirement 4: Background Pattern and Gradient Rendering

**User Story:** As a page builder user, I want the Canvas page preview to render the background pattern or gradient I selected in Design_Settings, so that I can see an accurate preview of my page's background.

#### Acceptance Criteria

1. WHILE Design_Settings.backgroundTheme is set to "solid", THE Canvas page preview container SHALL render a solid background color derived from the Design_Settings mood (white for light, dark color for dark).
2. WHILE Design_Settings.backgroundTheme is set to "pattern", THE Canvas page preview container SHALL render a repeating SVG or CSS pattern overlay using the Design_Settings.mainColor at the opacity specified by Design_Settings.backgroundOpacity (0–100 mapped to 0–1).
3. WHILE Design_Settings.backgroundTheme is set to "gradient", THE Canvas page preview container SHALL render a gradient background using the Design_Settings.mainColor as the primary gradient color at the opacity specified by Design_Settings.backgroundOpacity.
4. WHEN the user changes Design_Settings.backgroundTheme or Design_Settings.backgroundOpacity, THE Canvas page preview container SHALL update the background rendering within the same React render cycle.
5. THE HTML_Exporter SHALL include the active background theme (solid, pattern, or gradient) styles in the exported HTML document body.

### Requirement 5: Section-Level Settings

**User Story:** As a page builder user, I want to configure each block section's layout width, background image, and background overlay, so that I can create visually distinct sections on my page.

#### Acceptance Criteria

1. THE Right_Panel SHALL display a "Section Settings" group in the block properties editor for every block type, containing controls for layout mode, background image URL, and background overlay color.
2. WHEN the user sets a block's layout mode to "full-width", THE Canvas SHALL render that block spanning the full width of the page preview container without horizontal padding constraints.
3. WHEN the user sets a block's layout mode to "contained", THE Canvas SHALL render that block within a centered max-width container (matching the current default behavior).
4. WHEN the user provides a background image URL in Section_Settings, THE Canvas SHALL render the image as a CSS `background-image` behind the block content, using `cover` sizing and `center` positioning.
5. WHEN the user sets a background overlay color in Section_Settings, THE Canvas SHALL render a semi-transparent color overlay on top of the background image and behind the block content.
6. THE Section_Settings values SHALL be stored in the block's props under a `_section` key (e.g., `block.props._section.layout`, `block.props._section.bgImage`, `block.props._section.bgOverlay`).
7. THE HTML_Exporter SHALL include Section_Settings (layout mode, background image, overlay) in the exported HTML for each block.

### Requirement 6: Copy and Paste Blocks

**User Story:** As a page builder user, I want to copy a selected block with Ctrl+C and paste it with Ctrl+V, so that I can quickly duplicate blocks within the same page or across pages.

#### Acceptance Criteria

1. WHEN the user presses Ctrl+C (or Cmd+C) with a block selected, THE Clipboard_Manager SHALL serialize the selected block's type and props to an internal clipboard store.
2. WHEN the user presses Ctrl+V (or Cmd+V) with a block in the clipboard, THE Clipboard_Manager SHALL insert a new block with a unique ID, the copied type, and a deep clone of the copied props immediately after the currently selected block (or at the end of the blocks list if no block is selected).
3. WHEN the user pastes a block, THE Page_Builder SHALL push the current state to the undo history before inserting the pasted block.
4. IF no block has been copied to the clipboard, THEN THE Clipboard_Manager SHALL take no action when Ctrl+V is pressed.
5. THE Clipboard_Manager SHALL retain the copied block data across page switches within the same session, enabling cross-page paste.

### Requirement 7: Multi-Select Blocks

**User Story:** As a page builder user, I want to select multiple blocks using Shift+click, so that I can perform bulk operations like delete, duplicate, or move on several blocks at once.

#### Acceptance Criteria

1. WHEN the user holds Shift and clicks a block on the Canvas, THE Selection_Manager SHALL add that block to the current selection (or remove it if already selected), creating a multi-selection set.
2. WHILE multiple blocks are selected, THE Canvas SHALL display a multi-selection visual indicator (e.g., a shared highlight or badge showing the count of selected blocks).
3. WHEN the user presses Delete or Backspace with multiple blocks selected, THE Page_Builder SHALL remove all selected blocks from the page and push the previous state to undo history.
4. WHEN the user presses Ctrl+D with multiple blocks selected, THE Page_Builder SHALL duplicate all selected blocks, inserting the copies immediately after the last selected block in order.
5. WHILE multiple blocks are selected, THE Right_Panel SHALL display a multi-selection summary (block count and bulk action buttons) instead of individual block properties.
6. WHEN the user clicks a single block without holding Shift, THE Selection_Manager SHALL clear the multi-selection and select only the clicked block.

### Requirement 8: Animation Preview

**User Story:** As a page builder user, I want to see a preview of the animation assigned to a block on the Canvas, so that I can verify the animation effect before publishing.

#### Acceptance Criteria

1. THE Right_Panel block properties editor SHALL include an "Animation" dropdown for every block type, offering presets: none, fade-in, fade-up, fade-down, slide-up, slide-down, slide-left, slide-right, zoom-in, zoom-out, and bounce.
2. WHEN the user selects an Animation_Preset for a block, THE Block_Renderer SHALL store the animation value in `block.props._animation`.
3. WHEN the user clicks a "Preview Animation" button in the Right_Panel (or when the animation value changes), THE Canvas SHALL play the selected CSS animation on the block once, then return the block to its final visible state.
4. THE HTML_Exporter SHALL include CSS `@keyframes` definitions and Intersection Observer JavaScript for the assigned animations, so that blocks animate on scroll in the exported page.

### Requirement 9: Layers Panel Drag-and-Drop Reordering

**User Story:** As a page builder user, I want to reorder blocks by dragging them in the Layers Panel, so that I can rearrange the page structure more intuitively than using up/down arrows.

#### Acceptance Criteria

1. THE Layers_Panel SHALL support drag-and-drop reordering of block items using @dnd-kit sortable, in addition to the existing up/down arrow buttons.
2. WHEN the user drags a block item to a new position in the Layers_Panel, THE Page_Builder SHALL reorder the blocks array to match the new position and push the previous state to undo history.
3. WHILE a block item is being dragged in the Layers_Panel, THE Layers_Panel SHALL display a drag overlay showing the block's icon and label, and a visual insertion indicator at the target position.
4. THE Layers_Panel drag-and-drop reordering SHALL keep the Canvas block order synchronized with the Layers_Panel order in real time.

### Requirement 10: Global Header and Footer

**User Story:** As a page builder user, I want to mark a header or footer block as "global" so that it automatically appears on all pages, so that I can maintain consistent navigation and footer across my site.

#### Acceptance Criteria

1. THE Right_Panel block properties editor SHALL display a "Global Block" toggle for blocks of type "navbar" and "footer".
2. WHEN the user enables the "Global Block" toggle on a navbar or footer block, THE Page_Builder SHALL store a `_global: true` flag in that block's props.
3. WHILE a block is marked as global, THE Canvas SHALL display a visual "Global" badge on that block to distinguish it from page-specific blocks.
4. WHEN rendering any page in the Pages_State, THE Canvas SHALL automatically prepend global navbar blocks and append global footer blocks from the page where the global blocks are defined, if the current page does not already contain a block with the same global block ID.
5. WHEN the user edits a Global_Block's props on any page, THE Page_Builder SHALL propagate the changes to all pages that reference that global block.
6. IF the user removes the "Global Block" flag from a block, THEN THE Page_Builder SHALL stop propagating that block to other pages, leaving existing copies as independent page-specific blocks.

### Requirement 11: Form Submission Handling

**User Story:** As a page builder user, I want to configure how contact form submissions are handled (email, webhook, or localStorage), so that I can collect form data from my published pages.

#### Acceptance Criteria

1. THE Right_Panel block properties editor SHALL display a "Form Action" configuration section for blocks of type "contact", containing a submission method selector (email, webhook, localStorage) and corresponding configuration fields.
2. WHEN the user selects "email" as the submission method, THE Right_Panel SHALL display an "Email Address" input field, and THE Form_Handler SHALL store the email address in `block.props._formAction.email`.
3. WHEN the user selects "webhook" as the submission method, THE Right_Panel SHALL display a "Webhook URL" input field, and THE Form_Handler SHALL store the URL in `block.props._formAction.webhookUrl`.
4. WHEN the user selects "localStorage" as the submission method, THE Form_Handler SHALL store `block.props._formAction.method` as "localStorage".
5. THE HTML_Exporter SHALL generate form submission JavaScript in the exported HTML that implements the configured Form_Handler method: `mailto:` link for email, `fetch()` POST for webhook, or `localStorage.setItem()` for localStorage.
6. IF no form action is configured for a contact block, THEN THE HTML_Exporter SHALL default to localStorage submission with a key derived from the page slug and block ID.

### Requirement 12: React Component Export

**User Story:** As a page builder user, I want to export my page as a clean React component file, so that I can integrate the built page into an existing React application.

#### Acceptance Criteria

1. WHEN the user triggers the React export action, THE React_Exporter SHALL generate a single `.tsx` file containing a functional React component that renders all page blocks.
2. THE React_Exporter SHALL generate JSX markup for each block type that mirrors the structure of the existing Block_Renderer components, using inline styles for design token values.
3. THE React_Exporter SHALL include the Design_Settings (mood, mainColor, typography, radius) as CSS custom properties on the root element of the generated component.
4. THE React_Exporter SHALL include a comment header in the generated file indicating it was generated by the Page_Builder, the page title, and the export timestamp.
5. WHEN the React component file is generated, THE React_Exporter SHALL trigger a browser file download with the filename derived from the page slug (e.g., `Home.tsx`).
6. THE React_Exporter SHALL generate valid TypeScript JSX that compiles without errors when used in a standard React + TypeScript project with no additional dependencies beyond React.
