import { Gloock, Instrument_Sans, JetBrains_Mono } from "next/font/google";

// A client build swaps these three families and nothing else (DESIGN.md section 3).

export const display = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const body = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Only used for 12px labels, so it is not worth a preload on the LCP path.
export const label = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
  preload: false,
});
