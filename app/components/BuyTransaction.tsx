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

export default function BuyTransaction({
  hiveUsername,
  email,
  isUsernameValid,
  onTransactionStatus,
}: BuyTransactionProps) {
  // Transaction calls - simple ETH transfer
  const calls = [
    {
      to: RECIPIENT_ADDRESS as `0x${string}`,
      value: parseEther(ACCOUNT_PRICE_ETH),
      data: "0x" as `0x${string}`,
    },
  ];

  const isFormValid = hiveUsername.trim() && email.trim() && isUsernameValid;
  
  return (
    <div>
      <Transaction calls={calls} onStatus={onTransactionStatus}>
        <TransactionButton
          disabled={!isFormValid}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          text={`Buy Hive Account (${ACCOUNT_PRICE_ETH} ETH)`}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
      
      {!isFormValid && hiveUsername.trim() && email.trim() && !isUsernameValid && (
        <p className="text-sm text-red-600 text-center mt-2">
          Please choose an available username before proceeding
        </p>
      )}
    </div>
  );
}
