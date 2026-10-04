import { PolicyPage } from "@/features/policies/components/policy-page";
import { privacy } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata = pageMetadata("/privacy");
export default function PrivacyPage() { return <PolicyPage content={privacy} href="/privacy" />; }
