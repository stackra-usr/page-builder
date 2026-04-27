import type { BlockInstance, BlockType } from "../types";
import { createBlockId } from "../data";

/** Module-level clipboard store — survives page switches within session */
let clipboardStore: { type: BlockType; props: Record<string, unknown> } | null =
  null;

export function useClipboard() {
  const copy = (block: BlockInstance) => {
    clipboardStore = {
      type: block.type,
      props: JSON.parse(JSON.stringify(block.props)),
    };
  };

  const paste = (
    _afterBlockId: string | null,
    _blocks: BlockInstance[],
  ): BlockInstance | null => {
    if (!clipboardStore) return null;

    const newBlock: BlockInstance = {
      id: createBlockId(),
      type: clipboardStore.type,
      props: JSON.parse(JSON.stringify(clipboardStore.props)),
    };

    return newBlock;
  };

  return {
    copiedBlock: clipboardStore,
    copy,
    paste,
    hasCopied: clipboardStore !== null,
  };
}
