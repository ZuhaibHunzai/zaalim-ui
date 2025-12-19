import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "zaalim-ui";
import { Button } from "zaalim-ui";
import {
  Heading,
  Title,
  Subtitle,
  Paragraph,
  SmallText,
  Label,
  Caption,
  Code,
} from "zaalim-ui";
import {
  Star,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  Settings,
  Download,
  ArrowRight,
  Heart,
  MessageSquare,
  Share2,
  Eye,
  Bookmark,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import { PremiumDesignsLayout } from "../layout/DesignsLayout";

// Card 1: Product/Service Card
const ProductCard = () => {
  return (
    <Card padding="lg" hoverable variant="elevated" className="relative">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="sm" className="p-1">
          <Heart size={18} />
        </Button>
      </div>
      <CardHeader withDivider={false}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-accent flex items-center justify-center">
            <Settings size={24} />
          </div>
          <div>
            <Heading level={4}>Pro Analytics</Heading>
            <SmallText color="muted">Advanced Insights Suite</SmallText>
          </div>
        </div>
      </CardHeader>
      <CardContent spacing="md">
        <Paragraph color="secondary">
          Get real-time analytics with predictive AI and custom reporting
          dashboards.
        </Paragraph>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <CheckCircle size={16} className="text-success" />
            <SmallText>AI Powered</SmallText>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={16} className="text-brand-500" />
            <SmallText>Real-time</SmallText>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div>
            <Title>$49</Title>
            <Caption>/month</Caption>
          </div>
          <Button variant="primary" size="sm">
            Get Started
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card 2: Article/Blog Card
const ArticleCard = () => {
  return (
    <Card hoverable variant="default" className="h-full">
      <div className="aspect-video w-full rounded-t-xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-brand-400 to-brand-300" />
      </div>
      <CardHeader withDivider={false}>
        <div className="flex items-center gap-2 mb-2">
          <Label color="brand">Technology</Label>
          <Caption>• 5 min read</Caption>
        </div>
        <Heading level={5}>The Future of UI Design Systems</Heading>
      </CardHeader>
      <CardContent spacing="sm">
        <Paragraph color="secondary">
          How design systems are evolving with AI integration and component
          intelligence.
        </Paragraph>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} />
            <Caption>24</Caption>
          </div>
          <div className="flex items-center gap-2">
            <Share2 size={16} />
            <Caption>8</Caption>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark size={16} />
            <Caption>Saved</Caption>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Card 3: Profile Card
const ProfileCard = () => {
  return (
    <Card padding="lg" variant="ghost" className="text-center">
      <div className="relative mx-auto w-20 h-20 mb-4">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-500 to-accent" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center border-2 border-background">
          <CheckCircle size={14} />
        </div>
      </div>
      <CardHeader withDivider={false}>
        <Title>Alex Morgan</Title>
        <Subtitle>UI/UX Designer</Subtitle>
        <Paragraph color="muted" className="mt-2">
          Creating beautiful interfaces that users love. Focused on
          accessibility and modern design patterns.
        </Paragraph>
      </CardHeader>
      <CardContent spacing="sm">
        <div className="flex justify-center gap-6 my-3">
          <div className="text-center">
            <Heading level={6}>124</Heading>
            <Caption>Projects</Caption>
          </div>
          <div className="text-center">
            <Heading level={6}>89</Heading>
            <Caption>Followers</Caption>
          </div>
          <div className="text-center">
            <Heading level={6}>4.8</Heading>
            <Caption>Rating</Caption>
          </div>
        </div>
      </CardContent>
      <CardFooter withDivider={false}>
        <div className="flex gap-2 w-full">
          <Button variant="primary" className="flex-1">
            <MessageSquare size={16} className="mr-2" />
            Message
          </Button>
          <Button variant="outline" className="flex-1">
            Follow
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card 4: Stats Card
const StatsCard = () => {
  return (
    <Card padding="md" variant="default">
      <CardHeader withDivider={false}>
        <div className="flex items-center justify-between">
          <Title>Revenue</Title>
          <div className="p-2 rounded-lg bg-success/10">
            <TrendingUp size={20} className="text-success" />
          </div>
        </div>
      </CardHeader>
      <CardContent spacing="none">
        <div className="mb-4">
          <Heading level={3}>$24,580</Heading>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-success" />
            <SmallText color="success">+12.5%</SmallText>
            <Caption>from last month</Caption>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <SmallText>Monthly Target</SmallText>
            <SmallText>85%</SmallText>
          </div>
          <div className="h-2 rounded-full bg-surfaceBorder overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
              style={{ width: "85%" }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter withDivider={false}>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <Caption>Last updated: Today, 2:30 PM</Caption>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card 5: Event Card
const EventCard = () => {
  return (
    <Card padding="lg" hoverable variant="elevated">
      <CardHeader withDivider={false}>
        <div className="flex items-center justify-between mb-4">
          <Label color="error">Upcoming</Label>
          <div className="px-3 py-1 rounded-full bg-brand-50">
            <Caption color="brand">Free</Caption>
          </div>
        </div>
        <Heading level={5}>Design Systems Conference</Heading>
        <Paragraph color="secondary" className="mt-2">
          Join industry leaders to discuss the future of component libraries and
          design tools.
        </Paragraph>
      </CardHeader>
      <CardContent spacing="md">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar size={18} />
            <div>
              <SmallText>Date & Time</SmallText>
              <Paragraph>Nov 25, 2024 • 10:00 AM PST</Paragraph>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <div>
              <SmallText>Location</SmallText>
              <Paragraph>Virtual & San Francisco</Paragraph>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users size={18} />
            <div>
              <SmallText>Attendees</SmallText>
              <Paragraph>1,240 registered</Paragraph>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button variant="primary" className="flex-1">
            Register Now
          </Button>
          <Button variant="outline">
            <Share2 size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card 6: Pricing Card
const PricingCard = () => {
  return (
    <Card
      padding="lg"
      variant="default"
      className="relative border-2 border-brand-500"
    >
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="px-4 py-1 rounded-full bg-brand-500">
          <SmallText color="inverted">Most Popular</SmallText>
        </div>
      </div>
      <CardHeader withDivider={false} className="text-center">
        <Heading level={4}>Professional</Heading>
        <div className="my-4">
          <div className="flex items-baseline justify-center">
            <DollarSign size={24} />
            <Heading level={2}>29</Heading>
            <Paragraph color="muted">/month</Paragraph>
          </div>
          <Caption>Billed annually ($348/year)</Caption>
        </div>
      </CardHeader>
      <CardContent spacing="md">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success" />
            <Paragraph>Up to 10 projects</Paragraph>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success" />
            <Paragraph>Advanced analytics</Paragraph>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success" />
            <Paragraph>Priority support</Paragraph>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success" />
            <Paragraph>Custom themes</Paragraph>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success" />
            <Paragraph>Team collaboration</Paragraph>
          </div>
        </div>
      </CardContent>
      <CardFooter withDivider={false}>
        <Button variant="primary" size="lg" className="w-full">
          Get Started
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Card 7: Testimonial Card
const TestimonialCard = () => {
  return (
    <Card padding="lg" variant="ghost" className="h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-300 to-brand-400" />
        <div>
          <Title>Sarah Chen</Title>
          <Subtitle>Product Lead at TechCorp</Subtitle>
        </div>
      </div>
      <CardContent spacing="md">
        <div className="mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-warning text-warning" />
            ))}
          </div>
        </div>
        <Paragraph color="secondary" className="italic">
          "Zaalim UI has transformed our development workflow. The theming
          system is incredibly flexible, and our team's productivity has
          increased by 40% since adoption."
        </Paragraph>
      </CardContent>
      <CardFooter withDivider={false}>
        <div className="flex items-center justify-between w-full">
          <Caption>Posted 2 weeks ago</Caption>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <ThumbsUp />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 size={16} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card 8: Feature Card
const FeatureCard = () => {
  return (
    <Card padding="md" hoverable variant="default" className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent flex items-center justify-center mx-auto mb-4">
        <Settings size={28} />
      </div>
      <CardHeader withDivider={false}>
        <Heading level={5}>Theme Engine</Heading>
      </CardHeader>
      <CardContent spacing="sm">
        <Paragraph color="secondary">
          Dynamic theming system with real-time preview. Switch between light
          and dark modes instantly.
        </Paragraph>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface">
          <Code>useTheme()</Code>
          <Caption>Hook available</Caption>
        </div>
      </CardContent>
      <CardFooter withDivider={false}>
        <Button variant="outline" size="sm" className="w-full">
          Learn More
          <ExternalLink size={14} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Card 9: Task/Todo Card
const TaskCard = () => {
  return (
    <Card
      padding="md"
      variant="default"
      className="border-l-4 border-brand-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <div className="w-5 h-5 rounded border-2 border-surfaceBorder" />
          </div>
          <div>
            <Title>Implement Dark Mode</Title>
            <Paragraph color="secondary" className="mt-1">
              Add dark theme support to all dashboard components
            </Paragraph>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <Caption>Due: Today</Caption>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                <Caption>Team: Design</Caption>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical />
        </Button>
      </div>
      <CardFooter withDivider={false} className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-brand-300 to-brand-400"
              />
            ))}
          </div>
          <Label color="brand">In Progress</Label>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card 10: Download/Resource Card
const DownloadCard = () => {
  return (
    <Card
      padding="lg"
      variant="elevated"
      className="bg-gradient-to-br from-surface to-surfaceHover"
    >
      <CardHeader withDivider={false}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-brand-50">
            <Download size={24} className="text-brand-500" />
          </div>
          <div>
            <Heading level={4}>UI Kit v2.0</Heading>
            <SmallText color="muted">Latest release</SmallText>
          </div>
        </div>
      </CardHeader>
      <CardContent spacing="md">
        <Paragraph color="secondary">
          Complete UI kit with 150+ components, 30+ templates, and full theme
          support. Includes Figma files and documentation.
        </Paragraph>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <FileText />
            <SmallText>Figma Included</SmallText>
          </div>
          <div className="flex items-center gap-1">
            {/* <Code size={16} /> */}
            <SmallText>TypeScript</SmallText>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button variant="primary" className="flex-1">
            <Download size={18} className="mr-2" />
            Download
          </Button>
          <Button variant="outline">
            <Eye size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Main component to display all cards in a grid

export default function PremiumCards() {
  const cards = [
    { title: "Product Card", component: <ProductCard /> },
    { title: "Article Card", component: <ArticleCard /> },
    { title: "Profile Card", component: <ProfileCard /> },
    { title: "Stats Card", component: <StatsCard /> },
    { title: "Event Card", component: <EventCard /> },
    { title: "Pricing Card", component: <PricingCard /> },
    { title: "Testimonial Card", component: <TestimonialCard /> },
    { title: "Feature Card", component: <FeatureCard /> },
    { title: "Task Card", component: <TaskCard /> },
    { title: "Download Card", component: <DownloadCard /> },
  ];
  return (
    <PremiumDesignsLayout>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Heading level={1} className="mb-2">
              Premium Card Collection
            </Heading>
            <Paragraph color="secondary">
              10 distinct card designs showcasing different use cases and
              layouts
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col">
                <div className="mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-500" />
                  <Label>{card.title}</Label>
                </div>
                <div className="flex-1">{card.component}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-surface">
            <div className="flex items-center justify-between mb-4">
              <Heading level={4}>Usage Information</Heading>
              <Caption>All cards use only Zaalim UI components</Caption>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Components Used</SmallText>
                <Title>3</Title>
              </div>
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Card Variants</SmallText>
                <Title>All 3</Title>
              </div>
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Icons Used</SmallText>
                <Title>24</Title>
              </div>
              <div className="p-3 rounded-lg bg-surfaceHover">
                <SmallText>Responsive</SmallText>
                <Title>Yes</Title>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PremiumDesignsLayout>
  );
}
{
  /* export const Cards = () => {
  const cards = [
    { title: "Product Card", component: <ProductCard /> },
    { title: "Article Card", component: <ArticleCard /> },
    { title: "Profile Card", component: <ProfileCard /> },
    { title: "Stats Card", component: <StatsCard /> },
    { title: "Event Card", component: <EventCard /> },
    { title: "Pricing Card", component: <PricingCard /> },
    { title: "Testimonial Card", component: <TestimonialCard /> },
    { title: "Feature Card", component: <FeatureCard /> },
    { title: "Task Card", component: <TaskCard /> },
    { title: "Download Card", component: <DownloadCard /> },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Heading level={1} className="mb-2">
            Premium Card Collection
          </Heading>
          <Paragraph color="secondary">
            10 distinct card designs showcasing different use cases and layouts
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <Label>{card.title}</Label>
              </div>
              <div className="flex-1">{card.component}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-surface">
          <div className="flex items-center justify-between mb-4">
            <Heading level={4}>Usage Information</Heading>
            <Caption>All cards use only Zaalim UI components</Caption>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-surfaceHover">
              <SmallText>Components Used</SmallText>
              <Title>3</Title>
            </div>
            <div className="p-3 rounded-lg bg-surfaceHover">
              <SmallText>Card Variants</SmallText>
              <Title>All 3</Title>
            </div>
            <div className="p-3 rounded-lg bg-surfaceHover">
              <SmallText>Icons Used</SmallText>
              <Title>24</Title>
            </div>
            <div className="p-3 rounded-lg bg-surfaceHover">
              <SmallText>Responsive</SmallText>
              <Title>Yes</Title>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; */
}

// For missing lucide icons
const ThumbsUp = () => (
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
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const MoreVertical = () => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const FileText = () => (
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
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);
