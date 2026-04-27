import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import clsx from "clsx";

/**
 * Notion-like rich text editor using Tiptap.
 * Supports: bold, italic, underline, strikethrough, headings, lists, links, text alignment.
 */
export function RichTextEditor({
  value,
  label,
  placeholder,
  onChange,
}: {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder: placeholder || "Start writing..." }),
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div>
      {label && (
        <label className="text-[11px] font-semibold text-muted block mb-1.5">
          {label}
        </label>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 rounded-t-lg border border-b-0 border-separator/50 bg-[#F5F5F5] dark:bg-surface/80 px-1.5 py-1">
        <ToolbarBtn
          active={editor.isActive("bold")}
          label="B"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarBtn
          active={editor.isActive("italic")}
          label="I"
          style="italic"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarBtn
          active={editor.isActive("underline")}
          label="U"
          style="underline"
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarBtn
          active={editor.isActive("strike")}
          label="S"
          style="line-through"
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <div className="w-px h-4 bg-separator/40 mx-0.5" />

        <ToolbarBtn
          active={editor.isActive("heading", { level: 1 })}
          label="H1"
          title="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 2 })}
          label="H2"
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 3 })}
          label="H3"
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />

        <div className="w-px h-4 bg-separator/40 mx-0.5" />

        <ToolbarBtn
          active={editor.isActive("bulletList")}
          label="•"
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarBtn
          active={editor.isActive("orderedList")}
          label="1."
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarBtn
          active={editor.isActive("blockquote")}
          label="❝"
          title="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />

        <div className="w-px h-4 bg-separator/40 mx-0.5" />

        <ToolbarBtn
          active={editor.isActive({ textAlign: "left" })}
          label="≡"
          title="Align Left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <ToolbarBtn
          active={editor.isActive({ textAlign: "center" })}
          label="≡"
          title="Align Center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <ToolbarBtn
          active={editor.isActive({ textAlign: "right" })}
          label="≡"
          title="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />

        <div className="w-px h-4 bg-separator/40 mx-0.5" />

        <ToolbarBtn
          label="🔗"
          title="Link"
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        />
      </div>

      {/* Editor */}
      <div className="rounded-b-lg border border-separator/50 bg-white dark:bg-background overflow-hidden">
        <EditorContent
          className="prose prose-sm max-w-none px-3 py-2 min-h-[120px] max-h-[300px] overflow-y-auto text-[12px] text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted/40 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
          editor={editor}
        />
      </div>
    </div>
  );
}

function ToolbarBtn({
  label,
  title,
  active,
  style,
  onClick,
}: {
  label: string;
  title: string;
  active?: boolean;
  style?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "flex h-6 min-w-[24px] items-center justify-center rounded text-[10px] font-semibold transition-colors",
        active
          ? "bg-[#634CF8]/15 text-[#634CF8]"
          : "text-muted hover:text-foreground hover:bg-white dark:hover:bg-background",
      )}
      title={title}
      onClick={onClick}
    >
      <span style={{ textDecoration: style }}>{label}</span>
    </button>
  );
}
