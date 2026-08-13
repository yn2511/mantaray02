import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_KR } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { InstagramLink } from "@/components/InstagramLink";
import { MailLink } from "@/components/MailLink";
import { SiteChrome } from "@/features/navigation";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mantaray02.com"),
  title: {
    default: "Manta Ray",
    template: "%s · Manta Ray",
  },
  description: "Manta Ray — 가오리 / 김가을. Photographer.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://mantaray02.com",
    siteName: "Manta Ray",
    title: "Manta Ray",
    description: "Manta Ray — 가오리 / 김가을. Photographer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${dmSans.variable} ${noto.variable}`}>
      <body>
        <CustomCursor />
        <SiteChrome />
        <main className="site-main">{children}</main>
        <InstagramLink />
        <MailLink />
      </body>
    </html>
  );
}
