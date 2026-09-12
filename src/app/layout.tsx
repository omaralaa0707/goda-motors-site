import type { Metadata } from "next";
import { Big_Shoulders, Albert_Sans, Noto_Kufi_Arabic, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A tall, condensed display face for a dealer whose photography is
// genuinely cinematic — under one fixed ring light, every time — paired
// with a clean neutral body for the specification underneath each line.
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-big-shoulders",
});
const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-albert-sans",
});
const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-kufi",
});
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Goda Motors — a line before a spec | Cairo",
  description:
    "Every post opens on a short sentence before the mileage, and every car is lit by the same suspended ring fixture. A dealership page built around a dealer's own editorial voice and studio light.",
  metadataBase: new URL("https://goda-motors-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Goda Motors — a line before a spec",
    description: "A dealership page modelled on their own suspended ring light and the sentence that opens every post.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#e6e4e1" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${bigShoulders.variable} ${albertSans.variable} ${notoKufi.variable} ${vazirmatn.variable}`}
    >
      <body className="bg-ground text-ink antialiased">
        {/* Content is "said" in under an intersection observer, so without
            scripting every block would stay invisible. */}
        <noscript>
          <style>{`[data-said],[data-said-rule]{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
