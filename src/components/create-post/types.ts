
import React from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  userType?: 'traveler' | 'organizer';
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
  postQuota: number;
  postsThisWeek: number;
}

export interface CreatePostProps {
  user: User;
  onPostBoxClick?: () => void;
}

export interface MediaUploadProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MediaPreviewProps {
  imagePreview: string | null;
  videoPreview: string | null;
  onClearImage: () => void;
  onClearVideo: () => void;
}

export interface HashtagProps {
  hashtags: string[];  // Changed from 'tag' to 'hashtags' to match usage
  onRemove: (tag: string) => void;
}

export interface HashtagDisplayProps {
  hashtags: string[];
  onRemove: (tag: string) => void;
}

export interface HashtagInputProps {
  newHashtag: string;
  onNewHashtagChange: (value: string) => void;
  onAddHashtag: () => void;
}

export interface MentionProps {
  mentions: string[];
  onRemove: (user: string) => void;
}

export interface LocationProps {
  location: string;
  onClear: () => void;
}

export interface PostFormActionsProps {
  onCancel: () => void;
  postQuota: number;
  postsThisWeek: number;
}
