# Social Browser Detector

A lightweight React component that detects when users are viewing your website in social media apps' internal browsers (Facebook, Instagram, etc.) and shows a helpful popup encouraging them to open the page in their external browser for a better experience.

[![npm version](https://img.shields.io/npm/v/social-browser-detector.svg)](https://www.npmjs.com/package/social-browser-detector)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Accurate Detection** - Detects Facebook, Instagram, and other Meta app browsers
- 🌙 **Dark Mode Support** - Automatically respects user's system theme preference
- 📱 **Mobile Optimized** - Designed for mobile social media usage patterns
- ♿ **Accessible** - Full ARIA support and semantic HTML
- 🎨 **Customizable** - Custom text, styling, and behavior options
- 📦 **Lightweight** - Minimal bundle size with no external dependencies
- 🔧 **TypeScript** - Full type safety and IntelliSense support

## 🚀 Installation

```bash
npm install social-browser-detector
```

```bash
yarn add social-browser-detector
```

```bash
pnpm add social-browser-detector
```

## 📋 Requirements

- React 16.8+
- Tailwind CSS (for styling)

## 🛠️ Usage

### Basic Usage

```tsx
import SocialBrowserDetector from "social-browser-detector";

function App() {
  return (
    <div>
      <SocialBrowserDetector />
      {/* Your app content */}
    </div>
  );
}
```

### Custom Text

```tsx
<SocialBrowserDetector
  customText={{
    title: "Better Experience Available",
    description:
      "Open in your browser for full functionality and faster loading.",
    howToTitle: "Quick steps to open externally:",
    continueButton: "Stay Here",
  }}
/>
```

### Debug Mode (for testing/development)

```tsx
<SocialBrowserDetector debugMode={true} />
```

### Custom Styling

```tsx
<SocialBrowserDetector className="custom-popup-styles" />
```

## 🎛️ Props

| Prop         | Type      | Default | Description                     |
| ------------ | --------- | ------- | ------------------------------- |
| `className`  | `string`  | `""`    | Additional CSS classes          |
| `customText` | `object`  | -       | Custom text content (see below) |
| `debugMode`  | `boolean` | `false` | Always show popup for testing   |

### Custom Text Object

```tsx
interface CustomText {
  title?: string; // Popup title
  description?: string; // Main description text
  howToTitle?: string; // Instructions title
  continueButton?: string; // Button text
}
```

## 🔍 Detected Browsers

The component detects these social media in-app browsers:

- **Facebook App** (iOS & Android)
- **Instagram App** (iOS & Android)
- **Messenger** (when using webview)
- **Other Meta family apps**

## 🎨 Styling

The component uses Tailwind CSS classes and automatically supports:

- **Light Mode** - Clean, modern light theme
- **Dark Mode** - Automatically enabled based on user's system preference
- **Responsive Design** - Optimized for mobile devices
- **Smooth Animations** - Subtle fade-in effects

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
3. **Option to continue** in the current browser
4. **Accessible design** with proper focus management

## 🔧 Development

### Local Development

```bash
git clone https://github.com/yourusername/social-browser-detector
cd social-browser-detector
npm install
npm run dev
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
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

- 📧 **Email**: your-email@domain.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/social-browser-detector/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/social-browser-detector/discussions)

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
