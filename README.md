# SkateHive Account Shop

A Next.js web application that enables users to purchase Hive blockchain accounts using cryptocurrency payments. Built with OnchainKit for seamless Web3 transactions.

## Goals & Purpose

The SkateHive Account Shop aims to:

- **Simplify Hive Onboarding**: Remove the traditional barriers to joining the Hive blockchain by providing an easy way to purchase accounts with crypto
- **Bridge Web3 Communities**: Connect existing cryptocurrency users to the Hive ecosystem through familiar payment methods
- **Support SkateHive Growth**: Enable the skateboarding community to easily join SkateHive's decentralized platform on Hive
- **Automate Account Creation**: Streamline the process of Hive account creation and credential delivery via email
- **Provide Transparent Pricing**: Offer fixed, transparent pricing for Hive accounts (currently 0.0000001 ETH)

### Key Features

- **Username Validation**: Real-time checking of Hive username availability and format validation
- **Crypto Payments**: Secure payments using Ethereum and other supported cryptocurrencies via OnchainKit
- **Email Delivery**: Automated delivery of account credentials to the user's email address
- **Transaction Tracking**: Full transparency with transaction hash tracking and status updates
- **Mobile-Friendly**: Responsive design optimized for both desktop and mobile users

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Web3 Integration**: OnchainKit for cryptocurrency transactions
- **Blockchain**: Hive blockchain for account creation via @hiveio/dhive
- **State Management**: React hooks and TanStack Query for server state
- **Wallet Integration**: Wagmi for Ethereum wallet connections

## Project Structure

- `app/components/SkateHiveAccountShop.tsx` - Main shop component orchestrating the purchase flow
- `app/components/HiveAccountForm.tsx` - Username validation and email input form
- `app/components/BuyTransaction.tsx` - Crypto payment transaction handling
- `app/components/TransactionSuccess.tsx` - Success state and account creation confirmation
- `app/lib/hiveUtils.ts` - Hive blockchain utilities for username validation
- `app/lib/hiveClient.ts` - Hive client configuration

## Learn More

- [SkateHive Community](https://skatehive.app) - Join the decentralized skateboarding community
- [Hive Blockchain](https://hive.io) - Learn about the Hive blockchain ecosystem
- [OnchainKit Documentation](https://onchainkit.xyz/getting-started) - Web3 transaction toolkit
- [Next.js Documentation](https://nextjs.org/docs) - React framework for production

## Contributing

This project is part of the SkateHive ecosystem. Contributions are welcome! Please ensure that any changes maintain the security and reliability of the account creation process.

## License

See the [LICENSE](LICENSE) file for details.
