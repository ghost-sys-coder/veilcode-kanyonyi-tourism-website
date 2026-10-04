import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Development-only reference for the S1 "done when" check (docs/plan.md). Never served in production.
// Sample strings are taken from docs/copy so nothing here is invented copy.

export const metadata: Metadata = { title: "Style guide", robots: { index: false, follow: false } };

const tripItems = [
  { label: "Choose a trip", value: null },
  { label: "3-Day Bwindi Gorilla Trek", value: "3-day-bwindi-gorilla-trek" },
  { label: "7-Day Primates and Savannah", value: "7-day-primates-and-savannah" },
];

const swatches = [
  ["background", "bg-background"], ["card", "bg-card"], ["primary", "bg-primary"], ["secondary", "bg-secondary"],
  ["sun", "bg-sun"], ["clay", "bg-clay"], ["band", "bg-band"], ["border", "bg-border"], ["input", "bg-input"],
  ["success", "bg-success"], ["warning", "bg-warning"], ["destructive", "bg-destructive"],
] as const;

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="container-page section-y flex flex-col gap-14">
      <section className="flex flex-col gap-4">
        <p className="eyebrow">3 days · Bwindi Impenetrable</p>
        <h1 className="text-display-xl">Private gorilla treks and safaris in <em>Uganda</em></h1>
        <h2 className="text-display-l">The gorilla permit decides your dates</h2>
        <h3 className="text-display-m">3-Day Bwindi Gorilla Trek</h3>
        <p className="measure-lede text-body-l">
          Groups of up to six. One driver-guide from Entebbe arrivals to your flight home.
        </p>
        <p className="measure">
          Bwindi&apos;s gorilla families can each receive eight visitors a day, and permits are sold by date.
        </p>
        <p className="text-body-s text-muted-foreground">Checked 4 October 2026 against Uganda Wildlife Authority rates.</p>
        <p className="price text-display-l">$1,650</p>
      </section>

      <section className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {swatches.map(([name, cls]) => (
          <div key={name} className="flex flex-col gap-1.5">
            <div className={`h-14 rounded-sm border ${cls}`} />
            <span className="font-mono text-label">{name}</span>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <Button variant="sun" size="cta">Find trips</Button>
        <Button>Plan my trip</Button>
        <Button variant="outline">See itinerary</Button>
        <Button variant="secondary">Clear filters</Button>
        <Button variant="link">Read the guide</Button>
        <Button disabled>Sending…</Button>
        <Badge variant="tag">Most booked</Badge>
        <Badge variant="success">Good in July</Badge>
        <Badge variant="warning">Cheaper permits</Badge>
      </section>

      <section className="grid max-w-xl grid-cols-1 gap-6">
        <Field>
          <FieldLabel htmlFor="sg-tour">Which trip? (required)</FieldLabel>
          <Select items={tripItems}>
            <SelectTrigger id="sg-tour" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tripItems.map((item) => (
                <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="sg-name">Your name (required)</FieldLabel>
          <Input id="sg-name" autoComplete="name" />
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="sg-email">Email (required)</FieldLabel>
          <Input id="sg-email" type="email" aria-invalid aria-describedby="sg-email-error" defaultValue="name@" />
          <FieldError id="sg-email-error" errors={[{ message: "Enter an email address like name@example.com." }]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="sg-phone">WhatsApp or phone number</FieldLabel>
          <Input id="sg-phone" type="tel" autoComplete="tel" />
          <FieldDescription>
            Include your country code, for example +44 or +256. We&apos;ll only use it to reach you about this trip.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="sg-notes">Anything else we should know?</FieldLabel>
          <Textarea id="sg-notes" placeholder="Celebrating something? Prefer to fly rather than drive?" />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="sg-consent" />
          <FieldLabel htmlFor="sg-consent">
            I agree that Kanyonyi can use these details to reply to my enquiry, as described in the privacy notice.
          </FieldLabel>
        </Field>
        <ToggleGroup variant="outline" defaultValue={["all"]} className="flex-wrap">
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="gorillas-and-chimps">Gorillas and chimps</ToggleGroupItem>
          <ToggleGroupItem value="savannah-wildlife">Savannah wildlife</ToggleGroupItem>
        </ToggleGroup>
      </section>

      <section className="grid max-w-xl grid-cols-1 gap-4">
        <Alert className="border-success bg-success-surface text-success">
          <CircleCheckIcon aria-hidden />
          <AlertTitle>Enquiry received</AlertTitle>
          <AlertDescription className="text-success">Your reference is KX-1001.</AlertDescription>
        </Alert>
        <Alert className="border-warning bg-warning-surface text-warning">
          <CircleAlertIcon aria-hidden />
          <AlertTitle>Travelling in 2027?</AlertTitle>
          <AlertDescription className="text-warning">The Uganda Wildlife Authority&apos;s new rates start on 1 January 2027.</AlertDescription>
        </Alert>
      </section>

      <section className="grid max-w-sm grid-cols-1">
        <Card className="transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-md motion-reduce:transform-none">
          <CardHeader>
            <p className="eyebrow">3 days · Bwindi Impenetrable</p>
            <CardTitle className="font-heading text-display-m font-normal">3-Day Bwindi Gorilla Trek</CardTitle>
          </CardHeader>
          <CardContent>
            Drive to Bwindi, trek to a habituated gorilla family, drive back. The shortest gorilla trip that works.
          </CardContent>
          <CardFooter className="justify-between">
            <span className="flex flex-col">
              <span className="text-body-s text-muted-foreground">From, per person sharing</span>
              <span className="price text-display-m">$1,650</span>
            </span>
            <Button variant="link">See itinerary</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
