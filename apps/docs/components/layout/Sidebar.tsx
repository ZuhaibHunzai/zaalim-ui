import Link from "next/link";
import { useRouter } from "next/router";

const menuItems = [
  { href: "/docs", label: "Get Started" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/theme-customization", label: "Theme Customization" },
  { href: "/docs/button", label: "Button" },
  { href: "/docs/card", label: "Card" },
];

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="w-64 h-screen  fixed left-0 top-15 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
