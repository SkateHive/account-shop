"use client";

import { useState } from "react";

interface EmailTestingComponentProps {
  className?: string;
}

export default function EmailTestingComponent({
  className = "",
}: EmailTestingComponentProps) {
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  // Only show in development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  const sendTestEmail = async () => {
    if (!userEmail) {
      setTestEmailStatus("❌ Please enter an email address first");
      setTimeout(() => setTestEmailStatus(""), 3000);
      return;
    }

    setIsSendingTestEmail(true);
    setTestEmailStatus("Sending test email...");

    try {
      const testData = {
        to: userEmail,
        subject: "Test Email from SkateHive Account Shop",
        createdby: "SkateHive Team",
        desiredUsername: "testuser123",
        masterPassword: "test-master-password-123",
        keys: {
          posting: "test-posting-key",
          active: "test-active-key",
          memo: "test-memo-key",
          owner: "test-owner-key",
        },
        language: "en",
      };

      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (result.success) {
        setTestEmailStatus(`✅ Test email sent successfully to ${userEmail}!`);
      } else {
        setTestEmailStatus(`❌ Failed to send email: ${result.error}`);
      }
    } catch (error) {
      setTestEmailStatus(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSendingTestEmail(false);
      // Clear status after 5 seconds
      setTimeout(() => setTestEmailStatus(""), 5000);
    }
  };

  // Don't render anything in production
  if (!isDevelopment) {
    return null;
  }

  return (
    <div className={`mb-6 max-w-md mx-auto ${className}`}>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
          🧪 Email Testing (Development Mode)
        </h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
          Test the email integration by sending a sample email with test Hive
          account credentials.
        </p>

        {/* Email Input for Test */}
        <div className="mb-3">
          <label
            htmlFor="testEmail"
            className="block text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1"
          >
            Test Email Address:
          </label>
          <input
            id="testEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email to test"
            className="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          onClick={sendTestEmail}
          disabled={isSendingTestEmail || !userEmail}
          className={`w-full px-4 py-2 rounded font-medium transition-colors ${
            isSendingTestEmail || !userEmail
              ? "bg-gray-400 cursor-not-allowed text-gray-600"
              : "bg-yellow-600 hover:bg-yellow-700 text-white"
          }`}
        >
          {isSendingTestEmail ? "Sending..." : "Send Test Email"}
        </button>

        {testEmailStatus && (
          <div className="mt-3 p-2 rounded bg-white dark:bg-gray-800 border text-sm">
            {testEmailStatus}
          </div>
        )}
      </div>
    </div>
  );
}
