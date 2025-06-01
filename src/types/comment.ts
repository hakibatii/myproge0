
// Define content types for comments
export type ContentType = "post" | "trip";

export interface CommentItem {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: CommentItem[];
}

// Define Comment type used in components
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userIsVerified?: boolean;
  content: string;
  timestamp: string;
  likes: number;
  contentId: string;
  contentType: ContentType;
  parentId?: string;
  replies?: Comment[];
}

// Define params for Comments page
export interface CommentsPageParams {
  contentId: string;
  contentType: ContentType;
  title?: string;
  contentPreview?: string;
  contentImage?: string;
  userName?: string;
  userAvatar?: string;
  userIsVerified?: boolean;
}
