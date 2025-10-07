"use client"

import SocialBrowserDetector from "unsocial"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function UnsocialDemo() {
  return (
    <div className="min-h-screen bg-background">
      <SocialBrowserDetector debugMode={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Unsocial Package Demo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Social Browser Detection Made Simple</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            This demo showcases the unsocial package, which detects when your website is being viewed inside social
            media in-app browsers like Facebook, Instagram, TikTok, and more.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Use Unsocial?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detect In-App Browsers</CardTitle>
                <CardDescription>
                  Automatically identify when users are viewing your site through social media apps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Social platforms like Facebook, Instagram, TikTok, and LinkedIn use their own in-app browsers that can
                  have limited functionality. Knowing when users are in these browsers helps you provide better
                  experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Debug Mode</CardTitle>
                <CardDescription>Visual feedback for development and testing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enable debug mode to see a visual indicator when a social browser is detected. Perfect for testing
                  your implementation and understanding which browsers are being detected in real-time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>Drop-in React component with zero configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simply import the component and add it to your app. The package handles all the detection logic
                  automatically, with no complex setup or configuration required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Install the Package</h3>
                <p className="text-muted-foreground">
                  Add unsocial to your project with npm, yarn, or pnpm. The package is lightweight and has minimal
                  dependencies, ensuring it won't bloat your bundle size.
                </p>
                <code className="block mt-3 p-3 bg-muted rounded-md text-sm">npm install unsocial</code>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Import the Component</h3>
                <p className="text-muted-foreground">
                  Import the SocialBrowserDetector component into your React application. It works with any React
                  framework including Next.js, Create React App, Remix, and more.
                </p>
                <code className="block mt-3 p-3 bg-muted rounded-md text-sm">
                  import SocialBrowserDetector from "unsocial"
                </code>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add to Your App</h3>
                <p className="text-muted-foreground">
                  Place the component anywhere in your app, typically in your root layout or main component. Enable
                  debug mode during development to see when detection occurs.
                </p>
                <code className="block mt-3 p-3 bg-muted rounded-md text-sm">
                  {"<SocialBrowserDetector debugMode={true} />"}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Supported Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Facebook", "Instagram", "TikTok", "LinkedIn", "Twitter/X", "Snapchat", "Pinterest", "Reddit"].map(
              (platform) => (
                <Card key={platform} className="text-center">
                  <CardContent className="pt-6">
                    <p className="font-semibold">{platform}</p>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Common Use Cases</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Show "Open in Browser" Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When users are in a social media in-app browser, certain features like OAuth authentication, payment
                  processing, or file uploads may not work properly. Detect these browsers and show a friendly message
                  encouraging users to open your site in their default browser for the full experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics and Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Understanding how much of your traffic comes from social media in-app browsers helps you make informed
                  decisions about feature development and user experience optimization. Track these metrics to better
                  serve your audience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conditional Feature Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Some features may not work reliably in in-app browsers due to their restricted environments. Use
                  detection to conditionally load features, show alternative interfaces, or provide fallback experiences
                  that work better in these contexts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improve Conversion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  E-commerce sites and SaaS applications often see lower conversion rates from social media in-app
                  browsers. By detecting these browsers and guiding users to open your site externally, you can improve
                  completion rates for critical flows like checkout and signup.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testing Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Test It Out</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            To see the detector in action, share this page on Facebook, Instagram, TikTok, or another social platform
            and open it from within the app. With debug mode enabled, you'll see a visual indicator when a social
            browser is detected.
          </p>
          <div className="bg-card border border-border rounded-lg p-6 text-left">
            <h3 className="font-semibold mb-3">Testing Tips:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Share this URL on your social media platform of choice</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Click the link from within the social media app (not from an external browser)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Look for the debug indicator that appears when a social browser is detected</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Compare the experience with opening the same URL in Safari, Chrome, or Firefox</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground">
          <p className="mb-4">
            This demo page showcases the unsocial package with debug mode enabled. The SocialBrowserDetector component
            is actively monitoring your browser environment.
          </p>
          <p className="text-sm">Built with Next.js and shadcn/ui • Powered by the unsocial package</p>
        </div>
      </footer>
    </div>
  )
}
