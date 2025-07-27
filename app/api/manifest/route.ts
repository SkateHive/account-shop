import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const manifest = {
    accountAssociation: {
      header: process.env.FARCASTER_HEADER || "",
      payload: process.env.FARCASTER_PAYLOAD || "",
      signature: process.env.FARCASTER_SIGNATURE || ""
    },
    frame: {
      version: "1",
      name: "SkateHive Account Shop",
      iconUrl: process.env.NEXT_PUBLIC_ICON_URL || `${process.env.NEXT_PUBLIC_URL}/images/account-shop.png`,
      splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE_URL || `${process.env.NEXT_PUBLIC_URL}/images/account-shop.png`,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#1a1a1a",
      homeUrl: process.env.NEXT_PUBLIC_URL || "https://account-shop.skatehive.app",
      webhookUrl: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/farcaster`,
      subtitle: "Buy Hive accounts with crypto",
      description: "Create your Hive blockchain account instantly by paying with ETH or USDC. Get your SkateHive account and start posting your skateboarding content on the decentralized web.",
      screenshotUrls: [
        process.env.NEXT_PUBLIC_IMAGE_URL || `${process.env.NEXT_PUBLIC_URL}/images/account-shop.png`
      ],
      primaryCategory: "finance",
      tags: [
        "hive",
        "skateboarding", 
        "blockchain",
        "crypto",
        "account"
      ],
      heroImageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || `${process.env.NEXT_PUBLIC_URL}/images/account-shop.png`,
      tagline: "Get your Hive account instantly",
      ogTitle: "SkateHive Account Shop",
      ogDescription: "Create your Hive blockchain account instantly by paying with ETH or USDC",
      ogImageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || `${process.env.NEXT_PUBLIC_URL}/images/account-shop.png`
    }
  };

  return NextResponse.json(manifest);
}
