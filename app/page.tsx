"use client";

import { useEffect } from "react";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useViewProfile,
  useNotification,
} from "@coinbase/onchainkit/minikit";
import Header from "./components/Header";
import SkateHiveAccountShop from "./components/SkateHiveAccountShop";
import EmailTestingComponent from "./components/EmailTestingComponent";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const close = useClose();
  const viewProfile = useViewProfile();
  const sendNotification = useNotification();

  // Initialize the frame when ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = async () => {
    const result = await addFrame();
    if (result) {
      console.log("Frame added:", result.url, result.token);
      // In production, save these to your database for notifications
    }
  };

  const handleSendNotification = async () => {
    try {
      await sendNotification({
        title: "SkateHive Account Created! 🛹",
        body: "Your account is ready - time to start posting your skateboarding content!",
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      {/* MiniKit Header with controls */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">SkateHive Account Shop</h1>
        </div>
      </div>

      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          {/* Email Testing Component - Only shows in development */}
          <EmailTestingComponent />

          {/* Main SkateHive Account Shop */}
          <SkateHiveAccountShop />
        </div>
      </main>

      {/* Footer with MiniKit branding */}
      <footer className="flex items-center justify-center pb-4">
        <button
          type="button"
          className="px-2 py-1 flex justify-center rounded-2xl font-semibold opacity-40 border border-gray-400 text-xs"
          onClick={() => openUrl("https://base.org/builders/minikit")}
        >
          BUILT ON BASE WITH MINIKIT
        </button>
      </footer>
    </div>
  );
}
