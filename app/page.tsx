"use client";

import Header from "./components/Header";
import SkateHiveAccountShop from "./components/SkateHiveAccountShop";
import EmailTestingComponent from "./components/EmailTestingComponent";
import ImageSvg from "./svg/Image";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          {/* Email Testing Component - Only shows in development */}
          <EmailTestingComponent />

          {/* Main SkateHive Account Shop */}
          <SkateHiveAccountShop />
        </div>
      </main>
    </div>
  );
}
