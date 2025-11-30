import { DocsLayout } from "../../components/layout/DocsLayout";

export default function Installation() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Installation</h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Quick Install
          </h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm font-mono">
              npm install zaalim-ui
            </code>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Peer Dependencies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Zaalim UI requires React and React DOM as peer dependencies. Make
            sure you have them installed:
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-white text-sm font-mono">
              npm install react react-dom
            </code>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Setup</h2>
          <p className="text-gray-700 leading-relaxed">
            Wrap your application with the ThemeProvider to enable theming:
          </p>
          <div className="bg-gray-100 rounded-lg p-4 border">
            <pre className="text-sm text-gray-800">
              {`import { ThemeProvider, defaultTheme } from 'zaalim-ui'

function App() {
  return (
    <ThemeProvider value={defaultTheme}>
      <YourAppContent />
    </ThemeProvider>
  )
}`}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">TypeScript</h2>
          <p className="text-gray-700 leading-relaxed">
            Zaalim UI is built with TypeScript and includes full type
            definitions. No additional setup required!
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Troubleshooting
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Peer Dependency Warnings
              </h3>
              <p className="text-gray-700 text-sm mt-1">
                If you encounter peer dependency warnings, use the{" "}
                <code className="bg-gray-100 px-1 rounded">
                  --legacy-peer-deps
                </code>{" "}
                flag:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mt-2">
                <code className="text-white text-sm font-mono">
                  npm install zaalim-ui --legacy-peer-deps
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
