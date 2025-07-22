# Component Structure

This app has been organized into reusable components for better maintainability and code organization.

## Components

### `/app/components/`

- **`Header.tsx`** - Wallet connection header with OnchainKit wallet components
- **`SkateHiveAccountShop.tsx`** - Main shop component that orchestrates the purchase flow
- **`HiveAccountForm.tsx`** - Form for collecting username and email
- **`BuyTransaction.tsx`** - OnchainKit transaction component for ETH payment
- **`TransactionSuccess.tsx`** - Success message after payment confirmation
- **`OnchainKitLinks.tsx`** - Documentation links section
- **`constants.ts`** - Configuration constants (price, recipient address, links)

## Key Features

1. **Modular Design**: Each component has a single responsibility
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Easy Configuration**: All settings centralized in `constants.ts`
4. **Transaction Handling**: Clean separation of transaction logic
5. **Responsive UI**: Tailwind CSS for responsive design

## Configuration

Edit `app/components/constants.ts` to configure:

- `ACCOUNT_PRICE_ETH`: Price for Hive account creation
- `RECIPIENT_ADDRESS`: Address to receive payments (⚠️ CHANGE THIS!)

## Usage

The main `App` component in `page.tsx` is now clean and simple, importing and using the organized components.

## Transaction Flow

1. User fills form (username + email)
2. User clicks buy button
3. OnchainKit handles transaction
4. Transaction success triggers alert + placeholder Hive account creation
5. Success screen shows with option to create another account
