import { llms } from "@/content/llms";

/** Builds the llms.txt body. Pure, so it can be tested without a server. */
export function buildLlmsTxt({ origin, demo }: { origin: string; demo: boolean }): string {
  const parts = [llms.heading, llms.summary, ...(demo ? [llms.demoNote] : []), llms.sections];
  return `${parts.join("\n\n").replaceAll("{SITE}", origin)}\n`;
}
