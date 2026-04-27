import { Button, Drawer, TextField, InputGroup, Label } from "@heroui/react";

import type { BlockInstance } from "../types";
import { BLOCK_DEFINITIONS } from "../data";

export function PropertyDrawer({
  block,
  isOpen,
  onClose,
  onUpdate,
}: {
  block: BlockInstance | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (blockId: string, props: Record<string, unknown>) => void;
}) {
  if (!block) return null;

  const definition = BLOCK_DEFINITIONS.find((d) => d.type === block.type);

  function handlePropChange(key: string, value: unknown) {
    if (!block) return;
    onUpdate(block.id, { ...block.props, [key]: value });
  }

  return (
    <Drawer.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Drawer.Content placement="right">
        <Drawer.Dialog className="w-[360px]">
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading className="flex items-center gap-2">
              <span className="text-lg">{definition?.icon}</span>
              {definition?.label || block.type}
            </Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body>
            <div className="flex flex-col gap-4">
              {/* Dynamic property fields based on block type */}
              {block.type === "hero" && (
                <>
                  <TextField
                    value={(block.props.headline as string) || ""}
                    onChange={(v) => handlePropChange("headline", v)}
                  >
                    <Label>Headline</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Enter headline..." />
                    </InputGroup>
                  </TextField>
                  <TextField
                    value={(block.props.subtitle as string) || ""}
                    onChange={(v) => handlePropChange("subtitle", v)}
                  >
                    <Label>Subtitle</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Enter subtitle..." />
                    </InputGroup>
                  </TextField>
                  <TextField
                    value={(block.props.ctaText as string) || ""}
                    onChange={(v) => handlePropChange("ctaText", v)}
                  >
                    <Label>Button Text</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Get Started" />
                    </InputGroup>
                  </TextField>
                </>
              )}

              {block.type === "navbar" && (
                <>
                  <TextField
                    value={(block.props.logo as string) || ""}
                    onChange={(v) => handlePropChange("logo", v)}
                  >
                    <Label>Logo Text</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Your Brand" />
                    </InputGroup>
                  </TextField>
                  <div>
                    <Label className="mb-2 block text-sm">
                      Navigation Links
                    </Label>
                    <p className="text-xs text-muted">
                      Current:{" "}
                      {((block.props.links as string[]) || []).join(", ") ||
                        "None"}
                    </p>
                  </div>
                </>
              )}

              {block.type === "cta" && (
                <>
                  <TextField
                    value={(block.props.headline as string) || ""}
                    onChange={(v) => handlePropChange("headline", v)}
                  >
                    <Label>Headline</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Ready to get started?" />
                    </InputGroup>
                  </TextField>
                  <TextField
                    value={(block.props.subtitle as string) || ""}
                    onChange={(v) => handlePropChange("subtitle", v)}
                  >
                    <Label>Subtitle</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Join us today." />
                    </InputGroup>
                  </TextField>
                  <TextField
                    value={(block.props.ctaText as string) || ""}
                    onChange={(v) => handlePropChange("ctaText", v)}
                  >
                    <Label>Button Text</Label>
                    <InputGroup>
                      <InputGroup.Input placeholder="Start Building" />
                    </InputGroup>
                  </TextField>
                </>
              )}

              {block.type === "text" && (
                <TextField
                  value={(block.props.content as string) || ""}
                  onChange={(v) => handlePropChange("content", v)}
                >
                  <Label>Content</Label>
                  <InputGroup>
                    <InputGroup.Input placeholder="Enter text content..." />
                  </InputGroup>
                </TextField>
              )}

              {block.type === "footer" && (
                <TextField
                  value={(block.props.copyright as string) || ""}
                  onChange={(v) => handlePropChange("copyright", v)}
                >
                  <Label>Copyright Text</Label>
                  <InputGroup>
                    <InputGroup.Input placeholder="© 2026 Your Company" />
                  </InputGroup>
                </TextField>
              )}

              {block.type === "features" && (
                <TextField
                  value={(block.props.title as string) || ""}
                  onChange={(v) => handlePropChange("title", v)}
                >
                  <Label>Section Title</Label>
                  <InputGroup>
                    <InputGroup.Input placeholder="Features" />
                  </InputGroup>
                </TextField>
              )}

              {[
                "spacer",
                "divider",
                "image",
                "testimonials",
                "pricing",
              ].includes(block.type) && (
                <p className="text-sm text-muted">
                  This block uses default settings. More customization options
                  coming soon.
                </p>
              )}
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button slot="close" variant="secondary">
              Done
            </Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
