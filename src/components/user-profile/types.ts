
export interface User {
  id: string;
  name: string;
  avatar: string;
  background: string;
  bio: string;
  phone: string;
  isVerified: boolean;
  rating: number;
  followersCount: number;
  followingCount: number;
  badge?: UserBadge;
  points?: number;
  tripCount?: number;
  referralCode?: string;
  city?: string;
  completionPercentage?: number;
}

export interface UserBadge {
  type: 'beginner' | 'silver' | 'gold' | 'vip';
  color: string;
  label: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags: string[];
}

export interface Trip {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  rating: number;
  originalPrice?: number;
  discountedPrice: number;
  currency: string;
  user: User;
}

export interface Notification {
  id: string;
  type: 'new_trip' | 'points_earned' | 'badge_upgrade' | 'referral' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: {
    tripId?: string;
    points?: number;
    badgeType?: string;
    referralCode?: string;
  };
}
