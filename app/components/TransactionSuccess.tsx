"use client";

interface TransactionSuccessProps {
  email: string;
  transactionHash: string;
  onCreateAnother: () => void;
}

export default function TransactionSuccess({
  email,
  transactionHash,
  onCreateAnother,
}: TransactionSuccessProps) {
  return (
    <div className="text-center">
      <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
        <strong>Payment Successful!</strong>
        <p className="mt-2 text-sm">
          Your Hive account credentials will be sent to {email}
        </p>
        <p className="mt-1 text-xs break-all">Transaction: {transactionHash}</p>
      </div>
      <button
        onClick={onCreateAnother}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Another Account
      </button>
    </div>
  );
}
