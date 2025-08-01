import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://base.skatehive.app";

const frameObject = {
  version: "1",
  imageUrl: `${BASE_URL}/images/account-shop.png`,
  button: {
    title: "Get SkateHive Account",
    action: {
      type: "launch_frame",
      name: "SkateHive",
      url: BASE_URL,
    },
  },
};

export const metadata: Metadata = {
  title: "SkateHive Account Shop - Buy Your Hive Account with Crypto",
  description:
    "Create your Hive blockchain account instantly by paying with ETH or USDC. Get your SkateHive account and start posting your skateboarding content on the decentralized web.",
  keywords: [
    "Hive",
    "SkateHive",
    "Skateboarding",
    "Blockchain",
    "Account Creation",
    "ETH",
    "USDC",
    "Crypto Payment",
    "MiniKit",
    "Farcaster",
    "Base App",
    "Mini App",
  ],
  authors: [{ name: "SkateHive" }],
  openGraph: {
    title: "SkateHive Account Shop",
    description:
      "Create your Skatehive account instantly paying with ETH or USDC.",
    url: process.env.NEXT_PUBLIC_URL || "https://base.skatehive.app",
    siteName: "SkateHive Account Shop",
    images: [
      {
        url: process.env.NEXT_PUBLIC_IMAGE_URL || "/images/account-shop.png",
        width: 1200,
        height: 630,
        alt: "SkateHive Account Shop - Buy Hive Accounts with Crypto",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkateHive Account Shop",
    description:
      "Create your Skatehive account instantly paying with ETH or USDC.",
    images: [process.env.NEXT_PUBLIC_IMAGE_URL || "/images/account-shop.png"],
    creator: "@skatehive",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  other: {
    "fc:miniapp": JSON.stringify(frameObject),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
