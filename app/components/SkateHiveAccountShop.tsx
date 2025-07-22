"use client";

import { useState } from "react";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import HiveAccountForm from "./HiveAccountForm";
import BuyTransaction from "./BuyTransaction";
import TransactionSuccess from "./TransactionSuccess";
import { ACCOUNT_PRICE_ETH } from "./constants";

// Placeholder function for Hive account creation
const createHiveAccount = async (
  username: string,
  email: string,
  txHash: string
) => {
  console.log("TODO: Create Hive account", { username, email, txHash });
  // TODO: Implement Hive account creation API call
  // TODO: Send credentials via email
  alert(
    `TODO: Creating Hive account for ${username} and sending credentials to ${email}`
  );
};

export default function SkateHiveAccountShop() {
  const [hiveUsername, setHiveUsername] = useState("");
  const [email, setEmail] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  // Handle transaction status changes
  const handleTransactionStatus = (status: LifecycleStatus) => {
    console.log("Transaction status:", status);

    if (status.statusName === "success") {
      const txHash =
        status.statusData?.transactionReceipts?.[0]?.transactionHash || null;
      setTransactionHash(txHash);

      // Alert for successful transaction
      alert(`Payment confirmed! Transaction hash: ${txHash}`);

      // TODO: Trigger Hive account creation here
      createHiveAccount(hiveUsername, email, txHash || "");
    }
  };

  const handleCreateAnother = () => {
    setTransactionHash(null);
    setHiveUsername("");
    setEmail("");
    setIsUsernameValid(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        SkateHive Account Shop
      </h2>
      <p className="text-center mb-4 text-gray-600 dark:text-gray-300">
        Create your Hive account for {ACCOUNT_PRICE_ETH} ETH
      </p>

      {!transactionHash && (
        <>
          <HiveAccountForm
            hiveUsername={hiveUsername}
            email={email}
            onUsernameChange={setHiveUsername}
            onEmailChange={setEmail}
            onValidationChange={setIsUsernameValid}
          />

          <BuyTransaction
            hiveUsername={hiveUsername}
            email={email}
            isUsernameValid={isUsernameValid}
            onTransactionStatus={handleTransactionStatus}
          />
        </>
      )}

      {transactionHash && (
        <TransactionSuccess
          email={email}
          transactionHash={transactionHash}
          onCreateAnother={handleCreateAnother}
        />
      )}
    </div>
  );
}
