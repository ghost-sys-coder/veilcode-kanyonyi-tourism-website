import { site } from "@/content/site";

// WhatsApp routing (AGENTS.md section 0). The number is public, so it lives in a NEXT_PUBLIC_ var.

const DIGITS = /^\d{8,15}$/;

export function normaliseWhatsAppNumber(value: string | undefined): string | null {
  const digits = (value ?? "").replace(/\D/g, "");
  return DIGITS.test(digits) ? digits : null;
}

/** "256750242627" -> "+256 750 242627" for Ugandan numbers; other countries get "+{digits}". */
export function formatWhatsAppNumber(digits: string): string {
  const uganda = /^256(\d{3})(\d{6})$/.exec(digits);
  return uganda ? `+256 ${uganda[1]} ${uganda[2]}` : `+${digits}`;
}

export const whatsappNumber = normaliseWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

export const whatsappDisplay = whatsappNumber ? formatWhatsAppNumber(whatsappNumber) : null;

export function whatsappHref(message: string = site.whatsapp.demoPrefill): string | null {
  if (!whatsappNumber) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
