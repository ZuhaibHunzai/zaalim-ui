"use client";

import { Button } from "zaalim-ui";
import {
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  Send,
  Share2,
  Heart,
  Star,
  ShoppingCart,
  User,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Menu,
  Home,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  RefreshCw,
  Zap,
  TrendingUp,
  Award,
  ImageIcon,
  Camera,
  File,
  Folder,
  Copy,
  Clipboard,
  ExternalLink,
  Link,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  MoreHorizontal,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Archive,
  Flag,
} from "lucide-react";
import { PremiumDesignsLayout } from "../layout/DesignsLayout";

export default function ButtonsShowcase() {
  return (
    <PremiumDesignsLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Button Showcase</h1>
            <p className="text-muted-foreground">
              50+ beautiful button designs using the Aurora UI library
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Primary Variants - Different Sizes */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Primary - Small</p>
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Primary - Medium</p>
              <Button variant="primary" size="md">
                Continue
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Primary - Large</p>
              <Button variant="primary" size="lg">
                Submit Form
              </Button>
            </div>

            {/* Primary with Icons */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Download</p>
              <Button variant="primary" size="md">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Upload</p>
              <Button variant="primary" size="md">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Send Message</p>
              <Button variant="primary" size="md">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Save Changes</p>
              <Button variant="primary" size="md">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Share Content</p>
              <Button variant="primary" size="md">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Secondary Variants */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Secondary</p>
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Edit</p>
              <Button variant="secondary" size="md">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Settings</p>
              <Button variant="secondary" size="md">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Profile</p>
              <Button variant="secondary" size="md">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Notifications</p>
              <Button variant="secondary" size="md">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>

            {/* Outline Variants */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Outline</p>
              <Button variant="outline" size="md">
                Learn More
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">View Details</p>
              <Button variant="outline" size="md">
                View Details
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Add Item</p>
              <Button variant="outline" size="md">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Filter</p>
              <Button variant="outline" size="md">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Search</p>
              <Button variant="outline" size="md">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Ghost Variants */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Ghost</p>
              <Button variant="ghost" size="md">
                Close
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Menu</p>
              <Button variant="ghost" size="md">
                <Menu className="w-4 h-4 mr-2" />
                Menu
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Home</p>
              <Button variant="ghost" size="md">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">More Options</p>
              <Button variant="ghost" size="md">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Icon Only Buttons */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Like</p>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Favorite</p>
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Delete</p>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Copy</p>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            {/* E-commerce Buttons */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Add to Cart</p>
              <Button variant="primary" size="md">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Buy Now</p>
              <Button variant="primary" size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Checkout</p>
              <Button variant="primary" size="md">
                Proceed to Checkout
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Authentication Buttons */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Sign In</p>
              <Button variant="primary" size="md">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Sign Out</p>
              <Button variant="secondary" size="md">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Lock Account</p>
              <Button variant="outline" size="md">
                <Lock className="w-4 h-4 mr-2" />
                Lock
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Unlock</p>
              <Button variant="outline" size="md">
                <Unlock className="w-4 h-4 mr-2" />
                Unlock
              </Button>
            </div>

            {/* Media Controls */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Play</p>
              <Button variant="primary" size="md">
                <Play className="w-4 h-4 mr-2" />
                Play
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Pause</p>
              <Button variant="secondary" size="md">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Mute</p>
              <Button variant="ghost" size="sm">
                <VolumeX className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Unmute</p>
              <Button variant="ghost" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>

            {/* File Management */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Upload Photo</p>
              <Button variant="outline" size="md">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Choose Image</p>
              <Button variant="outline" size="md">
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Open File</p>
              <Button variant="secondary" size="md">
                <File className="w-4 h-4 mr-2" />
                Open File
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">New Folder</p>
              <Button variant="secondary" size="md">
                <Folder className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Back</p>
              <Button variant="ghost" size="md">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Next</p>
              <Button variant="primary" size="md">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Expand</p>
              <Button variant="ghost" size="sm">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Collapse</p>
              <Button variant="ghost" size="sm">
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>

            {/* Status & Feedback */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Confirm</p>
              <Button variant="primary" size="md">
                <Check className="w-4 h-4 mr-2" />
                Confirm
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Reject</p>
              <Button variant="secondary" size="md">
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Success</p>
              <Button variant="outline" size="md">
                <CheckCircle className="w-4 h-4 mr-2" />
                Success
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Error</p>
              <Button variant="outline" size="md">
                <XCircle className="w-4 h-4 mr-2" />
                Error
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Warning</p>
              <Button variant="outline" size="md">
                <AlertCircle className="w-4 h-4 mr-2" />
                Warning
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Info</p>
              <Button variant="ghost" size="md">
                <Info className="w-4 h-4 mr-2" />
                Info
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Help</p>
              <Button variant="ghost" size="md">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
            </div>

            {/* Social & Interaction */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Thumbs Up</p>
              <Button variant="ghost" size="md">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Thumbs Down</p>
              <Button variant="ghost" size="md">
                <ThumbsDown className="w-4 h-4 mr-2" />
                Dislike
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Bookmark</p>
              <Button variant="outline" size="md">
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmark
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Archive</p>
              <Button variant="secondary" size="md">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Flag</p>
              <Button variant="ghost" size="md">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Message</p>
              <Button variant="primary" size="md">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>

            {/* Utility Buttons */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Refresh</p>
              <Button variant="outline" size="md">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">External Link</p>
              <Button variant="ghost" size="md">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Copy Link</p>
              <Button variant="outline" size="md">
                <Link className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Clipboard</p>
              <Button variant="outline" size="md">
                <Clipboard className="w-4 h-4 mr-2" />
                Paste
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">View</p>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Hide</p>
              <Button variant="ghost" size="sm">
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Maximize</p>
              <Button variant="ghost" size="sm">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Minimize</p>
              <Button variant="ghost" size="sm">
                <Minimize className="w-4 h-4" />
              </Button>
            </div>

            {/* Contact & Schedule */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Email</p>
              <Button variant="outline" size="md">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Call</p>
              <Button variant="primary" size="md">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Location</p>
              <Button variant="outline" size="md">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Schedule</p>
              <Button variant="primary" size="md">
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Time</p>
              <Button variant="ghost" size="md">
                <Clock className="w-4 h-4 mr-2" />
                Set Time
              </Button>
            </div>

            {/* Achievement & Gamification */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Award</p>
              <Button variant="primary" size="md">
                <Award className="w-4 h-4 mr-2" />
                Claim Reward
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Trending</p>
              <Button variant="outline" size="md">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Trends
              </Button>
            </div>

            {/* Disabled States */}
            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Disabled Primary</p>
              <Button variant="primary" size="md" disabled>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Disabled Secondary</p>
              <Button variant="secondary" size="md" disabled>
                Cancel
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Disabled Outline</p>
              <Button variant="outline" size="md" disabled>
                Learn More
              </Button>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border">
              <p className="text-xs font-medium mb-1">Disabled Ghost</p>
              <Button variant="ghost" size="md" disabled>
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PremiumDesignsLayout>
  );
}
