"use client";

import {
  Card,
  Button,
  CardHeader,
  CardContent,
  CardFooter,
  Heading,
  Paragraph,
} from "zaalim-ui";
// import { Button } from "zaalim-ui"
import { useTheme } from "zaalim-ui";
import { ThemeProvider, defaultTheme } from "zaalim-ui";
import {
  Heart,
  MessageCircle,
  Share2,
  Star,
  Check,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  MapPin,
  Award,
  Bookmark,
  Eye,
  Download,
  Play,
  DollarSign,
  Zap,
  Shield,
} from "lucide-react";
import { PremiumDesignsLayout } from "../layout/DesignsLayout";

export default function CardShowcase() {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <PremiumDesignsLayout>
      <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1
              className="text-4xl font-bold mb-3"
              style={{ color: colors.text.primary }}
            >
              Card Component Showcase
            </h1>
            <p style={{ color: colors.text.secondary }}>
              10 beautiful card designs for modern applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Blog Post Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-48 w-full"
                style={{
                  background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.accent})`,
                }}
              />
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-md"
                    style={{
                      backgroundColor: colors.brand[50],
                      color: colors.brand[500],
                    }}
                  >
                    Design
                  </span>
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: colors.text.muted }}
                  >
                    <Clock size={12} />5 min read
                  </span>
                </div>
                <Heading className="mb-2">Modern UI Design Trends</Heading>
                <Paragraph className="mb-4">
                  Exploring the latest patterns in contemporary interface design
                  and user experience.
                </Paragraph>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-sm"
                      style={{ color: colors.text.muted }}
                    >
                      <Heart size={16} />
                      <span>234</span>
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm"
                      style={{ color: colors.text.muted }}
                    >
                      <MessageCircle size={16} />
                      <span>12</span>
                    </button>
                  </div>
                  <button style={{ color: colors.text.muted }}>
                    <Share2 size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 2. Pricing Card */}
            <Card className="shadow-lg">
              <CardHeader className="text-center border-b-0">
                <Heading className="text-xl">Professional</Heading>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: colors.brand[500] }}
                  >
                    $49
                  </span>
                  <span style={{ color: colors.text.muted }}>/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Unlimited projects",
                    "Advanced analytics",
                    "Priority support",
                    "Custom domain",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div
                        className="rounded-full p-1"
                        style={{ backgroundColor: colors.brand[50] }}
                      >
                        <Check size={12} style={{ color: colors.brand[500] }} />
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: colors.text.secondary }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>

            {/* 3. Stats Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: colors.text.muted }}
                    >
                      Total Revenue
                    </p>
                    <h3
                      className="text-3xl font-bold mb-2"
                      style={{ color: colors.text.primary }}
                    >
                      $45,231
                    </h3>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} style={{ color: colors.success }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors.success }}
                      >
                        +20.1%
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: colors.text.muted }}
                      >
                        from last month
                      </span>
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: colors.brand[50] }}
                  >
                    <DollarSign
                      size={24}
                      style={{ color: colors.brand[500] }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. User Profile Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.accent})`,
                      color: colors.text.inverted,
                    }}
                  >
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ color: colors.text.primary }}
                    >
                      Jane Doe
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: colors.text.muted }}
                    >
                      Senior Product Designer
                    </p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-center">
                        <div
                          className="text-lg font-bold"
                          style={{ color: colors.text.primary }}
                        >
                          245
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: colors.text.muted }}
                        >
                          Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className="text-lg font-bold"
                          style={{ color: colors.text.primary }}
                        >
                          1.2k
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: colors.text.muted }}
                        >
                          Followers
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5. Event Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <Heading className="mb-1">Design Conference 2024</Heading>
                    <Paragraph>Annual design summit</Paragraph>
                  </div>
                  <button style={{ color: colors.text.muted }}>
                    <Bookmark size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} style={{ color: colors.brand[500] }} />
                    <span
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      March 15-17, 2024
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: colors.brand[500] }} />
                    <span
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} style={{ color: colors.brand[500] }} />
                    <span
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      1,234 attending
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="w-full">Register Now</Button>
              </CardFooter>
            </Card>

            {/* 6. Product Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div
                  className="h-48 flex items-center justify-center"
                  style={{ backgroundColor: colors.backgroundSubtle }}
                >
                  <div
                    className="w-32 h-32 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.brand[300]}, ${colors.accent})`,
                    }}
                  />
                </div>
                <div
                  className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold"
                  style={{
                    backgroundColor: colors.error,
                    color: colors.text.inverted,
                  }}
                >
                  -20%
                </div>
              </div>
              <CardContent>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      fill={colors.warning}
                      style={{ color: colors.warning }}
                    />
                  ))}
                  <span
                    className="text-xs ml-1"
                    style={{ color: colors.text.muted }}
                  >
                    (128)
                  </span>
                </div>
                <Heading className="text-base mb-2">
                  Premium Wireless Headphones
                </Heading>
                <div className="flex items-baseline gap-2 mb-4">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: colors.brand[500] }}
                  >
                    $159
                  </span>
                  <span
                    className="text-sm line-through"
                    style={{ color: colors.text.muted }}
                  >
                    $199
                  </span>
                </div>
                <Button className="w-full">Add to Cart</Button>
              </CardContent>
            </Card>

            {/* 7. Testimonial Card */}
            <Card
              className="hover:shadow-lg transition-shadow"
              // style={{ backgroundColor: colors.backgroundSubtle }}
            >
              <CardContent>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={colors.warning}
                      style={{ color: colors.warning }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  "This product has completely transformed how we work. The
                  interface is intuitive and the features are exactly what we
                  needed."
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                    style={{
                      backgroundColor: colors.brand[100],
                      color: colors.brand[500],
                    }}
                  >
                    SK
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: colors.text.primary }}
                    >
                      Sarah Johnson
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: colors.text.muted }}
                    >
                      CEO at TechCorp
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 8. Achievement Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.accent})`,
                    }}
                  >
                    <Award size={36} style={{ color: colors.text.inverted }} />
                  </div>
                  <Heading className="mb-2">Milestone Reached!</Heading>
                  <Paragraph className="mb-4">
                    You've completed 100 projects. Keep up the amazing work!
                  </Paragraph>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: colors.brand[50],
                      color: colors.brand[500],
                    }}
                  >
                    <Zap size={14} />
                    <span>+500 XP Earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 9. Media Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div
                  className="h-52 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.brand[500]}, ${colors.accent})`,
                  }}
                >
                  <button
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: colors.text.inverted,
                    }}
                  >
                    <Play
                      size={24}
                      fill={colors.brand[500]}
                      style={{
                        color: colors.brand[500],
                        marginLeft: "4px",
                      }}
                    />
                  </button>
                </div>
                <div
                  className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: colors.text.inverted,
                  }}
                >
                  12:45
                </div>
              </div>
              <CardContent>
                <Heading className="text-base mb-2">
                  UI Design Masterclass
                </Heading>
                <Paragraph className="mb-3">
                  Learn professional design techniques
                </Paragraph>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: colors.text.muted }}
                    >
                      <Eye size={14} />
                      12.5k
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: colors.text.muted }}
                    >
                      <Download size={14} />
                      3.2k
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 10. Feature Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colors.brand[50],
                  }}
                >
                  <Shield size={24} style={{ color: colors.brand[500] }} />
                </div>
                <Heading className="mb-2">Enterprise Security</Heading>
                <Paragraph className="mb-4 leading-relaxed">
                  Bank-level encryption and advanced security features to
                  protect your data 24/7.
                </Paragraph>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PremiumDesignsLayout>
  );
}
