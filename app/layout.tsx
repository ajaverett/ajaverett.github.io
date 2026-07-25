import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "ajaverett.github.io";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description =
    "An interactive résumé exploring Alan Averett's work across data science, engineering, machine learning, and education.";

  return {
    metadataBase: new URL(origin),
    title: "Alan J. Averett — Data Scientist",
    description,
    openGraph: {
      type: "website",
      url: origin,
      title: "Alan J. Averett — Data Scientist",
      description,
      images: [
        {
          url: `${origin}/og.png`,
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
      images: [`${origin}/og.png`],
    },
  };
}

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
