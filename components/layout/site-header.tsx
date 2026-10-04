import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CurrencyToggle } from "@/components/layout/currency-toggle";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { whatsappHref } from "@/config/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          {/* Below 640px the toggle moves into the mobile menu so the menu button always fits. */}
          <div className="hidden sm:block">
            <CurrencyToggle />
          </div>
          {/* Forest, never sun: the sun button belongs to the page's main action (DESIGN.md section 2). */}
          {/* A real link styled as a button: Base UI's Button with nativeButton={false} adds
              role="button", which tells screen readers a navigation link is a button. */}
          <Link href={site.headerCta.href} className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            {site.headerCta.label}
          </Link>
          <div className="lg:hidden">
            <MobileMenu whatsappHref={whatsappHref()} />
          </div>
        </div>
      </div>
    </header>
  );
}
