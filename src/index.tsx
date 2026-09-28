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
  /** Show a button that closes the prompt and stays in the current browser */
  showContinueButton?: boolean;
  /** Enable debug mode to always show the popup */
  debugMode?: boolean;
}

/**
 * Returns the social app name for a given user agent, or "" if none detected.
 */
function detectSocialApp(userAgent: string): string {
  if (userAgent.includes("Instagram")) return "Instagram";
  if (userAgent.includes("FB_IAB")) return "Facebook";
  if (userAgent.includes("FBAN/FBIOS")) return "Facebook";
  if (userAgent.includes("FBAV")) return "Facebook";
  return "";
}

/**
 * Hook that detects whether the page is running inside a social media
 * in-app browser. SSR-safe: returns false on the server and during the
 * first client render, then updates after mount (no hydration mismatch).
 *
 * @example
 * ```tsx
 * const { isSocialBrowser } = useSocialBrowser();
 * return isSocialBrowser ? <EmailLogin /> : <GoogleLogin />;
 * ```
 */
export function useSocialBrowser(): {
  isSocialBrowser: boolean;
  appName: string;
} {
  const [appName, setAppName] = useState("");

  useEffect(() => {
    setAppName(detectSocialApp(navigator.userAgent));
  }, []);

  return { isSocialBrowser: appName !== "", appName };
}

/**
 * A React component that detects when users are viewing your site
 * in social media apps' internal browsers (Facebook, Instagram, etc.)
 * and shows a popup encouraging them to open in external browser.
 *
 * Automatically respects user's system dark/light mode preference.
 * Fully self-contained styling: no CSS framework required.
 *
 * @example
 * ```tsx
 * import SocialBrowserDetector from 'unsocial';
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
  showContinueButton = false,
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
      const appName = detectSocialApp(navigator.userAgent);

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
    openInBrowserButton: customText?.openInBrowserButton || "Open in Browser",
    linkCopiedMessage: customText?.linkCopiedMessage || "Link copied! Paste it in Safari or your browser.",
    continueButton: customText?.continueButton || "Continue Here",
  };

  const stepBadgeStyle: React.CSSProperties = {
    boxSizing: "border-box",
    borderRadius: "9999px",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 500,
    marginRight: "12px",
    marginTop: "2px",
    flexShrink: 0,
    backgroundColor: isDark ? "#1e3a8a" : "#bfdbfe",
    color: isDark ? "#bfdbfe" : "#1e40af",
  };

  return (
    <div
      className={className}
      style={{
        boxSizing: "border-box",
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0,0,0,0.5)",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lineHeight: 1.5,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        style={{
          boxSizing: "border-box",
          borderRadius: "8px",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "384px",
          margin: "0 auto",
          padding: "24px",
          overflow: "hidden",
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h3
            id="popup-title"
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 600,
              paddingRight: "8px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: isDark ? "#f3f4f6" : "#111827",
            }}
          >
            {text.title}
          </h3>
          <button
            onClick={handleClose}
            style={{
              boxSizing: "border-box",
              padding: "4px",
              borderRadius: "9999px",
              flexShrink: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDark ? "#6b7280" : "#9ca3af",
            }}
            aria-label="Close popup"
          >
            <svg
              style={{ width: "20px", height: "20px" }}
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
        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              margin: "0 0 16px 0",
              fontSize: "14px",
              overflowWrap: "break-word",
              color: isDark ? "#d1d5db" : "#4b5563",
            }}
          >
            {text.description}
          </p>

          {/* Instructions */}
          <div
            style={{
              boxSizing: "border-box",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: isDark ? "rgba(30,58,138,0.3)" : "#eff6ff",
              border: `1px solid ${isDark ? "#1e3a5f" : "#bfdbfe"}`,
            }}
          >
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                color: isDark ? "#bfdbfe" : "#1e40af",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px", marginRight: "8px", flexShrink: 0 }}
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
              <span style={{ overflowWrap: "break-word" }}>{text.howToTitle}</span>
            </p>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "14px",
                color: isDark ? "#93c5fd" : "#1d4ed8",
              }}
            >
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={stepBadgeStyle}>1</span>
                <span style={{ overflowWrap: "break-word" }}>
                  Tap the <strong>three dots (...)</strong> in the top right
                  corner
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={stepBadgeStyle}>2</span>
                <span style={{ overflowWrap: "break-word" }}>
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
            style={{
              boxSizing: "border-box",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "16px",
              backgroundColor: isDark ? "rgba(20,83,45,0.3)" : "#f0fdf4",
              border: `1px solid ${isDark ? "#14532d" : "#bbf7d0"}`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                color: isDark ? "#86efac" : "#15803d",
              }}
            >
              <svg
                style={{ width: "16px", height: "16px", marginRight: "8px", flexShrink: 0 }}
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
              <span style={{ overflowWrap: "break-word" }}>{text.linkCopiedMessage}</span>
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={handleOpenInBrowser}
            style={{
              boxSizing: "border-box",
              width: "100%",
              fontWeight: 600,
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
            aria-label="Open in default browser"
          >
            {text.openInBrowserButton}
          </button>
          {showContinueButton && (
            <button
              onClick={handleClose}
              style={{
                boxSizing: "border-box",
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                backgroundColor: isDark ? "#374151" : "#f3f4f6",
                color: isDark ? "#e5e7eb" : "#374151",
              }}
            >
              {text.continueButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialBrowserDetector;
export { SocialBrowserDetector, SocialBrowserDetector as Unsocial };
export type { SocialBrowserDetectorProps };
