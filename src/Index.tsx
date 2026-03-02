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
    openInBrowserButton?: string;
    linkCopiedMessage?: string;
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
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const detectSocialBrowser = () => {
      const userAgent = navigator.userAgent;
      let appName = "";

      if (userAgent.includes("Instagram")) {
        appName = "Instagram";
      } else if (userAgent.includes("FB_IAB")) {
        appName = "Facebook";
      } else if (userAgent.includes("FBAN/FBIOS")) {
        appName = "Facebook";
      } else if (userAgent.includes("FBAV")) {
        appName = "Facebook";
      }

      if (appName || debugMode) {
        setDetectedApp(appName || "Debug Mode");
        setShowPopup(true);
      }
    };

    if (typeof window !== "undefined") {
      detectSocialBrowser();
    }
  }, [debugMode]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const isAndroid = typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);

  const handleOpenInBrowser = async () => {
    const url = window.location.href;

    if (isAndroid) {
      window.location.href = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(url)};end`;
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Clipboard API may be blocked in some WebViews
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    }
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
    openInBrowserButton: customText?.openInBrowserButton || (isAndroid ? "Open in Browser" : "Copy Link"),
    linkCopiedMessage: customText?.linkCopiedMessage || "Link copied! Paste it in Safari or your browser.",
    continueButton: customText?.continueButton || "Continue Here",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        className="rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 overflow-hidden"
        style={{
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3
            id="popup-title"
            className="text-lg font-semibold pr-2 truncate"
            style={{ color: isDark ? "#f3f4f6" : "#111827" }}
          >
            {text.title}
          </h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full flex-shrink-0 transition-colors"
            style={{ color: isDark ? "#6b7280" : "#9ca3af" }}
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
          <p
            className="text-sm mb-4 break-words"
            style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
          >
            {text.description}
          </p>

          {/* Instructions */}
          <div
            className="rounded-lg p-4 mb-4"
            style={{
              backgroundColor: isDark ? "rgba(30,58,138,0.3)" : "#eff6ff",
              border: `1px solid ${isDark ? "#1e3a5f" : "#bfdbfe"}`,
            }}
          >
            <p
              className="text-sm font-medium mb-3 flex items-center"
              style={{ color: isDark ? "#bfdbfe" : "#1e40af" }}
            >
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
            <ol
              className="text-sm space-y-2"
              style={{ color: isDark ? "#93c5fd" : "#1d4ed8" }}
            >
              <li className="flex items-start">
                <span
                  className="rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? "#1e3a8a" : "#bfdbfe",
                    color: isDark ? "#bfdbfe" : "#1e40af",
                  }}
                >
                  1
                </span>
                <span className="break-words">
                  Tap the <strong>three dots (...)</strong> in the top right
                  corner
                </span>
              </li>
              <li className="flex items-start">
                <span
                  className="rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? "#1e3a8a" : "#bfdbfe",
                    color: isDark ? "#bfdbfe" : "#1e40af",
                  }}
                >
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

        {/* Copied feedback */}
        {copied && (
          <div
            className="rounded-lg px-4 py-3 mb-4"
            style={{
              backgroundColor: isDark ? "rgba(20,83,45,0.3)" : "#f0fdf4",
              border: `1px solid ${isDark ? "#14532d" : "#bbf7d0"}`,
            }}
          >
            <p
              className="text-sm font-medium flex items-center"
              style={{ color: isDark ? "#86efac" : "#15803d" }}
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="break-words">{text.linkCopiedMessage}</span>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleOpenInBrowser}
            className="w-full font-semibold py-3 px-4 rounded-lg text-sm transition-colors"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
            aria-label="Open in default browser"
          >
            {text.openInBrowserButton}
          </button>
          <button
            onClick={handleClose}
            className="w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: isDark ? "#374151" : "#f3f4f6",
              color: isDark ? "#e5e7eb" : "#374151",
            }}
          >
            {text.continueButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialBrowserDetector;
