import { emails } from "@/lib/content/emails";
import { fill } from "@/lib/content/format";
import { formatUsd } from "@/lib/content/money";
import { planYourTrip } from "@/lib/content/pages";
import { getTour } from "@/lib/content/tours";
import type { EmailMessage } from "@/services/email/resend";
import { getEnquiryMonths } from "../options";
import { receivedAt, replyBy } from "../reply-by";
import type { EnquiryInput } from "../schema";

export interface EmailContext {
  reference: string;
  input: EnquiryInput;
  estimate: number | null;
  now: Date;
  demo: boolean;
  siteUrl: string;
  whatsapp: string;
  fromAddress: string;
  replyTo: string;
  notifyTo: string;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function enquiryLabels(input: EnquiryInput, now: Date) {
  return {
    firstName: input.name.split(/\s+/)[0],
    tourName: getTour(input.tour)?.name ?? planYourTrip.form.fields.tour.custom,
    month: getEnquiryMonths(now).find(({ value }) => value === input.travelMonth)?.label ?? planYourTrip.form.fields.travelMonth.notSure,
    flexibility: input.flexibility ? planYourTrip.form.fields.flexibility.options[input.flexibility as keyof typeof planYourTrip.form.fields.flexibility.options] : "",
  };
}

export function buildTravellerEmail(ctx: EmailContext): EmailMessage {
  const { input, reference, demo } = ctx;
  const copy = demo ? emails.traveller.demo : emails.traveller.live;
  const labels = enquiryLabels(input, ctx.now);
  const estimate = ctx.estimate === null ? planYourTrip.form.estimate.customValue : formatUsd(ctx.estimate);
  const month = labels.month + (labels.flexibility ? ` (${labels.flexibility})` : "");
  const rows = [
    [emails.labels.reference, reference], [emails.labels.trip, labels.tourName], [emails.labels.month, month],
    [emails.labels.travellers, `${input.travellers}${!demo && input.anyoneUnder15 === "yes" ? emails.under15Suffix : ""}`],
    [emails.labels.estimate, `${estimate}${demo ? "" : ` ${emails.liveEstimateNote}`}`],
  ];
  const greeting = fill(emails.greeting, labels);
  const signature: string[] = [...copy.signature];
  if (demo) signature.push(`${emails.traveller.demo.contactPrefix} ${ctx.whatsapp} ${emails.traveller.demo.contactSuffix}`);
  const extraText = demo
    ? `${emails.traveller.demo.demoHeading}\n\n${emails.traveller.demo.demoBody}`
    : `${fill(emails.traveller.live.contact, { number: ctx.whatsapp, reference })}\n\n${emails.traveller.live.guidesIntro}\n${emails.traveller.live.guides.map((g) => `${g.label} → ${new URL(g.href, ctx.siteUrl).href}`).join("\n")}`;
  const paragraph = (text: string) => `<p style="margin:0 0 20px;line-height:1.6">${escapeHtml(text)}</p>`;
  const extraHtml = demo
    ? `<h2 style="font-size:20px">${escapeHtml(emails.traveller.demo.demoHeading)}</h2>${paragraph(emails.traveller.demo.demoBody)}`
    : `${paragraph(fill(emails.traveller.live.contact, { number: ctx.whatsapp, reference }))}${paragraph(emails.traveller.live.guidesIntro)}<ul>${emails.traveller.live.guides.map((g) => `<li><a style="color:#0F3B33" href="${escapeHtml(new URL(g.href, ctx.siteUrl).href)}">${escapeHtml(g.label)}</a></li>`).join("")}</ul>`;
  return {
    from: `${copy.fromName} <${ctx.fromAddress}>`, to: input.email, reply_to: ctx.replyTo,
    subject: fill(copy.subject, { reference }),
    text: [greeting, copy.intro, rows.map(([k, v]) => `${k}: ${v}`).join("\n"), copy.nextHeading, copy.steps.map((s, i) => `${i + 1}. ${s}`).join("\n"), extraText, signature.join("\n")].join("\n\n"),
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#F2F4EF;color:#10221D;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(copy.preheader)}</div><table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:24px"><table role="presentation" style="width:100%;max-width:600px;margin:auto;background:#FFFFFF;border-collapse:collapse"><tr><td style="padding:28px">${paragraph(greeting)}${paragraph(copy.intro)}<table style="width:100%;border-collapse:collapse;margin:20px 0">${rows.map(([k, v]) => `<tr><th scope="row" style="text-align:left;padding:12px 8px;border-bottom:1px solid #D5DDD6;font-size:14px">${escapeHtml(k)}</th><td style="padding:12px 8px;border-bottom:1px solid #D5DDD6;overflow-wrap:anywhere">${escapeHtml(v)}</td></tr>`).join("")}</table><h2 style="font-size:20px;color:#0F3B33">${escapeHtml(copy.nextHeading)}</h2><ol style="padding-left:24px;line-height:1.6">${copy.steps.map((s) => `<li style="margin-bottom:12px">${escapeHtml(s)}</li>`).join("")}</ol>${extraHtml}${paragraph(signature.join("\n")).replace(/\n/g, "<br>")}</td></tr></table></td></tr></table></body></html>`,
  };
}

export function buildOperatorEmail(ctx: EmailContext): EmailMessage {
  const { input, reference } = ctx;
  const labels = enquiryLabels(input, ctx.now);
  const copy = emails.operator;
  const line = (key: keyof typeof copy.labels, value: string | number) => `${copy.labels[key].padEnd(15)}${value}`;
  return {
    from: `${emails.traveller.live.fromName} <${ctx.fromAddress}>`, to: ctx.notifyTo, reply_to: input.email,
    subject: fill(copy.subject, { reference, tourName: labels.tourName, month: labels.month, n: input.travellers }),
    text: [
      fill(copy.heading, { reference }), fill(copy.received, { dateTime: receivedAt(ctx.now) }), "",
      line("trip", labels.tourName), line("month", labels.month + (labels.flexibility ? ` (${labels.flexibility})` : "")),
      line("travellers", `${input.travellers}   ${copy.labels.under15} ${input.anyoneUnder15 ?? copy.notGiven}`),
      line("residency", planYourTrip.form.fields.residency.options[input.residency]),
      line("estimate", ctx.estimate === null ? planYourTrip.form.estimate.customValue : formatUsd(ctx.estimate)), "",
      line("name", input.name), line("email", input.email), line("whatsapp", input.whatsapp || copy.notGiven), "",
      copy.labels.notes, input.notes ?? "", "", line("source", input.sourcePath), line("reply", replyBy(ctx.now)),
    ].join("\n"),
  };
}
