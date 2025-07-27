# MiniKit Setup Instructions

## Converting SkateHive Account Shop to a MiniKit Mini App

Your SkateHive Account Shop has been converted to work as a Farcaster mini app using MiniKit. Follow these steps to deploy and test:

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from [CDP Portal](https://portal.cdp.coinbase.com/)
- `NEXT_PUBLIC_URL`: Your deployed app URL (e.g., https://your-app.vercel.app)

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY
vercel env add NEXT_PUBLIC_URL
# ... add other env vars
```

### 4. Set up Farcaster Manifest

Once deployed, run:

```bash
npx create-onchain --manifest
```

This will:

1. Open a browser to connect your Farcaster custody wallet
2. Generate the manifest signature
3. Update your `.env.local` with the manifest variables

Then add these to your Vercel environment:

- `FARCASTER_HEADER`
- `FARCASTER_PAYLOAD`
- `FARCASTER_SIGNATURE`

### 5. Test Your Mini App

1. Copy your deployed Vercel URL
2. Visit the [Farcaster Manifest Tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
3. Paste your URL and tap Submit
4. Test in Farcaster dev tools

### Features Added

Your mini app now includes:

- **Frame Management**: Save/remove frame functionality
- **Profile Viewing**: View user profiles
- **Notifications**: Send notifications to users who saved your frame
- **Close Button**: Allow users to close the frame
- **External Links**: Open links in the parent app

### MiniKit Hooks Used

- `useMiniKit`: Core frame initialization
- `useAddFrame`: Save frame to user's list
- `useOpenUrl`: Open external URLs
- `useClose`: Close the frame
- `useViewProfile`: View user profiles
- `useNotification`: Send notifications

The original functionality of your SkateHive Account Shop remains intact while adding mini app capabilities!
