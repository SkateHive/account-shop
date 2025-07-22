// Configuration - easily adjustable for developers
export const ACCOUNT_PRICE_ETH = '0.0000001'; // Price in ETH for account creation

// TODO: Replace with your actual recipient address for receiving payments
export const RECIPIENT_ADDRESS = '0x41CB654D1F47913ACAB158a8199191D160DAbe4A' as const; // Placeholder address - CHANGE THIS!

export const components = [
  {
    name: 'Transaction',
    url: 'https://onchainkit.xyz/transaction/transaction',
  },
  { name: 'Swap', url: 'https://onchainkit.xyz/swap/swap' },
  { name: 'Checkout', url: 'https://onchainkit.xyz/checkout/checkout' },
  { name: 'Wallet', url: 'https://onchainkit.xyz/wallet/wallet' },
  { name: 'Identity', url: 'https://onchainkit.xyz/identity/identity' },
];

export const templates = [
  { name: 'NFT', url: 'https://github.com/coinbase/onchain-app-template' },
  { name: 'Commerce', url: 'https://github.com/coinbase/onchain-commerce-template'},
  { name: 'Fund', url: 'https://github.com/fakepixels/fund-component' },
];
