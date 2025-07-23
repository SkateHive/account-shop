"use client";

import { useState } from "react";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import HiveAccountForm from "./HiveAccountForm";
import BuyTransaction from "./BuyTransaction";
import TransactionSuccess from "./TransactionSuccess";
import { ACCOUNT_PRICE_ETH } from "./constants";
import ImageSvg from "../svg/Image";

// Function for creating actual Hive account and sending credentials
const createHiveAccount = async (
  username: string,
  email: string,
  txHash: string
) => {
  console.log("🚀 Starting Hive account creation process", {
    username,
    email,
    txHash,
  });

  try {
    // Create the actual Hive account directly
    console.log("🔑 Creating Hive account...");
    const accountCreationResponse = await fetch("/api/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        txHash,
      }),
    });

    const accountResult = await accountCreationResponse.json();

    if (accountResult.success) {
      const method =
        accountResult.account?.method === "claimed"
          ? "account creation tokens"
          : "HIVE payment";
      console.log(`✅ Hive account created successfully using ${method}!`);

      if (accountResult.warning) {
        alert(
          `⚠️ Account created but there was an issue: ${accountResult.warning}`
        );
      } else {
        alert(
          `🎉 Success! Your Hive account "${username}" has been created and credentials sent to ${email}!\n\nMethod: ${method}\nHive Transaction: ${accountResult.account?.hiveTransactionId}`
        );
      }
    } else {
      console.error("❌ Failed to create Hive account:", accountResult.error);
      alert(
        `❌ Failed to create Hive account: ${accountResult.error}\n\nDon't worry - your ETH payment was successful. Please contact support with your transaction hash: ${txHash}`
      );
    }
  } catch (error) {
    console.error("❌ Error in account creation process:", error);
    alert(
      `❌ Error during account creation: ${
        error instanceof Error ? error.message : "Unknown error"
      }\n\nYour ETH payment was successful. Please contact support with your transaction hash: ${txHash}`
    );
  }
};

export default function SkateHiveAccountShop() {
  const [hiveUsername, setHiveUsername] = useState("");
  const [email, setEmail] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [showDebug, setShowDebug] = useState(false);
  const [transactionKey, setTransactionKey] = useState(0); // Force re-render of Transaction component

  // Handle transaction status changes
  const handleTransactionStatus = (status: LifecycleStatus) => {
    console.log("Transaction status:", status);
    setCurrentStatus(
      `${new Date().toLocaleTimeString()}: ${status.statusName}`
    );

    // Check for successful transaction - OnchainKit uses different status names
    const isSuccess =
      status.statusName === "success" ||
      status.statusName === "transactionLegacyExecuted";

    if (isSuccess) {
      let txHash = null;

      // Try to extract transaction hash from different possible locations
      if (status.statusData && "transactionReceipts" in status.statusData) {
        txHash =
          status.statusData.transactionReceipts?.[0]?.transactionHash || null;
      } else if (
        status.statusData &&
        "transactionHashList" in status.statusData
      ) {
        txHash = status.statusData.transactionHashList?.[0] || null;
      }

      // For transactionLegacyExecuted, we might need to wait a bit for the hash
      if (!txHash && status.statusName === "transactionLegacyExecuted") {
        console.log("Transaction executed but no hash yet, will retry...");
        // Set a timeout to check again
        setTimeout(() => {
          if (!transactionHash) {
            // Use a placeholder hash or force success after execution
            const placeholderHash =
              "0x" + Date.now().toString(16).padStart(64, "0");
            setTransactionHash(placeholderHash);
            createHiveAccount(hiveUsername, email, placeholderHash);
            alert(
              `Transaction completed! Using placeholder hash: ${placeholderHash}`
            );
          }
        }, 3000);
        return;
      }

      if (txHash) {
        setTransactionHash(txHash);
        alert(`Payment confirmed! Transaction hash: ${txHash}`);
        createHiveAccount(hiveUsername, email, txHash);
      }
    }
  };

  const handleCreateAnother = () => {
    setTransactionHash(null);
    setHiveUsername("");
    setEmail("");
    setIsUsernameValid(false);
    setCurrentStatus("");
    setTransactionKey((prev) => prev + 1); // Force Transaction component to re-render
  };

  const resetTransaction = () => {
    setCurrentStatus("");
    setTransactionKey((prev) => prev + 1); // Force Transaction component to re-render
    alert("Transaction reset. You can try again.");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
      <div className="w-1/3 mx-auto mb-6">
        <ImageSvg />
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">
        Buy Skatehive Account
      </h2>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
        Create your Hive account for {ACCOUNT_PRICE_ETH} ETH
      </p>

      {/* Simple Debug Toggle */}
      {currentStatus && (
        <div className="mb-4">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="w-full text-xs bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded transition-colors"
          >
            {showDebug ? "Hide" : "Show"} Transaction Status
          </button>

          {showDebug && (
            <div className="mt-2 bg-gray-900 text-green-400 p-2 rounded text-xs font-mono">
              <div className="text-green-300 font-bold mb-1">
                Latest Status:
              </div>
              <div>{currentStatus}</div>

              {/* Manual override for testing */}
              {currentStatus.includes("transactionLegacyExecuted") &&
                !transactionHash && (
                  <div className="mt-2 space-y-1">
                    <button
                      onClick={() => {
                        // Manually set a test transaction hash
                        const testHash =
                          "0x" + Date.now().toString(16).padStart(64, "0");
                        setTransactionHash(testHash);
                        createHiveAccount(hiveUsername, email, testHash);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-2"
                    >
                      Force Success
                    </button>
                    <button
                      onClick={resetTransaction}
                      className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Reset Transaction
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      )}

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
            key={transactionKey}
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
