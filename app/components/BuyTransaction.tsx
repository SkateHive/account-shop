"use client";

import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import { parseEther, parseUnits, encodeFunctionData } from "viem";
import { RECIPIENT_ADDRESS, TOKEN_INFO, type PaymentToken } from "./constants";

interface BuyTransactionProps {
  hiveUsername: string;
  email: string;
  isUsernameValid: boolean;
  selectedToken: PaymentToken;
  onTransactionStatus: (status: LifecycleStatus) => void;
}

export default function BuyTransaction({
  hiveUsername,
  email,
  isUsernameValid,
  selectedToken,
  onTransactionStatus,
}: BuyTransactionProps) {
  const isFormValid = hiveUsername.trim() && email.trim() && isUsernameValid;

  const tokenInfo = TOKEN_INFO[selectedToken];

  // Create transaction calls based on selected token
  const calls = [];

  if (selectedToken === "ETH") {
    // Native ETH transfer
    calls.push({
      to: RECIPIENT_ADDRESS as `0x${string}`,
      value: parseEther(tokenInfo.price),
      data: `0x${Buffer.from(
        JSON.stringify({
          type: "hive-account-purchase",
          username: hiveUsername,
          email: email,
          token: selectedToken,
          timestamp: Date.now(),
          version: "1.0",
        })
      ).toString("hex")}` as `0x${string}`,
    });
  } else if (selectedToken === "USDC") {
    // ERC-20 USDC transfer
    const usdcAmount = parseUnits(tokenInfo.price, tokenInfo.decimals);

    // ERC-20 transfer function signature: transfer(address,uint256)
    const transferData = encodeFunctionData({
      abi: [
        {
          name: "transfer",
          type: "function",
          inputs: [
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          outputs: [{ name: "", type: "bool" }],
          stateMutability: "nonpayable",
        },
      ],
      functionName: "transfer",
      args: [RECIPIENT_ADDRESS, usdcAmount],
    });

    calls.push({
      to: tokenInfo.address as `0x${string}`,
      value: BigInt(0), // No ETH value for ERC-20 transfers
      data: transferData,
    });
  }

  return (
    <div className="space-y-4">
      {/* Enhanced Transaction Component */}
      <Transaction calls={calls} onStatus={onTransactionStatus}>
        <TransactionButton
          disabled={!isFormValid}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          text={`Buy Hive Account (${tokenInfo.price} ${tokenInfo.symbol})`}
        />
        <TransactionStatus>
          <TransactionStatusLabel className="text-center font-medium" />
          <TransactionStatusAction className="mt-2" />
        </TransactionStatus>
      </Transaction>

      {/* Form Validation Message */}
      {!isFormValid &&
        hiveUsername.trim() &&
        email.trim() &&
        !isUsernameValid && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 dark:text-red-400">⚠️</span>
              <p className="text-sm text-red-700 dark:text-red-300">
                Please choose an available username before proceeding
              </p>
            </div>
          </div>
        )}

      {/* Payment Details */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
          Payment Details:
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Price:</span>
            <span className="ml-2 font-mono">
              {tokenInfo.price} {tokenInfo.symbol}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Network:</span>
            <span className="ml-2">Base</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600 dark:text-gray-400">Username:</span>
            <span className="ml-2 font-mono">{hiveUsername || "Not set"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
