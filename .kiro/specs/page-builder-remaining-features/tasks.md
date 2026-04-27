# Implementation Plan: Page Builder Remaining Features

## Overview

This plan implements the 12 remaining features for the Page Builder across five tiers: export (HTML & React), canvas improvements (drag-and-drop hit areas, inline editing, background rendering), block management (copy/paste, multi-select, layers DnD, global blocks), design enhancements (section settings, animation preview), and data handling (form submission). Tasks are ordered so that foundational modules (types, pure functions, hooks) come first, followed by UI integration, and finally wiring and export features that depend on all prior work.

## Tasks

- [x] 1. Set up testing infrastructure and extend core types

  - [x] 1.1 Install vitest, @testing-library/react, and fast-check as dev dependencies; create `vitest.config.ts` with React plugin and path aliases matching the existing Vite config
    - Add `"test": "vitest --run"` script to `package.json`
    - _Requirements: Testing Strategy (design doc)_
  - [x] 1.2 Extend `BlockInstance.props` type in `src/page-builder/types.ts` with reserved `_`-prefixed keys
    - Add `_section?: { layout: "contained" | "full-width"; bgImage: string; bgOverlay: string }`
    - Add `_animation?: AnimationPreset` (define `AnimationPreset` union type)
    - Add `_global?: boolean`
    - Add `_formAction?: { method: "email" | "webhook" | "localStorage"; email?: string; webhookUrl?: string }`
    - Export `AnimationPreset`, `SectionSettings`, `FormAction` types
    - _Requirements: 5.6, 8.2, 10.2, 11.2, 11.3, 11.4_

- [-] 2. Implement HTML Exporter

  - [x] 2.1 Create `src/page-builder/html-export.ts` with `generateHtml()` and `downloadHtml()` functions
    - Implement `HtmlExportOptions` interface accepting `blocks`, `design`, `pageSettings`
    - Build block-to-HTML mapping (`Record<BlockType, (props, design) => string>`) for all 24 block types
    - Generate complete `<!DOCTYPE html>` document with `<html>`, `<head>`, `<body>` structure
    - Include Google Font `<link>` from `FONT_URLS` in `<head>`
    - Apply design tokens as CSS custom properties (`--main-color`, `--radius`, `--font-family`, mood class)
    - Apply `_styles` overrides as inline CSS on each block element
    - Include `pageSettings.customCSS` in `<style>`, `headCode` in `<head>`, `bodyCode` before `</body>`
    - Render `<!-- Unsupported block: {type} -->` for unknown block types
    - Implement `downloadHtml()` using Blob + anchor click with filename from page slug
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  - [ ] 2.2 Write property test: HTML export produces a structurally valid document for any block set
    - **Property 1: HTML export produces a structurally valid document for any block set**
    - Create `arbBlockInstance()` and `arbDesignSettings()` generators in a shared test helpers file
    - Verify output contains `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, and one section/comment per block
    - **Validates: Requirements 1.1, 1.7**
  - [ ] 2.3 Write property test: HTML export reflects design settings
    - **Property 2: HTML export reflects design settings**
    - Verify Google Font `<link>`, CSS custom properties for mainColor/radius/mood, and background styles
    - **Validates: Requirements 1.2, 1.3, 4.5**
  - [ ] 2.4 Write property test: HTML export preserves block style overrides
    - **Property 3: HTML export preserves block style overrides**
    - Verify each `_styles` property/value appears as inline CSS on the corresponding element
    - **Validates: Requirements 1.4**
  - [ ] 2.5 Write property test: HTML export includes custom page code in correct locations
    - **Property 4: HTML export includes custom page code in correct locations**
    - Verify `customCSS` in `<style>` in `<head>`, `headCode` in `<head>`, `bodyCode` before `</body>`
    - **Validates: Requirements 1.5**

- [ ] 3. Implement background style generation and section wrapper

  - [x] 3.1 Create `getBackgroundStyles()` utility in `src/page-builder/components/Canvas.tsx` (or a shared utils file)
    - Return solid background-color for "solid" theme based on mood
    - Return SVG pattern `backgroundImage` using `mainColor` at `backgroundOpacity/100` for "pattern"
    - Return linear gradient using `mainColor` at `backgroundOpacity/100` for "gradient"
    - Apply returned styles to the Canvas page preview container `<div>`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [ ] 3.2 Write property test: Background style generation matches theme type
    - **Property 5: Background style generation matches theme type**
    - Verify correct CSS property type (background-color, backgroundImage, gradient) for each theme
    - **Validates: Requirements 4.1, 4.2, 4.3**
  - [x] 3.3 Create `src/page-builder/components/SectionWrapper.tsx`
    - Accept `section?: SectionSettings` and `children` props
    - Render full-width or contained layout based on `section.layout`
    - Apply `background-image: url(...)` with `cover` sizing and `center` positioning for `bgImage`
    - Render semi-transparent overlay `<div>` for `bgOverlay` color
    - Wrap each block in `Canvas.tsx` with `SectionWrapper`, reading `block.props._section`
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6_
  - [ ] 3.4 Write property test: Section wrapper applies background image and overlay
    - **Property 6: Section wrapper applies background image and overlay**
    - Verify `background-image` CSS with cover/center for non-empty bgImage, overlay element for bgOverlay
    - **Validates: Requirements 5.4, 5.5**

- [ ] 4. Checkpoint — Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement section settings UI and add section/background export to HTML exporter

  - [x] 5.1 Add "Section Settings" group to `RightPanel.tsx` block properties editor
    - Add layout mode toggle (contained / full-width) for every block type
    - Add background image URL text input
    - Add background overlay color picker
    - Store values in `block.props._section`
    - _Requirements: 5.1, 5.2, 5.3, 5.6_
  - [x] 5.2 Extend `generateHtml()` in `html-export.ts` to include section settings and background styles
    - Wrap each block HTML in a section container with layout mode (full-width or contained)
    - Include background-image and overlay styles per block from `_section`
    - Include page-level background theme styles on `<body>`
    - _Requirements: 4.5, 5.7_
  - [ ] 5.3 Write property test: HTML export includes section settings per block
    - **Property 7: HTML export includes section settings per block**
    - Verify layout wrapper, background-image style, and overlay element in exported HTML
    - **Validates: Requirements 5.7**

- [ ] 6. Implement clipboard (copy/paste) hook

  - [x] 6.1 Create `src/page-builder/hooks/useClipboard.ts`
    - Implement module-level `clipboardStore` variable for cross-page persistence
    - `copy(block)`: serialize block type and props (deep clone) to clipboard store
    - `paste(afterBlockId)`: return new `BlockInstance` with fresh UUID, same type, deep-cloned props
    - Return `{ copiedBlock, copy, paste }` from the hook
    - _Requirements: 6.1, 6.2, 6.4, 6.5_
  - [x] 6.2 Integrate clipboard into `PageBuilder.tsx`
    - Add `useClipboard()` hook
    - Register `keydown` listener for Ctrl/Cmd+C (copy selected block) and Ctrl/Cmd+V (paste after selected or at end)
    - Call `pushHistory()` before inserting pasted block
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ] 6.3 Write property test: Clipboard copy-paste round trip preserves block data
    - **Property 8: Clipboard copy-paste round trip preserves block data**
    - Verify pasted block has different ID, same type, deeply equal but not reference-equal props
    - **Validates: Requirements 6.1, 6.2**

- [ ] 7. Implement multi-select hook and bulk operations

  - [x] 7.1 Create `src/page-builder/hooks/useMultiSelect.ts`
    - Manage `selectedIds: Set<string>` state
    - `toggle(id, shiftKey)`: add/remove from selection when shift is held
    - `selectSingle(id)`: clear selection, select only this ID
    - `selectRange(fromId, toId, allIds)`: select contiguous range
    - `clear()`: empty the selection set
    - _Requirements: 7.1, 7.6_
  - [ ] 7.2 Integrate multi-select into `PageBuilder.tsx` and Canvas
    - Replace single `selectedBlockId` logic with multi-select awareness
    - On shift+click: call `toggle()`; on plain click: call `selectSingle()`
    - Display multi-selection visual indicator (highlight + count badge) on Canvas blocks
    - Implement bulk delete (Delete/Backspace): remove all selected blocks, push history
    - Implement bulk duplicate (Ctrl+D): insert copies after last selected block, push history
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [ ] 7.3 Update `RightPanel.tsx` to show multi-selection summary
    - When `selectedIds.size > 1`, show block count and bulk action buttons (delete, duplicate) instead of individual block properties
    - _Requirements: 7.5_
  - [ ] 7.4 Write property test: Multi-select shift-click toggles membership correctly
    - **Property 10: Multi-select shift-click toggles membership correctly**
    - Verify selection set contains exactly IDs toggled an odd number of times
    - **Validates: Requirements 7.1**
  - [ ] 7.5 Write property test: Multi-select bulk delete removes exactly the selected blocks
    - **Property 11: Multi-select bulk delete removes exactly the selected blocks**
    - Verify resulting array contains only non-selected blocks in original order
    - **Validates: Requirements 7.3**
  - [ ] 7.6 Write property test: Multi-select bulk duplicate inserts copies in order after last selected
    - **Property 12: Multi-select bulk duplicate inserts copies in order after last selected**
    - Verify copies inserted after last selected, same relative order, unique IDs, deep-cloned props
    - **Validates: Requirements 7.4**

- [ ] 8. Checkpoint — Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement inline canvas editing

  - [x] 9.1 Create `src/page-builder/components/InlineEditable.tsx`
    - Accept `value`, `field`, `blockId`, `multiline`, `className`, `onSave` props
    - Render text normally; on double-click of a selected block's text, switch to `contentEditable`
    - Show subtle highlight (light background, text cursor) while editing
    - Commit on blur or Escape; commit on Enter for single-line fields
    - Read `textContent` (not `innerHTML`) to prevent XSS
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ] 9.2 Integrate `InlineEditable` into `BlockRenderer.tsx`
    - Wrap editable text fields per block type: hero (headline, subtitle, ctaText), text (content), content (heading, body), cta (headline, subtitle, ctaText), banner (text), footer (copyright), features/testimonials/pricing/faq/team/gallery/contact/logos (title)
    - Wire `onSave` to `updateBlockProps` callback from `PageBuilder.tsx`
    - _Requirements: 3.5_
  - [ ] 9.3 Write property test: Inline editing save preserves entered text
    - **Property 9: Inline editing save preserves entered text**
    - Verify `onSave` callback receives exact text content, correct blockId, correct field name
    - **Validates: Requirements 3.3**

- [ ] 10. Implement improved drag-and-drop hit areas

  - [x] 10.1 Enhance `Canvas.tsx` drop zones
    - Pass `isDragActive` boolean from `PageBuilder.tsx` DnD state to Canvas
    - When `isDragActive` is true, expand drop zones from `h-3` to `min-h-[32px]` with smooth CSS transition
    - Enhance visual insertion indicator with prominent highlighted line and label
    - Leverage existing `@dnd-kit` collision detection (pointerWithin + rectIntersection) for proximity-based targeting
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 11. Implement animation preview

  - [x] 11.1 Add animation dropdown to `RightPanel.tsx` block properties editor
    - Add "Animation" dropdown for every block type with presets: none, fade-in, fade-up, fade-down, slide-up, slide-down, slide-left, slide-right, zoom-in, zoom-out, bounce
    - Store selected value in `block.props._animation`
    - Add "Preview Animation" button
    - _Requirements: 8.1, 8.2_
  - [ ] 11.2 Implement CSS animation keyframes and canvas preview
    - Define `ANIMATION_KEYFRAMES` map in a shared constants file or within Canvas
    - On animation change or "Preview" click, toggle a CSS class on the block that plays the animation once
    - Use `animationend` event to clean up the class and return block to final visible state
    - _Requirements: 8.3_
  - [x] 11.3 Extend `generateHtml()` to include animation support in exported HTML
    - Include CSS `@keyframes` definitions for all used animation presets
    - Include Intersection Observer JavaScript that adds animation classes when blocks scroll into view
    - _Requirements: 8.4_
  - [ ] 11.4 Write property test: HTML export includes animation keyframes for animated blocks
    - **Property 13: HTML export includes animation keyframes for animated blocks**
    - Verify `@keyframes` definition and Intersection Observer script for non-"none" animations
    - **Validates: Requirements 8.4**

- [ ] 12. Checkpoint — Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Implement layers panel drag-and-drop reordering

  - [ ] 13.1 Add `@dnd-kit/sortable` to `LayersPanel.tsx`
    - Wrap layer items in `SortableContext` with `verticalListSortingStrategy`
    - Create `SortableLayerItem` component with drag handle, block icon, and label
    - Show drag overlay with block icon/label during drag
    - Show visual insertion indicator at target position
    - On drop: reorder `state.blocks`, call `pushHistory()`, keep Canvas synchronized
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ] 13.2 Write property test: Layers panel reorder produces correct block order
    - **Property 14: Layers panel reorder produces correct block order**
    - Verify moved block at target position, all other blocks maintain relative order
    - **Validates: Requirements 9.2**

- [ ] 14. Implement global header and footer

  - [x] 14.1 Add "Global Block" toggle to `RightPanel.tsx` for navbar and footer blocks
    - Show toggle only for blocks of type "navbar" and "footer"
    - Store `_global: true` flag in block props when enabled
    - Display "Global" badge on Canvas for global blocks
    - _Requirements: 10.1, 10.2, 10.3_
  - [ ] 14.2 Implement `resolveGlobalBlocks()` in `PageBuilder.tsx`
    - Scan all pages for blocks with `_global: true`
    - Prepend global navbars and append global footers to active page if not already present
    - Propagate edits to global block props across all pages referencing that block
    - When global flag is removed, stop propagation (existing copies become independent)
    - _Requirements: 10.4, 10.5, 10.6_
  - [ ] 14.3 Write property test: Global block resolution prepends navbars and appends footers
    - **Property 15: Global block resolution prepends navbars and appends footers**
    - Verify global navbars prepended, global footers appended, no duplicates on target page
    - **Validates: Requirements 10.4**
  - [ ] 14.4 Write property test: Global block edit propagation
    - **Property 16: Global block edit propagation**
    - Verify prop changes to a global block are reflected on all pages referencing it
    - **Validates: Requirements 10.5**

- [ ] 15. Implement form submission handling

  - [x] 15.1 Add "Form Action" configuration UI to `RightPanel.tsx` for contact blocks
    - Show submission method selector (email, webhook, localStorage) for blocks of type "contact"
    - Show "Email Address" input when "email" is selected, store in `block.props._formAction.email`
    - Show "Webhook URL" input when "webhook" is selected, store in `block.props._formAction.webhookUrl`
    - Store method in `block.props._formAction.method`
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  - [x] 15.2 Extend `generateHtml()` to generate form submission JavaScript
    - Generate `mailto:` link construction for "email" method
    - Generate `fetch()` POST to webhook URL for "webhook" method
    - Generate `localStorage.setItem()` for "localStorage" method
    - Default to localStorage with key `{pageSlug}-{blockId}` when no form action is configured
    - _Requirements: 11.5, 11.6_
  - [ ] 15.3 Write property test: HTML export generates correct form submission code
    - **Property 17: HTML export generates correct form submission code**
    - Verify correct JavaScript method (mailto, fetch, localStorage) matches configured `_formAction`
    - **Validates: Requirements 11.5**

- [ ] 16. Implement React component export

  - [x] 16.1 Create `src/page-builder/react-export.ts` with `generateReactComponent()` and `downloadReactFile()`
    - Implement `ReactExportOptions` interface accepting `blocks`, `design`, `pageSettings`
    - Generate a single `.tsx` file with a functional React component
    - Map each block type to JSX markup mirroring `BlockRenderer` structure with inline styles
    - Include CSS custom properties for mood, mainColor, typography, radius on root element
    - Include comment header with page title and ISO 8601 timestamp
    - Generate valid TypeScript JSX with no external dependencies beyond React
    - Implement `downloadReactFile()` using Blob + anchor click with PascalCase filename from slug (e.g., `Home.tsx`)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_
  - [ ] 16.2 Write property test: React export generates a valid component with design settings
    - **Property 18: React export generates a valid component with design settings**
    - Verify output contains functional component, CSS custom properties, JSX for each block
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.6**
  - [ ] 16.3 Write property test: React export includes comment header
    - **Property 19: React export includes comment header**
    - Verify file begins with comment containing page title and valid ISO 8601 timestamp
    - **Validates: Requirements 12.4**

- [ ] 17. Wire export actions into toolbar and final integration

  - [x] 17.1 Add HTML Export and React Export buttons to `Toolbar.tsx`
    - Add "Export HTML" button that calls `generateHtml()` → `downloadHtml()` with current page state
    - Add "Export React" button that calls `generateReactComponent()` → `downloadReactFile()` with current page state
    - Handle download errors with toast notification and clipboard fallback
    - _Requirements: 1.6, 12.5_
  - [x] 17.2 Wire all new features into `PageBuilder.tsx` orchestrator
    - Ensure `useClipboard`, `useMultiSelect` hooks are connected
    - Ensure `InlineEditable` onSave flows through `updateBlockProps` with `pushHistory()`
    - Ensure section settings, animation, global block, and form action changes all trigger `pushHistory()` for undo support
    - Verify `localStorage` persistence includes all new `_`-prefixed props
    - _Requirements: 6.3, 7.3, 7.4_

- [ ] 18. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after each major feature group
- Property tests validate universal correctness properties from the design document (19 properties across 12 features)
- Unit tests validate specific examples and edge cases
- The HTML exporter is extended incrementally: base structure (task 2), section/background support (task 5), animation support (task 11), form submission (task 15)
- All state changes flow through `PageBuilder.tsx` and call `pushHistory()` for undo support
