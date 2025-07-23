// Configuration - easily adjustable for developers
export const ACCOUNT_PRICE_ETH = '0.0015'; // Price in ETH for account creation
export const ACCOUNT_PRICE_USDC = '3.50'; // Price in USDC for account creation (assuming ~$3.50 worth)

export const RECIPIENT_ADDRESS = '0xB4964e1ecA55Db36a94e8aeFfBFBAb48529a2f6c' as const; // Skatehive hot wallet address

// Token addresses on Base network
export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const; // USDC on Base

export type PaymentToken = 'ETH' | 'USDC';

export const TOKEN_INFO = {
  ETH: {
    symbol: 'ETH',
    price: ACCOUNT_PRICE_ETH,
    address: null, // Native token
    decimals: 18,
  },
  USDC: {
    symbol: 'USDC',
    price: ACCOUNT_PRICE_USDC,
    address: USDC_ADDRESS,
    decimals: 6,
  },
} as const; 

