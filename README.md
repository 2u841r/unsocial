# Unsocial

A lightweight React component that detects when users are viewing your website in social media apps' internal browsers (Facebook, Instagram, etc.) and shows a helpful popup encouraging them to open the page in their external browser for a better experience.

[![npm version](https://img.shields.io/npm/v/unsocial.svg)](https://www.npmjs.com/package/unsocial)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Accurate Detection** - Detects Facebook, Instagram, and other Meta app browsers
- 🌙 **Dark Mode Support** - Automatically respects user's system theme preference
- 📱 **Mobile Optimized** - Designed for mobile social media usage patterns
- ♿ **Accessible** - Full ARIA support and semantic HTML
- 🎨 **Customizable** - Custom text, styling, and behavior options
- 📦 **Lightweight** - Minimal bundle size, no external dependencies, no CSS framework required
- 🔧 **TypeScript** - Full type safety and IntelliSense support

## 🚀 Installation

```bash
pnpm add unsocial
```

```bash
npm install unsocial
```

## 📋 Requirements

- React 17, 18, or 19

That's it. Styling is fully self-contained (inline styles), so no Tailwind or CSS setup is needed.

## 🛠️ Usage

### Basic Usage

```tsx
import { Unsocial } from "unsocial";

function App() {
  return (
    <div>
      <Unsocial />
      {/* Your app content */}
    </div>
  );
}
```

### Custom Text

```tsx
<Unsocial
  customText={{
    title: "Better Experience Available",
    description:
      "Open in your browser for full functionality and faster loading.",
    howToTitle: "Quick steps to open externally:",
    continueButton: "Stay Here",
  }}
/>
```

### Hide the "Continue Here" Button

Force users toward the external browser by removing the continue option:

```tsx
<Unsocial showContinueButton={false} />
```

### Hook: Conditional Rendering

Some features don't work in in-app browsers (e.g. Google OAuth blocks
embedded WebViews). Use the `useSocialBrowser` hook to show or hide
anything based on detection:

```tsx
import { useSocialBrowser } from "unsocial";

function LoginButtons() {
  const { isSocialBrowser, appName } = useSocialBrowser();

  return (
    <div>
      {!isSocialBrowser && <GoogleLoginButton />}
      <EmailLoginButton />
      {isSocialBrowser && <p>Google login unavailable in {appName}'s browser.</p>}
    </div>
  );
}
```

SSR-safe: returns `false` on the server and first client render, then
updates after mount, so there is no hydration mismatch.

### Debug Mode (for testing/development)

```tsx
<Unsocial debugMode={true} />
```

### Custom Styling

```tsx
<Unsocial className="custom-popup-styles" />
```

## 🎛️ Props

| Prop                 | Type      | Default | Description                     |
| -------------------- | --------- | ------- | ------------------------------- |
| `className`          | `string`  | `""`    | Additional CSS classes on the overlay |
| `customText`         | `object`  | -       | Custom text content (see below) |
| `debugMode`          | `boolean` | `false` | Always show popup for testing   |
| `showContinueButton` | `boolean` | `true`  | Show the "Continue Here" button |

### Custom Text Object

```tsx
interface CustomText {
  title?: string; // Popup title
  description?: string; // Main description text
  howToTitle?: string; // Instructions title
  openInBrowserButton?: string; // Primary button text
  linkCopiedMessage?: string; // Message after copying the link
  continueButton?: string; // Continue button text
}
```

### Exports

```tsx
import Unsocial from "unsocial"; // default export
import { Unsocial } from "unsocial"; // named export
import { SocialBrowserDetector } from "unsocial"; // alias, same component
import { useSocialBrowser } from "unsocial"; // detection hook
import type { SocialBrowserDetectorProps } from "unsocial";
```

## 🔍 Detected Browsers

The component detects these social media in-app browsers:

- **Facebook App** (iOS & Android)
- **Instagram App** (iOS & Android)
- **Messenger** (when using webview)
- **Other Meta family apps**

## 🎨 Styling

The component ships with self-contained inline styles (no CSS framework needed) and automatically supports:

- **Light Mode** - Clean, modern light theme
- **Dark Mode** - Automatically enabled based on user's system preference
- **Responsive Design** - Optimized for mobile devices

### Dark Mode

Dark mode is automatically applied when the user's system is set to dark mode. No additional configuration needed!

## 🌐 Browser Support

- ✅ iOS Safari (in-app)
- ✅ Android Chrome (in-app)
- ✅ Facebook iOS
- ✅ Facebook Android
- ✅ Instagram iOS
- ✅ Instagram Android
- ✅ All modern mobile browsers

## 📱 User Experience

When a social media browser is detected, users see:

1. **Clear explanation** of why external browser is better
2. **Step-by-step instructions** on how to open externally
3. **Option to continue** in the current browser (can be disabled)
4. **Accessible design** with proper focus management

On Android, the primary button opens the page directly in the default browser via an intent URL. On iOS, it copies the link so users can paste it into Safari.

## 🔧 Development

### Local Development

```bash
git clone https://github.com/2u841r/unsocial
cd unsocial
pnpm install
```

### Building

```bash
pnpm build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/2u841r/unsocial/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/2u841r/unsocial/discussions)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Why is this needed?**

Social media apps use internal browsers that often have limited functionality, slower performance, and restricted features compared to external browsers. This component helps improve user experience by guiding users to open your website in their preferred browser where they can enjoy:

- Faster loading times
- Full browser features
- Better security
- Proper bookmark/sharing functionality
- Complete JavaScript/CSS support

Made with ❤️ for better web experiences

![](https://repostats.zizdjbd.workers.dev/2u841r/unsocial)
