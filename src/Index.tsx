"use client";

import React, { useState, useEffect } from "react";

/**
 * Props for the SocialBrowserDetector component
 */
interface SocialBrowserDetectorProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Custom text content for the popup */
  customText?: {
    title?: string;
    description?: string;
    howToTitle?: string;
    continueButton?: string;
  };
  /** Enable debug mode to always show the popup */
  debugMode?: boolean;
}

/**
 * A React component that detects when users are viewing your site
 * in social media apps' internal browsers (Facebook, Instagram, etc.)
 * and shows a popup encouraging them to open in external browser.
 *
 * Automatically respects user's system dark/light mode preference.
 *
 * @example
 * ```tsx
 * import SocialBrowserDetector from 'social-browser-detector';
 *
 * function App() {
 *   return (
 *     <div>
 *       <SocialBrowserDetector />
 *       // Your app content
 *     </div>
 *   );
 * }
 * ```
 */
const SocialBrowserDetector: React.FC<SocialBrowserDetectorProps> = ({
  className = "",
  customText,
  debugMode = false,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [detectedApp, setDetectedApp] = useState<string>("");

  useEffect(() => {
    const detectSocialBrowser = () => {
      const userAgent = navigator.userAgent;
      let appName = "";

      // Instagram Browser - Most specific check first
      if (userAgent.includes("Instagram")) {
        appName = "Instagram";
      }
      // Facebook family apps - FB_IAB indicates in-app browser
      else if (userAgent.includes("FB_IAB")) {
        appName = "Facebook";
      }
      // Facebook iOS Browser
      else if (userAgent.includes("FBAN/FBIOS")) {
        appName = "Facebook";
      }
      // Generic Facebook indicators
      else if (userAgent.includes("FBAV")) {
        appName = "Facebook";
      }

      if (appName || debugMode) {
        setDetectedApp(appName || "Debug Mode");
        setShowPopup(true);
      }
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      detectSocialBrowser();
    }
  }, [debugMode]);

  const handleClose = () => {
    setShowPopup(false);
  };

  // Don't render on server side
  if (typeof window === "undefined") return null;
  if (!showPopup) return null;

  const text = {
    title: customText?.title || "Open in External Browser",
    description:
      customText?.description ||
      `You're viewing this page in ${detectedApp}'s internal browser. For the best experience, please open this page in your default browser.`,
    howToTitle: customText?.howToTitle || "How to open in external browser:",
    continueButton: customText?.continueButton || "Continue Here",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 animate-in fade-in duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3
            id="popup-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-2 truncate"
          >
            {text.title}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
            aria-label="Close popup"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 break-words">
            {text.description}
          </p>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-3 flex items-center">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="break-words">{text.howToTitle}</span>
            </p>
            <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                  1
                </span>
                <span className="break-words">
                  Tap the <strong>three dots (⋯)</strong> in the top right
                  corner
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span className="break-words">
                  Select <strong>"Open in External Browser"</strong> or{" "}
                  <strong>"Open in Chrome/Safari"</strong>
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 transition-colors"
          >
            {text.continueButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialBrowserDetector;
