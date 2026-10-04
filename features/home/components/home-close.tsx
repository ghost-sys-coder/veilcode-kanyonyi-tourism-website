import { whatsappHref } from "@/config/contact";
import { CloseCta } from "@/components/layout/close-cta";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { home } from "@/lib/content/pages";

export function HomeClose() {
  const content = home.close;
  const href = whatsappHref();
  return <CloseCta sun content={{ heading: content.h2, body: content.body, button: { label: content.primary, target: "enquiry" } }}
    secondary={href ? <WhatsAppLink href={href} location="closing_cta" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{content.secondary}</WhatsAppLink> : undefined} />;
}
