
import { Heart, SmileIcon, ThumbsUp, Star } from "lucide-react";
import { ReactionType } from "@/types/story";

export const EMOJI_REACTIONS: ReactionType[] = [
  { emoji: "❤️", name: "heart", icon: Heart },
  { emoji: "😊", name: "smile", icon: SmileIcon },
  { emoji: "👍", name: "thumbsUp", icon: ThumbsUp },
  { emoji: "⭐", name: "star", icon: Star },
  // Using Star again for fire since Fire is not available
  { emoji: "🔥", name: "fire", icon: Star },
];

// Mock stories data
export const getMockStories = () => [
  {
    id: "1",
    userId: "user1",
    userName: "أحمد المهندي",
    userAvatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1539020140153-e8c237112187",
    createdAt: "منذ 30 دقيقة",
    reactions: { heart: 3, smile: 1 }
  },
  {
    id: "2",
    userId: "user2",
    userName: "سارة العامري",
    userAvatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1489749098374-a6677454b9b0",
    createdAt: "منذ ساعتين",
    reactions: { thumbsUp: 2 }
  },
  {
    id: "3",
    userId: "user3",
    userName: "محمد الفاسي",
    userAvatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isVerified: false,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    createdAt: "منذ 3 ساعات"
  }
];

// Mock following data
export const getMockFollowing = () => ["user1", "user2"];
