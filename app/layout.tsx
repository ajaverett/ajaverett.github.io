import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ajaverett.github.io";
const description =
  "AJ Averett's single-page interactive résumé, with expandable context for his work across data science, engineering, machine learning, education, and civic data.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AJ Averett — Data Scientist",
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AJ Averett — Data Scientist",
    description,
    images: [
      {
        url: `${siteUrl}/og-v2.png`,
        width: 1731,
        height: 909,
        alt: "AJ Averett's one-page résumé with a colorful interactive peek emerging from a highlighted line.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Averett — Data Scientist",
    description,
    images: [`${siteUrl}/og-v2.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
