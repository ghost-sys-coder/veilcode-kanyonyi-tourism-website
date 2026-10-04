"use client";

import { useActionState, useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { CircleAlertIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { whatsappHref } from "@/config/contact";
import { track } from "@/lib/analytics/track";
import { fill } from "@/lib/content/format";
import { planYourTrip, ui } from "@/lib/content/pages";
import { submitEnquiry } from "../actions/submit-enquiry";
import { flexibilityOptions, residencyOptions, tourOptions, under15Options } from "../options";
import { readFormData, validateEnquiry, type FieldErrors } from "../schema";
import { initialEnquiryState, type EnquiryState } from "../state";
import { EnquiryField } from "./enquiry-field";
import { EnquirySelect } from "./enquiry-select";
import { EnquiryRadio } from "./enquiry-radio";
import { TravellerStepper } from "./traveller-stepper";
import { EnquiryEstimate } from "./enquiry-estimate";
import { EnquirySuccess } from "./enquiry-success";

export function EnquiryForm({ preselectedTour, months, attribution }: {
  preselectedTour?: string; months: { value: string; label: string }[];
  attribution: { utmSource: string; utmMedium: string; utmCampaign: string };
}) {
  // The direct action/permalink provides a working POST before hydration or without JS.
  // The hydrated onSubmit awaits the same action to catch a dropped connection locally.
  const [serverState, formAction, actionPending] = useActionState(submitEnquiry, initialEnquiryState, "/plan-your-trip");
  const [clientState, setClientState] = useState<EnquiryState | null>(null);
  const [transitionPending, startTransition] = useTransition();
  const state = clientState ?? serverState;
  const saved = serverState.status === "invalid" ? serverState.values : {};
  const [values, setValues] = useState({ tour: saved.tour || preselectedTour || null, travelMonth: saved.travelMonth || null, flexibility: saved.flexibility || undefined, travellers: Number(saved.travellers || 2), anyoneUnder15: saved.anyoneUnder15 || undefined, residency: saved.residency || null, name: saved.name || "", email: saved.email || "", whatsapp: saved.whatsapp || "", notes: saved.notes || "", consent: saved.consent === "on" });
  const [blurErrors, setBlurErrors] = useState<FieldErrors>({});
  const summary = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const pending = actionPending || transitionPending;
  const copy = planYourTrip.form;
  const fields = copy.fields;
  const errors = state.status === "invalid" ? { ...state.fieldErrors, ...blurErrors } : blurErrors;
  const entries = Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1]));
  const href = whatsappHref();

  function sourcePath() {
    try { const referrer = new URL(document.referrer); if (referrer.origin === location.origin) return referrer.pathname.slice(0, 200); } catch {}
    return "/plan-your-trip";
  }
  function begin() {
    if (!started.current) { started.current = true; track("start_enquiry", { tour_slug: values.tour ?? "", source_path: sourcePath() }); }
  }
  function change<K extends keyof typeof values>(key: K, value: typeof values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setBlurErrors((previous) => ({ ...previous, [key]: undefined }));
    if (state.status === "invalid") setClientState({ ...state, fieldErrors: { ...state.fieldErrors, [key]: undefined } });
  }
  const describedBy = (id: string, help = false) => [help ? `${id}-help` : "", errors[id as keyof FieldErrors] ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

  useEffect(() => {
    if (state.status === "invalid" || state.status === "network_error" || state.status === "server_error" || state.status === "rate_limited") summary.current?.focus();
  }, [state]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || state.status === "success") return;
    begin();
    const data = new FormData(event.currentTarget);
    data.set("sourcePath", sourcePath());
    const raw = readFormData(data);
    const result = validateEnquiry(raw, new Date());
    setBlurErrors({});
    if (!raw.website && !result.parsed.success) { setClientState({ status: "invalid", fieldErrors: result.fieldErrors, values: raw }); return; }
    startTransition(async () => {
      try { setClientState(await submitEnquiry(state, data)); }
      catch { setClientState({ status: "network_error" }); }
    });
  }

  if (state.status === "success") return <EnquirySuccess state={state} />;
  const failure = state.status === "network_error" ? ui.form.networkFailure : state.status === "server_error" ? ui.form.serverFailure : state.status === "rate_limited" ? ui.form.rateLimit : null;
  return <form ref={form} action={formAction} onSubmit={submit} noValidate aria-label={ui.buttons.sendEnquiry} aria-busy={pending} className="min-w-0"
    onFocusCapture={begin} onBlurCapture={(event) => {
      const field = (event.target as HTMLElement).closest<HTMLElement>("[name]")?.getAttribute("name");
      if (!field || !form.current) return;
      const checked = validateEnquiry(readFormData(new FormData(form.current)), new Date());
      if (field in fields) setBlurErrors((previous) => ({ ...previous, [field]: checked.fieldErrors[field as keyof FieldErrors] }));
    }}>
    <noscript><style>{".enquiry-enhanced { display: none !important; }"}</style></noscript>
    <FieldGroup>
      {(state.status === "invalid" || failure) && <div ref={summary} tabIndex={-1} role="alert" className="rounded-sm border border-destructive bg-destructive/5 p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring">
        <p className="flex items-start gap-2 font-semibold text-destructive"><CircleAlertIcon aria-hidden className="mt-0.5 size-5 shrink-0" />{failure ?? fill(copy.errorSummary, { n: entries.length }).replace("thing(s)", entries.length === 1 ? "thing" : "things")}</p>
        {!failure && <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">{entries.map(([key, message]) => <li key={key}><a href={`#${key}`} className="text-primary underline underline-offset-4" onClick={(event) => { event.preventDefault(); document.getElementById(key)?.focus(); }}>{message}</a></li>)}</ul>}
        {failure && href && <WhatsAppLink href={href} location="plan_page" className="mt-3 inline-flex min-h-11 items-center text-primary underline underline-offset-4">{ui.buttons.chatOnWhatsApp}</WhatsAppLink>}
      </div>}
      <EnquirySelect id="tour" label={fields.tour.label} placeholder={fields.tour.placeholder} items={tourOptions} value={values.tour} onValueChange={(v) => change("tour", v)} error={errors.tour} disabled={pending} />
      <EnquirySelect id="travelMonth" label={fields.travelMonth.label} placeholder={fields.travelMonth.placeholder} items={months} value={values.travelMonth} onValueChange={(v) => change("travelMonth", v)} error={errors.travelMonth} disabled={pending} />
      <EnquiryRadio id="flexibility" label={fields.flexibility.label} options={flexibilityOptions} value={values.flexibility} onValueChange={(v) => change("flexibility", v)} error={errors.flexibility} disabled={pending} />
      <TravellerStepper value={values.travellers} onValueChange={(v) => change("travellers", v)} error={errors.travellers} disabled={pending} />
      <EnquiryRadio id="anyoneUnder15" label={fields.anyoneUnder15.label} options={under15Options} value={values.anyoneUnder15} onValueChange={(v) => change("anyoneUnder15", v)} help={fields.anyoneUnder15.help} error={errors.anyoneUnder15} disabled={pending} />
      <EnquirySelect id="residency" label={fields.residency.label} placeholder={fields.residency.placeholder} items={residencyOptions} value={values.residency} onValueChange={(v) => change("residency", v)} error={errors.residency} disabled={pending} />
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <EnquiryField id="name" label={fields.name.label} required error={errors.name}><Input id="name" name="name" autoComplete="name" maxLength={120} required value={values.name} onChange={(e) => change("name", e.target.value)} disabled={pending} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} /></EnquiryField>
        <EnquiryField id="email" label={fields.email.label} required error={errors.email}><Input id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={values.email} onChange={(e) => change("email", e.target.value)} disabled={pending} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} /></EnquiryField>
      </div>
      <EnquiryField id="whatsapp" label={fields.whatsapp.label} help={fields.whatsapp.help} error={errors.whatsapp}><Input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" maxLength={32} value={values.whatsapp} onChange={(e) => change("whatsapp", e.target.value)} disabled={pending} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={describedBy("whatsapp", true)} /></EnquiryField>
      <EnquiryField id="notes" label={fields.notes.label} error={errors.notes}><Textarea id="notes" name="notes" maxLength={2000} rows={4} placeholder={fields.notes.placeholder} value={values.notes} onChange={(e) => change("notes", e.target.value)} disabled={pending} aria-invalid={Boolean(errors.notes)} aria-describedby={describedBy("notes")} /></EnquiryField>
      <EnquiryEstimate tour={values.tour} travellers={values.travellers} />
      <div>
        <div className="enquiry-enhanced flex items-start gap-3">
          <Checkbox id="consent" name="consent" value="on" checked={values.consent} onCheckedChange={(v) => change("consent", v)} disabled={pending} required aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy("consent")} className="mt-1" />
          <FieldLabel htmlFor="consent" className="block text-body-s font-normal">{fields.consent.label} <span className="text-muted-foreground">{ui.form.requiredMarker}</span></FieldLabel>
        </div>
        <noscript><label className="flex items-start gap-3"><input id="consent-native" name="consent" type="checkbox" value="on" defaultChecked={values.consent} required />{fields.consent.label}</label></noscript>
        {errors.consent && <FieldError id="consent-error" className="mt-2 flex gap-2"><CircleAlertIcon aria-hidden className="size-4 shrink-0" />{errors.consent}</FieldError>}
      </div>
      <div aria-hidden="true" className="absolute -left-[10000px] top-0"><Input name="website" type="text" tabIndex={-1} autoComplete="off" aria-label="website" /></div>
      <input type="hidden" name="sourcePath" value="/plan-your-trip" />
      {Object.entries(attribution).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      <Button type="submit" variant="sun" disabled={pending} className="w-full sm:w-fit">{pending ? copy.sending : copy.submit}<ArrowRightIcon aria-hidden /></Button>
      <p className="text-body-s text-muted-foreground"><Link href="/privacy" className="underline underline-offset-4">{copy.belowButton}</Link></p>
    </FieldGroup>
  </form>;
}
