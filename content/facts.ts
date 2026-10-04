import type { ISODate, PermitRow } from "@/types/content";

// Time-sensitive facts shown as tables in more than one place. Source and checks:
// docs/copy/12-fact-register.md. When a fee changes, update the register, this file and the
// prose that repeats it (tests/unit/content-integrity.test.ts lists those strings).

export const factsCheckedOn: ISODate = "2026-10-04";

export const gorillaPermitRows: PermitRow[] = [
  { visitor: "Foreign non-resident", standard: "USD 800", lowSeason2026: "USD 600", from2027: "USD 800" },
  {
    visitor: "Foreign resident",
    visitorLong: "Foreign resident (with a valid Ugandan or East African residence permit)",
    standard: "USD 700",
    lowSeason2026: "USD 500",
    from2027: "USD 700",
  },
  { visitor: "Rest of Africa", standard: "USD 500", lowSeason2026: "Ask us", from2027: "USD 500" },
  { visitor: "East African citizen", standard: "UGX 300,000", lowSeason2026: "UGX 300,000", from2027: "UGX 300,000" },
];

export const permitTables = {
  home: {
    columns: ["Visitor", "Standard", "April, May, November 2026"],
    stamp: "Checked 4 October 2026 against Uganda Wildlife Authority rates.",
  },
  guide: {
    columns: ["Visitor", "Standard rate", "April, May, November 2026", "From 1 January 2027"],
    stamp:
      "Checked 4 October 2026 against Uganda Wildlife Authority rates. Low-season rates for 2027 had not been published when we checked.",
  },
} as const;
