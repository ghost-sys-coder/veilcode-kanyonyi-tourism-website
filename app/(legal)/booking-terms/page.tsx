import { PolicyPage } from "@/features/policies/components/policy-page";
import { bookingTerms } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata("/booking-terms");
export default function BookingTermsPage() { return <PolicyPage content={bookingTerms} href="/booking-terms" />; }
