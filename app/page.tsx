'use client';

import Header from './components/Header';
import SkateHiveAccountShop from './components/SkateHiveAccountShop';
import OnchainKitLinks from './components/OnchainKitLinks';
import ImageSvg from './svg/Image';
import OnchainkitSvg from './svg/OnchainKit';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          <div className="w-1/3 mx-auto mb-6">
            <ImageSvg />
          </div>
          <div className="flex justify-center mb-6">
            <a target="_blank" rel="_template" href="https://onchainkit.xyz">
              <OnchainkitSvg className="text-black dark:text-white" />
            </a>
          </div>

          {/* Main SkateHive Account Shop */}
          <SkateHiveAccountShop />

          <p className="text-center mb-6">
            Get started by editing
            <code className="p-1 ml-1 rounded bg-gray-200 dark:bg-gray-800">
              app/page.tsx
            </code>
            .
          </p>

          {/* OnchainKit Documentation Links */}
          <OnchainKitLinks />
        </div>
      </main>
    </div>
  );
}
