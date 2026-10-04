import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { ui } from "@/content/ui";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/schema";

/**
 * Visible breadcrumb plus matching BreadcrumbList JSON-LD, built from the same crumbs so the two
 * can never disagree (002 section 10). Pass the trail after "Home"; the last crumb is the page.
 */
export function SiteBreadcrumb({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: ui.breadcrumbs.home, href: "/" }, ...trail];

  return (
    <>
      <Breadcrumb aria-label={ui.a11y.breadcrumbLabel}>
        <BreadcrumbList className="text-body-s">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <Fragment key={crumb.href}>
                <BreadcrumbItem>
                  {last ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={crumb.href} />}>{crumb.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {last ? null : <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
