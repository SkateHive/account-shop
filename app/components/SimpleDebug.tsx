"use client";

import { useState } from "react";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";

interface SimpleDebugProps {
  onTransactionStatus: (status: LifecycleStatus) => void;
}

export default function SimpleDebug({ onTransactionStatus }: SimpleDebugProps) {
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleStatus = (status: LifecycleStatus) => {
    // Add to log
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp}: ${status.statusName}`;
    setStatusLog((prev) => [...prev.slice(-9), logEntry]); // Keep last 10 entries

    // Call the original handler
    onTransactionStatus(status);
  };

  const clearLog = () => {
    setStatusLog([]);
  };

  return (
    <div className="space-y-2">
      {/* Toggle Button */}
      <div className="text-center">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-xs bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
        >
          {isVisible ? "Hide" : "Show"} Debug ({statusLog.length})
        </button>
      </div>

      {/* Debug Panel */}
      {isVisible && (
        <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono max-h-48 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-300 font-bold">Transaction Log</span>
            <button
              onClick={clearLog}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              Clear
            </button>
          </div>

          {statusLog.length === 0 ? (
            <p className="text-gray-500">No activity yet...</p>
          ) : (
            <div className="space-y-1">
              {statusLog.map((entry, index) => (
                <div key={index} className="text-xs">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
