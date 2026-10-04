export interface EmailMessage {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(message: EmailMessage, key: string, apiKey: string, transport: typeof fetch = fetch): Promise<string> {
  const response = await transport("https://api.resend.com/emails", {
    method: "POST", signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify(message),
  });
  if (!response.ok) throw new Error(`ResendHTTP${response.status}`);
  const body: unknown = await response.json();
  if (!body || typeof body !== "object" || !("id" in body) || typeof body.id !== "string") throw new Error("ResendInvalidResponse");
  return body.id;
}
