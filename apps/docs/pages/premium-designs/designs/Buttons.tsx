import React from "react";
import { Button } from "zaalim-ui";
import {
  Heading,
  Title,
  Paragraph,
  Label,
  Caption,
  SmallText,
  Code,
} from "zaalim-ui";
import {
  // Lucide icons - 50 different icons for variety
  Star,
  Heart,
  Download,
  Upload,
  Share2,
  Copy,
  Check,
  X,
  Search,
  Filter,
  Settings,
  Bell,
  Users,
  MessageCircle,
  Mail,
  Phone,
  Play,
  Pause,
  ShoppingCart,
  CreditCard,
  Eye,
  Trash2,
  Edit,
  ExternalLink,
  ArrowRight,
  Calendar,
  Clock,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import { PremiumDesignsLayout } from "../layout/DesignsLayout";

// Group 1: Basic Button Variations (10 buttons)
const BasicButtons = () => (
  <div className="space-y-6">
    <Heading level={4}>Basic Variations</Heading>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* 1. Primary */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary" size="md">
          Primary
        </Button>
        <Caption>Primary</Caption>
      </div>

      {/* 2. Secondary */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="secondary" size="md">
          Secondary
        </Button>
        <Caption>Secondary</Caption>
      </div>

      {/* 3. Outline */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="md">
          Outline
        </Button>
        <Caption>Outline</Caption>
      </div>

      {/* 4. Ghost */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="md">
          Ghost
        </Button>
        <Caption>Ghost</Caption>
      </div>

      {/* 5. With Icon Left */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary" size="md">
          <Star size={16} className="mr-2" />
          With Icon
        </Button>
        <Caption>Icon Left</Caption>
      </div>

      {/* 6. With Icon Right */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="md">
          Continue
          <ArrowRight size={16} className="ml-2" />
        </Button>
        <Caption>Icon Right</Caption>
      </div>

      {/* 7. Icon Only */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="md" className="p-2">
          <Settings size={18} />
        </Button>
        <Caption>Icon Only</Caption>
      </div>

      {/* 8. Loading State */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary" size="md" disabled>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
          Loading...
        </Button>
        <Caption>Loading</Caption>
      </div>

      {/* 9. Disabled */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary" size="md" disabled>
          Disabled
        </Button>
        <Caption>Disabled</Caption>
      </div>

      {/* 10. Full Width */}
      <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-5">
        <Button variant="primary" size="md" className="w-full">
          Full Width Button
        </Button>
        <Caption>Full Width</Caption>
      </div>
    </div>
  </div>
);

// Group 2: Size Variations (6 buttons)
const SizeButtons = () => (
  <div className="space-y-6">
    <Heading level={4}>Size Variations</Heading>
    <div className="flex flex-wrap items-center gap-4">
      {/* 11. Extra Small */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
          XS
        </Button>
        <Caption>Extra Small</Caption>
      </div>

      {/* 12. Small */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Caption>Small</Caption>
      </div>

      {/* 13. Medium */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="md">
          Medium
        </Button>
        <Caption>Medium</Caption>
      </div>

      {/* 14. Large */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Caption>Large</Caption>
      </div>

      {/* 15. Extra Large */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
          XL
        </Button>
        <Caption>Extra Large</Caption>
      </div>

      {/* 16. Custom Size */}
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" className="px-10 py-3 rounded-xl">
          Custom
        </Button>
        <Caption>Custom Size</Caption>
      </div>
    </div>
  </div>
);

// Group 3: Icon Buttons (12 buttons)
const IconButtons = () => (
  <div className="space-y-6">
    <Heading level={4}>Icon Buttons</Heading>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {[
        { icon: <Heart size={18} />, label: "Like" },
        { icon: <Share2 size={18} />, label: "Share" },
        { icon: <Download size={18} />, label: "Download" },
        { icon: <Copy size={18} />, label: "Copy" },
        { icon: <Star size={18} />, label: "Star" },
        { icon: <Bookmark size={18} />, label: "Save" },
        { icon: <Bell size={18} />, label: "Notify" },
        { icon: <Settings size={18} />, label: "Settings" },
        { icon: <Search size={18} />, label: "Search" },
        { icon: <Filter size={18} />, label: "Filter" },
        { icon: <Edit size={18} />, label: "Edit" },
        { icon: <Trash2 size={18} />, label: "Delete" },
      ].map((btn, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <Button variant="ghost" size="md" className="p-3">
            {btn.icon}
          </Button>
          <Caption>{btn.label}</Caption>
        </div>
      ))}
    </div>
  </div>
);

// Group 4: Social Media Buttons (8 buttons)
const SocialButtons = () => (
  <div className="space-y-6">
    <Heading level={4}>Social Actions</Heading>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: <ThumbsUp size={16} />, label: "Like", count: "1.2K" },
        { icon: <MessageCircle size={16} />, label: "Comment", count: "89" },
        { icon: <Share2 size={16} />, label: "Share", count: "45" },
        { icon: <Bookmark size={16} />, label: "Save", count: "" },
        { icon: <Heart size={16} />, label: "Love", count: "2.4K" },
        { icon: <Eye size={16} />, label: "Views", count: "5.6K" },
        { icon: <Users size={16} />, label: "Follow", count: "1K" },
        { icon: <Bell size={16} />, label: "Notify", count: "" },
      ].map((btn, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <Button variant="ghost" size="sm" className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {btn.icon}
                <span>{btn.label}</span>
              </div>
              {btn.count && <Caption>{btn.count}</Caption>}
            </div>
          </Button>
        </div>
      ))}
    </div>
  </div>
);

// Group 5: Action Buttons (8 buttons)
const ActionButtons = () => (
  <div className="space-y-6">
    <Heading level={4}>Call to Action</Heading>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          icon: <ShoppingCart size={16} />,
          label: "Add to Cart",
          variant: "primary" as const,
        },
        {
          icon: <CreditCard size={16} />,
          label: "Buy Now",
          variant: "primary" as const,
        },
        {
          icon: <Download size={16} />,
          label: "Download Now",
          variant: "outline" as const,
        },
        {
          icon: <Mail size={16} />,
          label: "Subscribe",
          variant: "primary" as const,
        },
        {
          icon: <Users size={16} />,
          label: "Join Community",
          variant: "outline" as const,
        },
        {
          icon: <Calendar size={16} />,
          label: "Schedule Meeting",
          variant: "secondary" as const,
        },
        {
          icon: <Phone size={16} />,
          label: "Contact Sales",
          variant: "outline" as const,
        },
        {
          icon: <ExternalLink size={16} />,
          label: "View Details",
          variant: "ghost" as const,
        },
      ].map((btn, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <Button variant={btn.variant} size="md" className="w-full">
            {btn.icon}
            <span className="ml-2">{btn.label}</span>
          </Button>
        </div>
      ))}
    </div>
  </div>
);

// Group 6: Status Buttons (6 buttons)
const StatusButtons = () => (
  <div className="space-y-6">
    <Heading level={4}>Status Indicators</Heading>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[
        {
          icon: <Check size={16} />,
          label: "Completed",
          badge: "success",
          variant: "outline" as const,
        },
        {
          icon: <Clock size={16} />,
          label: "Pending",
          badge: "warning",
          variant: "outline" as const,
        },
        {
          icon: <X size={16} />,
          label: "Failed",
          badge: "error",
          variant: "outline" as const,
        },
        {
          icon: <Play size={16} />,
          label: "In Progress",
          badge: "info",
          variant: "secondary" as const,
        },
        {
          icon: <Pause size={16} />,
          label: "Paused",
          badge: "warning",
          variant: "secondary" as const,
        },
        {
          icon: <AlertCircle />,
          label: "Warning",
          badge: "warning",
          variant: "outline" as const,
        },
      ].map((btn, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <Button variant={btn.variant} size="md" className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {btn.icon}
                <span>{btn.label}</span>
              </div>
              <div className={`w-2 h-2 rounded-full bg-${btn.badge}`} />
            </div>
          </Button>
        </div>
      ))}
    </div>
  </div>
);

// Missing AlertCircle icon component
const AlertCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

// Main Showcase Component
export default function PremiumButtonShowcase() {
  return (
    <PremiumDesignsLayout>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Heading level={1} className="mb-2">
              Premium Button Collection
            </Heading>
            <Paragraph color="secondary">
              50+ unique button designs showcasing different use cases, sizes,
              and styles
            </Paragraph>
          </div>

          <div className="space-y-12">
            <BasicButtons />
            <SizeButtons />
            <IconButtons />
            <SocialButtons />
            <ActionButtons />
            <StatusButtons />
          </div>

          {/* Stats Section */}
          <div className="mt-12 p-6 rounded-xl bg-surface">
            <div className="flex items-center justify-between mb-4">
              <Heading level={4}>Button Collection Stats</Heading>
              <Caption>All buttons use only Zaalim UI components</Caption>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Total Buttons</SmallText>
                <Title>50+</Title>
              </div>
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Variants</SmallText>
                <Title>All 4</Title>
              </div>
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Icon Types</SmallText>
                <Title>100+</Title>
              </div>
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Use Cases</SmallText>
                <Title>6 Categories</Title>
              </div>
            </div>
          </div>

          {/* Usage Example */}
          <div className="mt-8 p-6 rounded-xl border border-surfaceBorder">
            <Heading level={4} className="mb-4">
              Usage Example
            </Heading>
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Button variant="primary" size="md">
                  <Star size={16} className="mr-2" />
                  Primary Action
                </Button>
                <Button variant="outline" size="md">
                  Secondary
                </Button>
                <Button variant="ghost" size="md">
                  <Settings size={16} />
                </Button>
              </div>
              <Code className="block p-4 rounded-lg">
                {`<Button variant="primary" size="md">
  <Star size={16} className="mr-2" />
  Primary Action
</Button>`}
              </Code>
            </div>
          </div>
        </div>
      </div>
    </PremiumDesignsLayout>
  );
}
