import Link from "next/link";
import { useRouter } from "next/router";

const quickLinks = [
  { href: "#installation", label: "Installation" },
  { href: "#theming", label: "Theming Guide" },
  { href: "#components", label: "Components" },
  { href: "#button", label: "Button API" },
  { href: "#card", label: "Card API" },
  { href: "#customization", label: "Customization" },
];

export const QuickLinks = () => {
  const router = useRouter();

  return (
    <div className="w-64 h-screen pt-20">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Links
        </h3>

        <nav className="space-y-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={`${router.pathname}${link.href}`}
              className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Additional Resources Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Resources
          </h4>
          <div className="space-y-2 text-sm">
            <a
              href="https://npmjs.com/package/zaalim-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-800 transition-colors"
            >
              NPM Package
            </a>
            <a
              href="https://github.com/yourusername/zaalim-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-800 transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="#"
              className="block text-blue-600 hover:text-blue-800 transition-colors"
            >
              Release Notes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
