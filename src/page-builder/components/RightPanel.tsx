import clsx from "clsx";
import { useState } from "react";

import type { BlockInstance } from "../types";
import type { Page } from "../pages";
import { BLOCK_DEFINITIONS } from "../data";
import {
  ItemListEditor,
  ImagePicker,
  LinksEditor,
  RichTextEditor,
  BlockStyleEditor,
  type BlockStyles,
} from "./block-editors";
import { LayersPanel } from "./LayersPanel";
import { SEOAnalyzer } from "./SEOAnalyzer";

export function RightPanel({
  block,
  blocks,
  width,
  activePage,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDeselect,
  onUpdatePageSettings,
}: {
  block: BlockInstance | null;
  blocks: BlockInstance[];
  width: number;
  activePage?: Page;
  onUpdate: (blockId: string, props: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDeselect: () => void;
  onUpdatePageSettings?: (
    id: string,
    settings: Partial<Page["settings"]>,
  ) => void;
}) {
  const [settingsTab, setSettingsTab] = useState<"page" | "seo" | "layers">(
    "page",
  );

  if (!block) {
    // Show page settings when no block is selected
    if (activePage && onUpdatePageSettings) {
      return (
        <aside
          className="shrink-0 border-l border-separator/50 bg-white dark:bg-background flex flex-col overflow-hidden h-full"
          style={{ width: `${width}px` }}
        >
          <div className="px-4 py-3 border-b border-separator/40 bg-[#FAFAFA] dark:bg-surface/50">
            <p className="text-[13px] font-semibold text-foreground">
              📄 Page Settings
            </p>
            <p className="text-[10px] text-muted">
              {activePage.settings.title}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex border-b border-separator/40">
            {(["page", "seo", "layers"] as const).map((tab) => (
              <button
                className={clsx(
                  "flex-1 py-2 text-[11px] font-semibold transition-colors border-b-2",
                  settingsTab === tab
                    ? "text-[#634CF8] border-[#634CF8]"
                    : "text-muted border-transparent hover:text-foreground",
                )}
                key={tab}
                onClick={() => setSettingsTab(tab)}
              >
                {tab === "page" ? "General" : tab === "seo" ? "SEO" : "Layers"}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {settingsTab === "page" && (
              <div className="flex flex-col gap-4">
                <SettingField
                  label="Page Title"
                  value={activePage.settings.title}
                  onChange={(v) =>
                    onUpdatePageSettings(activePage.id, { title: v })
                  }
                />
                <div>
                  <label className="text-[11px] font-semibold text-muted block mb-1.5">
                    Permalink
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-muted">/</span>
                    <input
                      className="flex-1 h-9 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-3 text-[12px] text-foreground font-mono outline-none focus:border-[#634CF8]"
                      value={activePage.settings.slug}
                      onChange={(e) =>
                        onUpdatePageSettings(activePage.id, {
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, ""),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted block mb-1.5">
                    Visibility
                  </label>
                  <div className="flex gap-2">
                    {(["public", "draft"] as const).map((v) => (
                      <button
                        className={clsx(
                          "flex-1 h-9 rounded-lg text-[11px] font-semibold transition-all border-2",
                          (
                            v === "public"
                              ? activePage.settings.published
                              : !activePage.settings.published
                          )
                            ? "border-[#634CF8] bg-[#634CF8]/5 text-[#634CF8]"
                            : "border-separator/40 text-muted hover:border-muted",
                        )}
                        key={v}
                        onClick={() =>
                          onUpdatePageSettings(activePage.id, {
                            published: v === "public",
                          })
                        }
                      >
                        {v === "public" ? "🌐 Public" : "📝 Draft"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-[#F8F8FA] dark:bg-surface p-3 flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted">Created</span>
                    <span className="text-foreground font-mono">
                      {new Date(
                        activePage.settings.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted">Updated</span>
                    <span className="text-foreground font-mono">
                      {new Date(
                        activePage.settings.updatedAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted">Blocks</span>
                    <span className="text-foreground">{blocks.length}</span>
                  </div>
                </div>
              </div>
            )}

            {settingsTab === "seo" && (
              <SEOAnalyzer
                blocks={blocks}
                page={activePage}
                onUpdateSettings={(settings) =>
                  onUpdatePageSettings(activePage.id, settings)
                }
              />
            )}

            {settingsTab === "layers" && (
              <LayersPanel
                blocks={blocks}
                selectedBlockId={null}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
                onSelect={() => {}}
              />
            )}
          </div>
        </aside>
      );
    }

    return (
      <aside
        className="shrink-0 border-l border-separator/50 bg-white dark:bg-background flex flex-col items-center justify-center p-6 text-center h-full"
        style={{ width: `${width}px` }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F8FA] dark:bg-surface mb-4">
          <span className="text-2xl">👆</span>
        </div>
        <p className="text-[13px] font-semibold text-foreground">
          Select a block
        </p>
        <p className="text-[11px] text-muted mt-1 max-w-[180px] leading-relaxed">
          Click any block on the canvas to edit its properties here.
        </p>
      </aside>
    );
  }

  const definition = BLOCK_DEFINITIONS.find((d) => d.type === block.type);
  const blockIndex = blocks.findIndex((b) => b.id === block.id);
  const isFirst = blockIndex === 0;
  const isLast = blockIndex === blocks.length - 1;

  function set(key: string, value: unknown) {
    if (!block) return;
    onUpdate(block.id, { ...block.props, [key]: value });
  }

  return (
    <aside
      className="shrink-0 border-l border-separator/50 bg-white dark:bg-background flex flex-col overflow-hidden h-full"
      style={{ width: `${width}px` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-separator/40 bg-[#FAFAFA] dark:bg-surface/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#634CF8]/10 text-sm">
          {definition?.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground truncate">
            {definition?.label || block.type}
          </p>
          <p className="text-[10px] text-muted">Block #{blockIndex + 1}</p>
        </div>
        <button
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-white dark:hover:bg-surface transition-colors"
          title="Deselect"
          onClick={onDeselect}
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-separator/40">
        <ActionBtn
          disabled={isFirst}
          icon="↑"
          label="Up"
          onClick={() => onMoveUp(block.id)}
        />
        <ActionBtn
          disabled={isLast}
          icon="↓"
          label="Down"
          onClick={() => onMoveDown(block.id)}
        />
        <ActionBtn
          icon="⧉"
          label="Copy"
          onClick={() => onDuplicate(block.id)}
        />
        <div className="flex-1" />
        <ActionBtn
          danger
          icon="✕"
          label="Delete"
          onClick={() => onDelete(block.id)}
        />
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60 mb-3">
          Properties
        </p>

        <div className="flex flex-col gap-4">
          {/* ── Navbar ── */}
          {block.type === "navbar" && (
            <>
              <Field
                label="Logo"
                value={(block.props.logo as string) || ""}
                onChange={(v) => set("logo", v)}
              />
              <LinksEditor
                addLabel="Add nav link"
                items={(block.props.links as string[]) || []}
                label="Navigation Links"
                onChange={(links) => set("links", links)}
              />
            </>
          )}

          {/* ── Hero ── */}
          {block.type === "hero" && (
            <>
              <Field
                label="Headline"
                value={(block.props.headline as string) || ""}
                onChange={(v) => set("headline", v)}
              />
              <Field
                label="Subtitle"
                multiline
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
              <Field
                label="Button Text"
                value={(block.props.ctaText as string) || ""}
                onChange={(v) => set("ctaText", v)}
              />
              <ImagePicker
                label="Hero Image"
                value={(block.props.heroImage as string) || ""}
                onChange={(v) => set("heroImage", v)}
              />
            </>
          )}

          {/* ── Features ── */}
          {block.type === "features" && (
            <>
              <Field
                label="Section Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <Field
                label="Subtitle"
                multiline
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
              <ItemListEditor
                addLabel="Add feature"
                fields={[
                  { key: "icon", label: "Icon (emoji)", placeholder: "⚡" },
                  { key: "title", label: "Title", placeholder: "Feature name" },
                  {
                    key: "description",
                    label: "Description",
                    type: "textarea",
                    placeholder: "Describe this feature...",
                  },
                ]}
                items={
                  (block.props.items as Array<{
                    icon: string;
                    title: string;
                    description: string;
                  }>) || []
                }
                label="Feature Items"
                renderPreview={(item) => (
                  <span>
                    {item.icon} {item.title}
                  </span>
                )}
                onChange={(items) => set("items", items)}
              />
            </>
          )}

          {/* ── Testimonials ── */}
          {block.type === "testimonials" && (
            <>
              <Field
                label="Section Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <ItemListEditor
                addLabel="Add testimonial"
                fields={[
                  {
                    key: "quote",
                    label: "Quote",
                    type: "textarea",
                    placeholder: "What they said...",
                  },
                  { key: "name", label: "Name", placeholder: "Jane Doe" },
                  { key: "role", label: "Role", placeholder: "CEO at Company" },
                  {
                    key: "avatar",
                    label: "Avatar URL",
                    type: "url",
                    placeholder: "https://...",
                  },
                ]}
                items={
                  (block.props.testimonials as Array<{
                    quote: string;
                    name: string;
                    role: string;
                    avatar: string;
                  }>) || []
                }
                label="Testimonials"
                renderPreview={(item) => <span>{item.name || "Unnamed"}</span>}
                onChange={(items) => set("testimonials", items)}
              />
            </>
          )}

          {/* ── Pricing ── */}
          {block.type === "pricing" && (
            <>
              <Field
                label="Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <Field
                label="Subtitle"
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
            </>
          )}

          {/* ── Stats ── */}
          {block.type === "stats" && (
            <ItemListEditor
              addLabel="Add stat"
              fields={[
                { key: "value", label: "Value", placeholder: "10K+" },
                { key: "label", label: "Label", placeholder: "Active users" },
              ]}
              items={
                (block.props.items as Array<{
                  value: string;
                  label: string;
                }>) || []
              }
              label="Statistics"
              renderPreview={(item) => (
                <span>
                  {item.value} — {item.label}
                </span>
              )}
              onChange={(items) => set("items", items)}
            />
          )}

          {/* ── Team ── */}
          {block.type === "team" && (
            <>
              <Field
                label="Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <Field
                label="Subtitle"
                multiline
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
              <ItemListEditor
                addLabel="Add member"
                fields={[
                  { key: "name", label: "Name", placeholder: "Alex Rivera" },
                  { key: "role", label: "Role", placeholder: "CEO" },
                  {
                    key: "avatar",
                    label: "Photo URL",
                    type: "url",
                    placeholder: "https://...",
                  },
                ]}
                items={
                  (block.props.members as Array<{
                    name: string;
                    role: string;
                    avatar: string;
                  }>) || []
                }
                label="Team Members"
                renderPreview={(item) => <span>{item.name || "Unnamed"}</span>}
                onChange={(items) => set("members", items)}
              />
            </>
          )}

          {/* ── FAQ ── */}
          {block.type === "faq" && (
            <>
              <Field
                label="Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <Field
                label="Subtitle"
                multiline
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
              <ItemListEditor
                addLabel="Add question"
                fields={[
                  {
                    key: "q",
                    label: "Question",
                    placeholder: "How does it work?",
                  },
                  {
                    key: "a",
                    label: "Answer",
                    type: "textarea",
                    placeholder: "It's simple...",
                  },
                ]}
                items={
                  (block.props.items as Array<{ q: string; a: string }>) || []
                }
                label="Questions"
                renderPreview={(item) => <span>{item.q || "Untitled"}</span>}
                onChange={(items) => set("items", items)}
              />
            </>
          )}

          {/* ── CTA ── */}
          {block.type === "cta" && (
            <>
              <Field
                label="Headline"
                value={(block.props.headline as string) || ""}
                onChange={(v) => set("headline", v)}
              />
              <Field
                label="Subtitle"
                multiline
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
              <Field
                label="Button Text"
                value={(block.props.ctaText as string) || ""}
                onChange={(v) => set("ctaText", v)}
              />
            </>
          )}

          {/* ── Contact ── */}
          {block.type === "contact" && (
            <>
              <Field
                label="Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <Field
                label="Subtitle"
                multiline
                value={(block.props.subtitle as string) || ""}
                onChange={(v) => set("subtitle", v)}
              />
            </>
          )}

          {/* ── Logos ── */}
          {block.type === "logos" && (
            <>
              <Field
                label="Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <LinksEditor
                addLabel="Add company"
                items={(block.props.companies as string[]) || []}
                label="Company Names"
                onChange={(companies) => set("companies", companies)}
              />
            </>
          )}

          {/* ── Banner ── */}
          {block.type === "banner" && (
            <Field
              label="Banner Text"
              value={(block.props.text as string) || ""}
              onChange={(v) => set("text", v)}
            />
          )}

          {/* ── Gallery ── */}
          {block.type === "gallery" && (
            <>
              <Field
                label="Title"
                value={(block.props.title as string) || ""}
                onChange={(v) => set("title", v)}
              />
              <NumberField
                label="Columns"
                max={6}
                min={1}
                value={(block.props.columns as number) || 3}
                onChange={(v) => set("columns", v)}
              />
            </>
          )}

          {/* ── Footer ── */}
          {block.type === "footer" && (
            <Field
              label="Copyright"
              value={(block.props.copyright as string) || ""}
              onChange={(v) => set("copyright", v)}
            />
          )}

          {/* ── Content ── */}
          {block.type === "content" && (
            <>
              <Field
                label="Heading"
                value={(block.props.heading as string) || ""}
                onChange={(v) => set("heading", v)}
              />
              <RichTextEditor
                label="Body"
                placeholder="Write your content here..."
                value={(block.props.body as string) || ""}
                onChange={(v) => set("body", v)}
              />
            </>
          )}

          {/* ── Text ── */}
          {block.type === "text" && (
            <RichTextEditor
              label="Content"
              placeholder="Start writing..."
              value={(block.props.content as string) || ""}
              onChange={(v) => set("content", v)}
            />
          )}

          {/* ── Image ── */}
          {block.type === "image" && (
            <>
              <ImagePicker
                label="Image"
                value={(block.props.src as string) || ""}
                onChange={(v) => set("src", v)}
              />
              <Field
                label="Alt Text"
                value={(block.props.alt as string) || ""}
                onChange={(v) => set("alt", v)}
              />
              <Field
                label="Caption"
                value={(block.props.caption as string) || ""}
                onChange={(v) => set("caption", v)}
              />
            </>
          )}

          {/* ── Video ── */}
          {block.type === "video" && (
            <>
              <Field
                label="Video URL"
                value={(block.props.url as string) || ""}
                onChange={(v) => set("url", v)}
              />
              <Field
                label="Duration"
                value={(block.props.duration as string) || ""}
                placeholder="3:45"
                onChange={(v) => set("duration", v)}
              />
            </>
          )}

          {/* ── Code ── */}
          {block.type === "code" && (
            <>
              <Field
                label="Filename"
                value={(block.props.filename as string) || ""}
                placeholder="app.ts"
                onChange={(v) => set("filename", v)}
              />
              <Field
                label="Language"
                value={(block.props.language as string) || ""}
                placeholder="typescript"
                onChange={(v) => set("language", v)}
              />
              <Field
                label="Code"
                multiline
                value={(block.props.code as string) || ""}
                onChange={(v) => set("code", v)}
              />
            </>
          )}

          {/* ── HTML ── */}
          {block.type === "html" && (
            <Field
              label="HTML Code"
              multiline
              value={(block.props.html as string) || ""}
              onChange={(v) => set("html", v)}
            />
          )}

          {/* ── Columns ── */}
          {block.type === "columns" && (
            <NumberField
              label="Number of Columns"
              max={6}
              min={1}
              value={(block.props.count as number) || 2}
              onChange={(v) => set("count", v)}
            />
          )}

          {/* ── Spacer ── */}
          {block.type === "spacer" && (
            <NumberField
              label="Height (px)"
              max={400}
              min={8}
              value={(block.props.height as number) || 64}
              onChange={(v) => set("height", v)}
            />
          )}

          {/* ── Button Group ── */}
          {block.type === "button-group" && (
            <>
              <Field
                label="Primary Text"
                value={(block.props.primaryText as string) || ""}
                onChange={(v) => set("primaryText", v)}
              />
              <Field
                label="Secondary Text"
                value={(block.props.secondaryText as string) || ""}
                onChange={(v) => set("secondaryText", v)}
              />
            </>
          )}

          {/* ── Divider ── */}
          {block.type === "divider" && (
            <Field
              label="Label (optional)"
              value={(block.props.label as string) || ""}
              placeholder="Section divider text"
              onChange={(v) => set("label", v)}
            />
          )}

          {/* ── Style Overrides (all blocks) ── */}
          <BlockStyleEditor
            styles={(block.props._styles as BlockStyles) || {}}
            onChange={(styles) => set("_styles", styles)}
          />
        </div>
      </div>
    </aside>
  );
}

// ── Shared Field Components ──

function Field({
  label,
  value,
  multiline,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-muted block mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          className="w-full rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-3 py-2 text-[12px] text-foreground outline-none focus:border-[#634CF8] focus:bg-white dark:focus:bg-background transition-all resize-none h-24 leading-relaxed"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full h-9 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-3 text-[12px] text-foreground outline-none focus:border-[#634CF8] focus:bg-white dark:focus:bg-background transition-all"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-muted block mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 h-9 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-3 text-[12px] text-foreground outline-none focus:border-[#634CF8] transition-all"
          max={max}
          min={min}
          type="number"
          value={value}
          onChange={(e) =>
            onChange(
              Math.min(max, Math.max(min, parseInt(e.target.value) || min)),
            )
          }
        />
        <span className="text-[10px] text-muted tabular-nums">
          {min}–{max}
        </span>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  danger,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "flex h-7 items-center gap-1 rounded-lg px-2.5 text-[11px] font-medium transition-colors",
        disabled && "opacity-25 cursor-not-allowed",
        danger
          ? "text-danger hover:bg-danger/10"
          : "text-muted hover:text-foreground hover:bg-[#F5F5F5] dark:hover:bg-surface",
      )}
      disabled={disabled}
      title={label}
      onClick={onClick}
    >
      <span className="text-[11px]">{icon}</span>
      {label}
    </button>
  );
}

function SettingField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-muted block mb-1.5">
        {label}
      </label>
      <input
        className="w-full h-9 rounded-lg border border-separator/50 bg-[#FAFAFA] dark:bg-surface px-3 text-[12px] text-foreground outline-none focus:border-[#634CF8] transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
