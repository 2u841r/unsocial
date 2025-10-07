import React from "react";
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
declare const SocialBrowserDetector: React.FC<SocialBrowserDetectorProps>;
export default SocialBrowserDetector;
//# sourceMappingURL=index.d.ts.map