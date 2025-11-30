import { DocsLayout } from "../../components/layout/DocsLayout";
import {
  Button,
  ThemeProvider,
  defaultTheme,
  Card,
  CardContent,
} from "zaalim-ui";
import { useState } from "react";

export default function ButtonDocs() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Button</h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            Buttons allow users to perform actions and make choices with a
            single tap.
          </p>
        </div>

        <ThemeProvider value={currentTheme}>
          <div className="space-y-8">
            {/* Variants Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Variants</h2>
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 flex-wrap items-center">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">
                      {`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sizes Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Sizes</h2>
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 flex-wrap items-center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">
                      {`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Props Table */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                API Reference
              </h2>
              <Card>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Prop
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Default
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            variant
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            'primary' | 'secondary' | 'outline'
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            'primary'
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            Button style variant
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            size
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            'sm' | 'md' | 'lg'
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            'md'
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            Button size
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            children
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ReactNode
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">-</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            Button content
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </ThemeProvider>
      </div>
    </DocsLayout>
  );
}
