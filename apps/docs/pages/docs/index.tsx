import { DocsLayout } from "../../components/layout/DocsLayout";
import {
  Button,
  Card,
  CardContent,
  ThemeProvider,
  defaultTheme,
} from "zaalim-ui";

export default function GetStarted() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Get Started with Zaalim UI
        </h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Zaalim UI is a modern React component library built with TypeScript
            and TailwindCSS. It provides beautifully designed components with
            built-in theme support, making it easy to create consistent and
            accessible user interfaces.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Quick Start</h2>
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">1. Install the package</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-white text-sm font-mono">
                  npm install zaalim-ui
                </code>
              </div>

              <h3 className="text-lg font-semibold">
                2. Wrap your app with ThemeProvider
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 border">
                <pre className="text-sm text-gray-800">
                  {`import { ThemeProvider, defaultTheme } from 'zaalim-ui'

function App() {
  return (
    <ThemeProvider value={defaultTheme}>
      <YourApp />
    </ThemeProvider>
  )
}`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold">
                3. Start using components
              </h3>
              <ThemeProvider value={defaultTheme}>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
              </ThemeProvider>
              <div className="bg-gray-100 rounded-lg p-4 border">
                <pre className="text-sm text-gray-800">
                  {`import { Button } from 'zaalim-ui'

function MyComponent() {
  return (
    <Button variant="primary">Click me</Button>
  )
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Theming</h3>
              <p className="text-sm text-gray-600">
                Built-in light and dark themes with easy customization
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">TypeScript</h3>
              <p className="text-sm text-gray-600">
                Full type safety with comprehensive type definitions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive</h3>
              <p className="text-sm text-gray-600">
                Mobile-first components that work on all devices
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Next Steps</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Explore the documentation to learn about all available components
              and features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Check out the <strong>Theming</strong> guide to customize colors
              </li>
              <li>
                Browse <strong>Components</strong> to see all available UI
                elements
              </li>
              <li>
                Read the <strong>Installation</strong> guide for detailed setup
                instructions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
