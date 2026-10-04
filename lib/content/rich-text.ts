import type { RichText } from "@/types/content";

// RichText supports exactly three inline marks, because the copy deck uses no others:
// **bold**, *italic* and [label](href). Anything else is plain text.

export type RichTextToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "link"; label: string; href: string };

const MARKS = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseRichText(input: RichText): RichTextToken[] {
  const tokens: RichTextToken[] = [];
  let cursor = 0;

  for (const match of input.matchAll(MARKS)) {
    const start = match.index;
    if (start > cursor) tokens.push({ type: "text", value: input.slice(cursor, start) });

    const [, bold, italic, label, href] = match;
    if (bold !== undefined) tokens.push({ type: "bold", value: bold });
    else if (italic !== undefined) tokens.push({ type: "italic", value: italic });
    else tokens.push({ type: "link", label, href });

    cursor = start + match[0].length;
  }

  if (cursor < input.length) tokens.push({ type: "text", value: input.slice(cursor) });
  return tokens;
}

/** Plain-text form for meta tags, JSON-LD, emails and llms.txt. */
export function richTextToPlain(input: RichText): string {
  return parseRichText(input)
    .map((token) => (token.type === "link" ? token.label : token.value))
    .join("");
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
