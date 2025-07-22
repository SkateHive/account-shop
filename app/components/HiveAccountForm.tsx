"use client";

import { useState, useEffect, useRef } from "react";
import { checkAccountName, validateUsername } from "../lib/hiveUtils";

interface HiveAccountFormProps {
  hiveUsername: string;
  email: string;
  onUsernameChange: (username: string) => void;
  onEmailChange: (email: string) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function HiveAccountForm({
  hiveUsername,
  email,
  onUsernameChange,
  onEmailChange,
  onValidationChange,
}: HiveAccountFormProps) {
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [usernameError, setUsernameError] = useState<string>("");
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    if (!hiveUsername.trim()) {
      setUsernameStatus("idle");
      setUsernameError("");
      onValidationChange(false);
      return;
    }

    // First validate format
    const validation = validateUsername(hiveUsername);
    if (!validation.isValid) {
      setUsernameStatus("invalid");
      setUsernameError(validation.error || "Invalid username format");
      onValidationChange(false);
      return;
    }

    // Set a timeout to check availability after user stops typing
    const timeout = setTimeout(async () => {
      setUsernameStatus("checking");
      setUsernameError("");

      try {
        const isTaken = await checkAccountName(hiveUsername);
        if (isTaken) {
          setUsernameStatus("taken");
          setUsernameError("Username is already taken");
          onValidationChange(false);
        } else {
          setUsernameStatus("available");
          setUsernameError("");
          onValidationChange(true);
        }
      } catch (error) {
        setUsernameStatus("invalid");
        setUsernameError("Failed to check username availability");
        onValidationChange(false);
        console.error("Error checking username:", error);
      }
    }, 1000); // Wait 1 second after user stops typing

    checkTimeoutRef.current = timeout;

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [hiveUsername, onValidationChange]);

  const getUsernameStatusIcon = () => {
    switch (usernameStatus) {
      case "checking":
        return <span className="text-gray-500">⏳</span>;
      case "available":
        return <span className="text-green-500">✅</span>;
      case "taken":
      case "invalid":
        return <span className="text-red-500">❌</span>;
      default:
        return null;
    }
  };

  const getUsernameStatusText = () => {
    switch (usernameStatus) {
      case "checking":
        return "Checking availability...";
      case "available":
        return "Username is available!";
      case "taken":
        return "Username is already taken";
      case "invalid":
        return usernameError;
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Desired Hive Username
        </label>
        <div className="relative">
          <input
            type="text"
            id="username"
            value={hiveUsername}
            onChange={(e) => onUsernameChange(e.target.value.toLowerCase())}
            placeholder="Enter your desired username"
            className={`w-full p-2 border rounded-md bg-white text-black ${
              usernameStatus === "available"
                ? "border-green-500"
                : usernameStatus === "taken" || usernameStatus === "invalid"
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          />
          <div className="absolute right-2 top-2">
            {getUsernameStatusIcon()}
          </div>
        </div>
        {usernameStatus !== "idle" && (
          <p
            className={`text-sm mt-1 ${
              usernameStatus === "available"
                ? "text-green-600"
                : usernameStatus === "checking"
                ? "text-gray-600"
                : "text-red-600"
            }`}
          >
            {getUsernameStatusText()}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
          required
        />
      </div>
    </div>
  );
}
