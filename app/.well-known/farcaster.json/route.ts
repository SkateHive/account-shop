import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const manifest = {

  accountAssociation: {
    header: "eyJmaWQiOjIwNzIxLCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4MmQxODgyMzA0YzlBNkZhN0Y5ODdDMUI0MWM5ZkQ1RThDRjA1MTZlMiJ9",
    payload: "eyJkb21haW4iOiJiYXNlLnNrYXRlaGl2ZS5hcHAifQ",
    signature: "kdn+Gg+4DyZDPxNoGYqNiC7taU0KXcGmKoZfxI1GcswpDyzzERXUC/Le7hqdsXfT7Tg/z4zYYF9gL1gSTwWaJBw="
  },


    frame: {
      version: "1",
      name: "SkateHive Account Shop",
      iconUrl: "https://base.skatehive.app/images/account-shop.png",
      splashImageUrl: "https://base.skatehive.app/images/account-shop.png",
      splashBackgroundColor:  "#1a1a1a",
      homeUrl: "https://base.skatehive.app",
      webhookUrl: "https://base.skatehive.app/api/webhooks/farcaster",
      subtitle: "Buy SkateHive accounts with crypto",
      description: "Create your Hive blockchain account instantly by paying with ETH or USDC. Get your SkateHive account and start posting your skateboarding content on the decentralized web.",
      screenshotUrls: [
        "https://base.skatehive.app/images/account-shop.png"
      ],
      primaryCategory: "finance",
      tags: [
        "hive",
        "skateboarding", 
        "blockchain",
        "crypto",
        "account"
      ],
      heroImageUrl: "https://base.skatehive.app/images/account-shop.png",
      tagline: "Get your SkateHive account instantly",
      ogTitle: "SkateHive Account Shop",
      ogDescription: "Create your Hive blockchain account instantly by paying with ETH or USDC",
      ogImageUrl: "https://base.skatehive.app/images/account-shop.png"
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
