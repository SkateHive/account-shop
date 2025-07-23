# SkateHive Account Shop

A Next.js web application that enables users to purchase Hive blockchain accounts using cryptocurrency payments on the Base network. Built with Coinbase's OnchainKit for seamless Web3 transactions and automated account creation.

## 🎯 Goals & Purpose

The SkateHive Account Shop aims to:

- **Simplify Hive Onboarding**: Remove the traditional barriers to joining the Hive blockchain by providing an easy way to purchase accounts with crypto
- **Bridge Web3 Communities**: Connect existing cryptocurrency users to the Hive ecosystem through familiar payment methods (ETH/USDC)
- **Support SkateHive Growth**: Enable the skateboarding community to easily join SkateHive's decentralized platform on Hive
- **Automate Account Creation**: Streamline the process of Hive account creation and credential delivery via email
- **Provide Transparent Pricing**: Fixed, transparent pricing for Hive accounts (0.0015 ETH or $3.50 USDC)

### ✨ Key Features

- **Real-time Username Validation**: Live checking of Hive username availability and format validation
- **Multi-Token Support**: Accept payments in ETH and USDC on Base network
- **Automated Account Creation**: Direct integration with Hive blockchain for instant account creation
- **Smart Fallback System**: Uses account creation tokens when available, falls back to HIVE payments
- **Email Credential Delivery**: Secure delivery of account credentials and keys via email
- **Transaction Tracking**: Full transparency with Base network transaction hash tracking
- **Mobile-First Design**: Responsive design with glow effects optimized for all devices
- **Debug Mode**: Built-in transaction status monitoring for development and troubleshooting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- A Hive account with account creation tokens or HIVE for creating accounts
- SMTP email service for credential delivery
- Base network access for crypto payments

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Hive Account Creation
ACCOUNT_CREATOR=your-hive-account-name
ACCOUNT_CREATOR_ACTIVE_KEY=your-hive-active-private-key

# Email Configuration (SMTP)
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
EMAIL_COMMUNITY=community-email@domain.com
EMAIL_RECOVERYACC=recovery-email@domain.com

# Optional: OnchainKit Configuration (if needed)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-coinbase-api-key
```

#### Environment Variable Details

- **ACCOUNT_CREATOR**: Your Hive account that will create new accounts (must have account creation tokens or HIVE)
- **ACCOUNT_CREATOR_ACTIVE_KEY**: The active private key for the account creator
- **SMTP_***: Email service configuration for sending account credentials
- **EMAIL_COMMUNITY**: Email address for community-related correspondence
- **EMAIL_RECOVERYACC**: Email address for account recovery assistance

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SkateHive/account-shop.git
   cd account-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

### Configuration

You can adjust pricing and wallet addresses in `app/components/constants.ts`:

```typescript
export const ACCOUNT_PRICE_ETH = '0.0015'; // Price in ETH
export const ACCOUNT_PRICE_USDC = '3.50'; // Price in USDC
export const RECIPIENT_ADDRESS = '0xYourWalletAddress'; // Payment recipient
```

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Web3 Integration**: Coinbase OnchainKit for Base network transactions
- **Blockchain Integration**: 
  - Base network for payments (ETH/USDC)
  - Hive blockchain for account creation via @hiveio/dhive
- **State Management**: React hooks and TanStack Query for server state
- **Wallet Integration**: Wagmi v2 for Ethereum wallet connections
- **Email Service**: Nodemailer for SMTP credential delivery
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - @codaworks/react-glow for premium glow effects
- **Development**: TypeScript, ESLint, and Next.js development tools

## 📁 Project Structure

```
app/
├── components/
│   ├── SkateHiveAccountShop.tsx    # Main shop component & payment flow
│   ├── HiveAccountForm.tsx         # Username validation & email input
│   ├── BuyTransaction.tsx          # OnchainKit transaction handling
│   ├── TransactionSuccess.tsx      # Success state & confirmation
│   └── constants.ts                # Payment configuration & addresses
├── lib/
│   ├── hiveUtils.ts               # Hive blockchain utilities
│   ├── hiveClient.ts              # Hive client configuration
│   ├── serverConfig.ts            # Environment variable management
│   └── invite/
│       ├── emailService.ts        # Email credential delivery
│       ├── template.ts            # Email templates
│       └── localization.ts        # Email localization
├── api/
│   ├── create-account/route.ts    # Hive account creation endpoint
│   ├── health/route.ts            # Health check endpoint
│   └── invite/route.ts            # Email invitation endpoint
├── globals.css                    # Global styles
├── layout.tsx                     # App layout & providers
├── page.tsx                       # Main page
└── providers.tsx                  # OnchainKit & Wagmi providers
```

## 🔄 How It Works

1. **User Input**: User enters desired Hive username and email address
2. **Validation**: Real-time validation checks username availability on Hive blockchain
3. **Payment Selection**: User chooses between ETH or USDC payment on Base network
4. **Transaction**: OnchainKit handles the crypto payment transaction
5. **Account Creation**: Backend creates Hive account using account creation tokens or HIVE
6. **Credential Delivery**: Account keys and login information sent via email
7. **Confirmation**: User receives transaction hash and account creation confirmation

## 🔧 API Endpoints

### `POST /api/create-account`
Creates a new Hive account and sends credentials via email.

**Request Body:**
```json
{
  "username": "skatehive-user",
  "email": "user@example.com",
  "txHash": "0x...",
  "selectedToken": "ETH"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hive account created and credentials sent via email",
  "account": {
    "username": "skatehive-user",
    "hiveTransactionId": "abc123...",
    "method": "claimed"
  }
}
```

### `GET /api/health`
Health check endpoint for monitoring application status.

### `POST /api/invite`
Email invitation system for sending account information.

## 🔐 Security Considerations

- **Private Keys**: Store Hive active keys securely in environment variables
- **Email Security**: Use app-specific passwords for email services
- **Wallet Security**: OnchainKit handles wallet connections securely
- **Input Validation**: All user inputs are validated on both client and server
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Transaction Verification**: Base network transaction hashes are verified before account creation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed on any Node.js hosting platform:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🧪 Testing

### Manual Testing
- Use the built-in debug mode to monitor transaction status
- Test with small amounts first
- Verify email delivery in different email clients

### Environment Testing
```bash
# Check environment configuration
npm run dev
# Navigate to /api/health to verify setup
```

## 🔧 Troubleshooting

### Common Issues

1. **"Missing required environment variables"**
   - Ensure all variables in `.env.local` are set
   - Check for typos in variable names

2. **"Failed to create Hive account"**
   - Verify your account creator has sufficient account creation tokens or HIVE
   - Check that the active key is correct

3. **"Email not delivered"**
   - Verify SMTP configuration
   - Check spam folders
   - Test email credentials separately

4. **"Transaction not found"**
   - Ensure you're on the Base network
   - Check transaction hash in Base block explorer

### Debug Mode
Enable debug mode in the application to see detailed transaction status and manually force success for testing.

## 📊 Monitoring

The application includes:
- Health check endpoint at `/api/health`
- Console logging for all major operations
- Transaction status tracking
- Email delivery confirmation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain comprehensive error handling
- Test all payment flows thoroughly
- Update documentation for new features
- Ensure security best practices

## 📞 Support

- **SkateHive Community**: [Discord](https://discord.gg/skatehive)
- **Technical Issues**: Open an issue on GitHub
- **Account Recovery**: Contact support with transaction hash

## 📝 Learn More

- [SkateHive Community](https://skatehive.app) - Join the decentralized skateboarding community
- [Hive Blockchain](https://hive.io) - Learn about the Hive blockchain ecosystem
- [OnchainKit Documentation](https://onchainkit.xyz) - Web3 transaction toolkit
- [Base Network](https://base.org) - Ethereum L2 for secure, low-cost transactions
- [Next.js Documentation](https://nextjs.org/docs) - React framework for production

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the SkateHive Community**

*Bringing Web3 to skateboarding, one account at a time.* 🛹
