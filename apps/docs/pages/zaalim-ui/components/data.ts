// ============================================
// ZAALIM UI LANDING PAGE DATA
// ============================================

import {
  Palette,
  Layers,
  Zap,
  Code2,
  Copy,
  Sparkles,
  Moon,
  FileCode,
  LucideIcon,
} from "lucide-react";

// Features Data
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Layers,
    title: "100+ Components",
    description:
      "Everything from buttons to complex data tables. All the components you need, beautifully designed.",
  },
  {
    icon: Palette,
    title: "Multiple Themes",
    description:
      "Choose from our curated themes or create your own. Dark mode included out of the box.",
  },
  {
    icon: FileCode,
    title: "Custom Theming",
    description:
      "Just paste your colors in a config file - boom! Your theme works for all components instantly.",
  },
  {
    icon: Zap,
    title: "React & Next.js",
    description:
      "Built for modern React and Next.js applications with full SSR and RSC support.",
  },
  {
    icon: Code2,
    title: "Full Documentation",
    description:
      "Every component comes with detailed documentation, examples, and API references.",
  },
  {
    icon: Copy,
    title: "Copy & Paste Ready",
    description:
      "Dozens of pre-built designs ready to use. Just copy the code and start customizing.",
  },
  {
    icon: Sparkles,
    title: "Fully Accessible",
    description:
      "WAI-ARIA compliant components with proper keyboard navigation and screen reader support.",
  },
  {
    icon: Moon,
    title: "Dark Mode Ready",
    description:
      "All components and themes support dark mode seamlessly with a single toggle.",
  },
];

// Themes Data
export interface Theme {
  name: string;
  primary: string;
  accent: string;
  bg: string;
  description: string;
}

export const themes: Theme[] = [
  {
    name: "Aurora",
    primary: "#4BE5D1",
    accent: "#9E7BFF",
    bg: "#0A0F12",
    description: "Signature cyan-purple theme",
  },
  {
    name: "Ember",
    primary: "#F97316",
    accent: "#FACC15",
    bg: "#0C0A09",
    description: "Warm orange-yellow energy",
  },
  {
    name: "Ocean",
    primary: "#3B82F6",
    accent: "#06B6D4",
    bg: "#020617",
    description: "Cool blue aquatic tones",
  },
  {
    name: "Forest",
    primary: "#22C55E",
    accent: "#84CC16",
    bg: "#052E16",
    description: "Natural green harmony",
  },
  {
    name: "Midnight",
    primary: "#8B5CF6",
    accent: "#EC4899",
    bg: "#0F0720",
    description: "Deep purple-pink night",
  },
  {
    name: "Slate",
    primary: "#64748B",
    accent: "#94A3B8",
    bg: "#0F172A",
    description: "Minimalist monochrome",
  },
];

// Footer Links Data
export const footerLinks = {
  Product: [
    { label: "Components", href: "#components" },
    { label: "Themes", href: "#themes" },
    { label: "Templates", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Examples", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Community: [
    { label: "GitHub", href: "#" },
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Contributing", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

// Nav Links
export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Components", href: "#components" },
  { label: "Themes", href: "#themes" },
  { label: "Documentation", href: "/docs" },
];

// Code Examples
export const codeExample = `import { Button, Card, Avatar } from '@zaalim/ui'
import { useTheme } from '@zaalim/ui/theme'

export default function ProfileCard() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Card variant="elevated" className="p-6">
      <div className="flex items-center gap-4">
        <Avatar 
          src="/avatar.jpg" 
          fallback="JD"
          size="lg"
        />
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-muted">@johndoe</p>
        </div>
      </div>
      <Button 
        variant="primary" 
        className="mt-4 w-full"
      >
        Follow
      </Button>
    </Card>
  )
}`;

export const themeConfigCode = `// theme.config.ts - That's it!
export const myTheme = {
  colors: {
    brand: {
      500: "#4BE5D1",  // Your primary color
      600: "#1D7D73",  // Text on primary
    },
    accent: "#9E7BFF",
    // ... rest auto-generated from your primary
  }
}`;
