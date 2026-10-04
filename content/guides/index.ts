import type { Guide, GuidesIndex } from "@/types/content";
import { bestTimeGuide } from "./best-time-to-visit-uganda";
import { gorillaPermitsGuide } from "./uganda-gorilla-permits";
import { whatToPackGuide } from "./what-to-pack-gorilla-trekking-safari";

export const guides: Guide[] = [gorillaPermitsGuide, bestTimeGuide, whatToPackGuide];

// /guides page copy, docs/copy/06-guides.md "Guides index".
export const guidesIndex = {
  eyebrow: "Planning guides",
  h1: "Uganda travel guides",
  intro:
    "The three questions that shape every Uganda trip: how gorilla permits work, when to go, and what to bring. Each guide is checked against official sources and dated.",
  close: {
    lead: "Still have questions?",
    whatsappLabel: "Chat on WhatsApp",
    faqLead: "or see the",
    faqLabel: "FAQ",
  },
} satisfies GuidesIndex;
