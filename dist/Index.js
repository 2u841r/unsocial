"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
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
const SocialBrowserDetector = ({ className = "", customText, debugMode = false, }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [detectedApp, setDetectedApp] = useState("");
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
    if (typeof window === "undefined")
        return null;
    if (!showPopup)
        return null;
    const text = {
        title: (customText === null || customText === void 0 ? void 0 : customText.title) || "Open in External Browser",
        description: (customText === null || customText === void 0 ? void 0 : customText.description) ||
            `You're viewing this page in ${detectedApp}'s internal browser. For the best experience, please open this page in your default browser.`,
        howToTitle: (customText === null || customText === void 0 ? void 0 : customText.howToTitle) || "How to open in external browser:",
        continueButton: (customText === null || customText === void 0 ? void 0 : customText.continueButton) || "Continue Here",
    };
    return (_jsx("div", { className: `fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${className}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "popup-title", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in duration-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { id: "popup-title", className: "text-lg font-semibold text-gray-900 dark:text-gray-100", children: text.title }), _jsx("button", { onClick: handleClose, className: "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700", "aria-label": "Close popup", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm mb-4", children: text.description }), _jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4", children: [_jsxs("p", { className: "text-blue-800 dark:text-blue-200 text-sm font-medium mb-3 flex items-center", children: [_jsx("svg", { className: "w-4 h-4 mr-2 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), text.howToTitle] }), _jsxs("ol", { className: "text-blue-700 dark:text-blue-300 text-sm space-y-2", children: [_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0", children: "1" }), _jsxs("span", { children: ["Tap the ", _jsx("strong", { children: "three dots (\u22EF)" }), " in the top right corner"] })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0", children: "2" }), _jsxs("span", { children: ["Select ", _jsx("strong", { children: "\"Open in External Browser\"" }), " or", " ", _jsx("strong", { children: "\"Open in Chrome/Safari\"" })] })] })] })] })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: handleClose, className: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 transition-colors", children: text.continueButton }) })] }) }));
};
export default SocialBrowserDetector;
//# sourceMappingURL=Index.js.map