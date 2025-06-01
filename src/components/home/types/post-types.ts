
export interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  userType?: 'traveler' | 'organizer';
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
}

export interface PostType {
  id: string;
  user: User;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags?: string[];
}

export interface CurrentUser {
  id: string;
  isVerified: boolean;
  userType?: 'traveler' | 'organizer';
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
}
