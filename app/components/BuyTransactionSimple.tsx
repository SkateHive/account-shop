// Alternative BuyTransaction component WITHOUT metadata (for cleaner wallet preview)

"use client";

import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";
import { ACCOUNT_PRICE_ETH, RECIPIENT_ADDRESS } from "./constants";

interface BuyTransactionProps {
  hiveUsername: string;
  email: string;
  isUsernameValid: boolean;
  onTransactionStatus: (status: LifecycleStatus) => void;
}

export default function BuyTransactionSimple({
  hiveUsername,
  email,
  isUsernameValid,
  onTransactionStatus,
}: BuyTransactionProps) {
  const isFormValid = hiveUsername.trim() && email.trim() && isUsernameValid;

  // Simple transaction without metadata for clean wallet preview
  const calls = [
    {
      to: RECIPIENT_ADDRESS as `0x${string}`,
      value: parseEther(ACCOUNT_PRICE_ETH),
      // No data field = wallet can show exact preview
    },
  ];

  return (
    <div className="space-y-4">
      {/* Clean Transaction Info */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <span className="text-green-600 dark:text-green-400">✅</span>
          <p className="text-sm text-green-700 dark:text-green-300">
            <strong>Simple ETH Transfer:</strong> Your wallet will show the
            exact transaction preview.
          </p>
        </div>
      </div>

      {/* Transaction Component */}
      <Transaction calls={calls} onStatus={onTransactionStatus}>
        <TransactionButton
          disabled={!isFormValid}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          text={`Buy Hive Account (${ACCOUNT_PRICE_ETH} ETH)`}
        />
        <TransactionStatus>
          <TransactionStatusLabel className="text-center font-medium" />
          <TransactionStatusAction className="mt-2" />
        </TransactionStatus>
      </Transaction>

      {/* Wallet Compatibility Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 dark:text-blue-400">💼</span>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Any wallet supported:</strong> MetaMask, Coinbase Wallet,
            WalletConnect, Farcaster, TBA wallets, and more!
          </p>
        </div>
      </div>

      {/* Purchase Details Tracking Note */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
          Order Details (tracked off-chain):
        </h4>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div>Username: {hiveUsername || "Not set"}</div>
          <div>Email: {email || "Not set"}</div>
          <div>Price: {ACCOUNT_PRICE_ETH} ETH</div>
          <div>Network: Base</div>
        </div>
      </div>
    </div>
  );
}

// Usage: Replace BuyTransaction with BuyTransactionSimple in SkateHiveAccountShop.tsx
// This version will show clean wallet previews but loses on-chain metadata tracking
