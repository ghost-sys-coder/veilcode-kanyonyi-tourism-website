"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CurrencyToggle } from "@/components/layout/currency-toggle";
import { WhatsAppIcon } from "@/components/layout/whatsapp-icon";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

export function MobileMenu({ whatsappHref }: { whatsappHref: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" aria-label={ui.mobileMenu.open} />}>
        <MenuIcon className="size-6" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-full max-w-sm gap-0 bg-background p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <SheetTitle className="font-heading text-[1.375rem] font-normal">{site.operator.logoText}</SheetTitle>
          <SheetClose render={<Button variant="ghost" size="icon" aria-label={ui.mobileMenu.close} />}>
            <XIcon className="size-6" aria-hidden />
          </SheetClose>
        </div>
        <div className="border-b px-4 py-3 sm:hidden">
          <CurrencyToggle />
        </div>
        <nav aria-label={ui.a11y.mainNavLabel} className="flex flex-col px-4 py-4">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center border-b text-lg font-medium",
                    pathname === item.href && "text-primary underline underline-offset-4",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={site.headerCta.href}
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-6")}
          >
            {site.headerCta.label}
          </Link>
          {whatsappHref ? (
            <div className="mt-6 flex flex-col gap-2">
              <WhatsAppLink
                href={whatsappHref}
                location="header_menu"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4"
              >
                <WhatsAppIcon className="size-5" />
                {ui.buttons.chatOnWhatsApp}
              </WhatsAppLink>
              <p className="text-body-s text-muted-foreground">{site.whatsapp.replyHours}</p>
            </div>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
