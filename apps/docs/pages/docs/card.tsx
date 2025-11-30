import { DocsLayout } from "../../components/layout/DocsLayout";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  ThemeProvider,
  defaultTheme,
} from "zaalim-ui";

export default function CardDocs() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Card</h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            Cards are flexible containers used to group and display content in a
            clear and concise way.
          </p>
        </div>

        <ThemeProvider value={defaultTheme}>
          <div className="space-y-8">
            {/* Basic Card Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Basic Card
              </h2>
              <Card>
                <CardContent>
                  <p>This is a basic card with simple content.</p>
                </CardContent>
              </Card>
              <div className="bg-gray-100 rounded-lg p-4">
                <pre className="text-sm text-gray-800">
                  {`<Card>
  <CardContent>
    <p>This is a basic card with simple content.</p>
  </CardContent>
</Card>`}
                </pre>
              </div>
            </section>

            {/* Card with Header Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Card with Header
              </h2>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Card Title</h3>
                </CardHeader>
                <CardContent>
                  <p>This card has a header and separate content area.</p>
                  <Button size="sm" className="mt-4">
                    Action
                  </Button>
                </CardContent>
              </Card>
              <div className="bg-gray-100 rounded-lg p-4">
                <pre className="text-sm text-gray-800">
                  {`<Card>
  <CardHeader>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>This card has a header and separate content area.</p>
    <Button size="sm" className="mt-4">
      Action
    </Button>
  </CardContent>
</Card>`}
                </pre>
              </div>
            </section>

            {/* Padding Options Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Padding Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card padding="sm">
                  <CardContent>
                    <p className="text-sm">Small padding</p>
                  </CardContent>
                </Card>
                <Card padding="md">
                  <CardContent>
                    <p>Medium padding (default)</p>
                  </CardContent>
                </Card>
                <Card padding="lg">
                  <CardContent>
                    <p>Large padding</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <pre className="text-sm text-gray-800">
                  {`<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>`}
                </pre>
              </div>
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
                            Component
                          </th>
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
                          <td
                            className="px-4 py-3 text-sm text-gray-900"
                            rowSpan={2}
                          >
                            Card
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            padding
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            'none' | 'sm' | 'md' | 'lg'
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            'md'
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            Internal padding size
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
                            Card content
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            CardHeader
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            children
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ReactNode
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">-</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            Header content
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            CardContent
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            children
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            ReactNode
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">-</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            Main content
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
