import Link from "next/link";
import { ui } from "@/content/ui";
import { isExternalHref, parseRichText } from "@/lib/content/rich-text";
import type { RichText } from "@/types/content";

/** Renders a RichText string. Server component; output is inline, so wrap it in <p> or <li>. */
export function Inline({ text }: { text: RichText }) {
  return parseRichText(text).map((token, index) => {
    switch (token.type) {
      case "bold":
        return <strong key={index}>{token.value}</strong>;
      case "italic":
        return <em key={index}>{token.value}</em>;
      case "link":
        return isExternalHref(token.href) ? (
          <a
            key={index}
            href={token.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            {token.label}
            <span className="sr-only"> {ui.a11y.externalLinkSuffix}</span>
          </a>
        ) : (
          <Link key={index} href={token.href} className="text-primary underline underline-offset-4">
            {token.label}
          </Link>
        );
      default:
        return token.value;
    }
  });
}
