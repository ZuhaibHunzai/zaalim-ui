"use client";

import { Avatar, AvatarGroup } from "zaalim-ui";
import { Heading, Subtitle, SmallText, Caption } from "zaalim-ui";
import {
  User,
  Crown,
  Heart,
  Shield,
  Star,
  Zap,
  Camera,
  Music,
  Briefcase,
  Gamepad2,
  Coffee,
  Palette,
  Code,
  Rocket,
  Headphones,
} from "lucide-react";
import { PremiumDesignsLayout } from "../layout/DesignsLayout";

export default function AvatarsShowcase() {
  return (
    <PremiumDesignsLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <Heading level={1}>Avatar Component Showcase</Heading>
            <Subtitle>Explore 20+ avatar variations from Aurora UI</Subtitle>
          </div>

          {/* Size Variations */}
          <section className="space-y-6">
            <Heading level={3}>Size Variations</Heading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-end">
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xs" fallback="John Doe" />
                <SmallText>XS - 24px</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="sm" fallback="Sarah Smith" />
                <SmallText>SM - 32px</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="md" fallback="Mike Johnson" />
                <SmallText>MD - 40px</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="lg" fallback="Emma Wilson" />
                <SmallText>LG - 48px</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="Alex Brown" />
                <SmallText>XL - 56px</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="2xl" fallback="Lisa Chen" />
                <SmallText>2XL - 64px</SmallText>
              </div>
            </div>
          </section>

          {/* Shape Variations */}
          <section className="space-y-6">
            <Heading level={3}>Shape Variations</Heading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" shape="circle" fallback="Circle Avatar" />
                <SmallText>Circle</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" shape="rounded" fallback="Rounded Avatar" />
                <SmallText>Rounded</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" shape="square" fallback="Square Avatar" />
                <SmallText>Square</SmallText>
              </div>
            </div>
          </section>

          {/* Status Indicators */}
          <section className="space-y-6">
            <Heading level={3}>Status Indicators</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="Online User" status="online" />
                <SmallText>Online</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="Away User" status="away" />
                <SmallText>Away</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="Busy User" status="busy" />
                <SmallText>Busy</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="Offline User" status="offline" />
                <SmallText>Offline</SmallText>
              </div>
            </div>
          </section>

          {/* Status Placement */}
          <section className="space-y-6">
            <Heading level={3}>Status Placement Options</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="TR"
                  status="online"
                  statusPlacement="top-right"
                />
                <SmallText>Top Right</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="TL"
                  status="online"
                  statusPlacement="top-left"
                />
                <SmallText>Top Left</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="BR"
                  status="online"
                  statusPlacement="bottom-right"
                />
                <SmallText>Bottom Right</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="BL"
                  status="online"
                  statusPlacement="bottom-left"
                />
                <SmallText>Bottom Left</SmallText>
              </div>
            </div>
          </section>

          {/* Icon Avatars */}
          <section className="space-y-6">
            <Heading level={3}>Icon Avatars</Heading>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<User className="w-6 h-6 text-white" />}
                />
                <Caption>User</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Crown className="w-6 h-6 text-white" />}
                />
                <Caption>Crown</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Heart className="w-6 h-6 text-white" />}
                />
                <Caption>Heart</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Shield className="w-6 h-6 text-white" />}
                />
                <Caption>Shield</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Star className="w-6 h-6 text-white" />}
                />
                <Caption>Star</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Zap className="w-6 h-6 text-white" />}
                />
                <Caption>Zap</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Camera className="w-6 h-6 text-white" />}
                />
                <Caption>Camera</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Music className="w-6 h-6 text-white" />}
                />
                <Caption>Music</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Briefcase className="w-6 h-6 text-white" />}
                />
                <Caption>Briefcase</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Gamepad2 className="w-6 h-6 text-white" />}
                />
                <Caption>Gaming</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Coffee className="w-6 h-6 text-white" />}
                />
                <Caption>Coffee</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Palette className="w-6 h-6 text-white" />}
                />
                <Caption>Palette</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Code className="w-6 h-6 text-white" />}
                />
                <Caption>Code</Caption>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="lg"
                  icon={<Rocket className="w-6 h-6 text-white" />}
                />
                <Caption>Rocket</Caption>
              </div>
            </div>
          </section>

          {/* Border Variations */}
          <section className="space-y-6">
            <Heading level={3}>Border Styles</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="No Border" border={false} />
                <SmallText>No Border</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="Default"
                  border
                  borderColor="default"
                />
                <SmallText>Default Border</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar size="xl" fallback="Brand" border borderColor="brand" />
                <SmallText>Brand Border</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="Surface"
                  border
                  borderColor="surface"
                />
                <SmallText>Surface Border</SmallText>
              </div>
            </div>
          </section>

          {/* Clickable Avatars */}
          <section className="space-y-6">
            <Heading level={3}>Interactive Avatars</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="Click Me"
                  clickable
                  status="online"
                />
                <SmallText>Clickable</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  icon={<User className="w-6 h-6 text-white" />}
                  clickable
                  border
                  borderColor="brand"
                />
                <SmallText>Icon Clickable</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="Hover Me"
                  clickable
                  shape="rounded"
                  status="away"
                />
                <SmallText>Rounded Clickable</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  icon={<Crown className="w-6 h-6 text-white" />}
                  clickable
                  shape="square"
                />
                <SmallText>Square Clickable</SmallText>
              </div>
            </div>
          </section>

          {/* Avatar Groups */}
          <section className="space-y-6">
            <Heading level={3}>Avatar Groups</Heading>
            <div className="space-y-8">
              <div className="flex flex-col gap-3">
                <SmallText>Team Members (Small)</SmallText>
                <AvatarGroup size="sm">
                  <Avatar fallback="Alice Johnson" status="online" />
                  <Avatar fallback="Bob Smith" status="away" />
                  <Avatar fallback="Carol White" status="online" />
                  <Avatar fallback="David Lee" status="busy" />
                </AvatarGroup>
              </div>

              <div className="flex flex-col gap-3">
                <SmallText>Project Contributors (Medium)</SmallText>
                <AvatarGroup size="md">
                  <Avatar fallback="Emma Davis" />
                  <Avatar fallback="Frank Miller" />
                  <Avatar fallback="Grace Taylor" />
                  <Avatar fallback="Henry Wilson" />
                  <Avatar fallback="Ivy Martinez" />
                </AvatarGroup>
              </div>

              <div className="flex flex-col gap-3">
                <SmallText>Large Team (Max 4 shown)</SmallText>
                <AvatarGroup size="md" max={4}>
                  <Avatar fallback="User One" />
                  <Avatar fallback="User Two" />
                  <Avatar fallback="User Three" />
                  <Avatar fallback="User Four" />
                  <Avatar fallback="User Five" />
                  <Avatar fallback="User Six" />
                  <Avatar fallback="User Seven" />
                </AvatarGroup>
              </div>

              <div className="flex flex-col gap-3">
                <SmallText>Icon Group (Large)</SmallText>
                <AvatarGroup size="lg">
                  <Avatar icon={<Code className="w-6 h-6 text-white" />} />
                  <Avatar icon={<Palette className="w-6 h-6 text-white" />} />
                  <Avatar icon={<Rocket className="w-6 h-6 text-white" />} />
                  <Avatar
                    icon={<Headphones className="w-6 h-6 text-white" />}
                  />
                </AvatarGroup>
              </div>
            </div>
          </section>

          {/* Combined Features */}
          <section className="space-y-6">
            <Heading level={3}>Combined Features</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="Premium User"
                  border
                  borderColor="brand"
                  status="online"
                  shape="circle"
                />
                <SmallText>Premium Online</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  icon={<Crown className="w-6 h-6 text-white" />}
                  border
                  borderColor="brand"
                  status="online"
                  shape="rounded"
                />
                <SmallText>VIP Member</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  icon={<Shield className="w-6 h-6 text-white" />}
                  border
                  borderColor="default"
                  status="busy"
                  shape="square"
                  clickable
                />
                <SmallText>Admin Busy</SmallText>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar
                  size="xl"
                  fallback="Pro User"
                  border
                  borderColor="brand"
                  status="away"
                  shape="rounded"
                  clickable
                />
                <SmallText>Pro Away</SmallText>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PremiumDesignsLayout>
  );
}
