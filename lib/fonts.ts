import { Literata, Public_Sans, Roboto_Mono } from "next/font/google";

// Only the weights docs/design-source.md uses:
// Literata 400 (and italic) and 600; Public Sans 400, 500, 600; Roboto Mono 500, 600.
// The CSS variables are read by app/globals.css.

export const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const fontVariables = [literata.variable, publicSans.variable, robotoMono.variable].join(
  " ",
);
