import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ajaverett.github.io";
const description =
  "An interactive résumé exploring Alan Averett's work across data science, engineering, machine learning, and education.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alan J. Averett — Data Scientist",
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Alan J. Averett — Data Scientist",
    description,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1730,
        height: 909,
        alt: "Alan J. Averett's résumé unfolding into a vibrant data visualization.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan J. Averett — Data Scientist",
    description,
    images: [`${siteUrl}/og.png`],
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
