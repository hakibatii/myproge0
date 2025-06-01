
export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isVerified: boolean;
  image: string;
  createdAt: string;
  reactions?: {
    [key: string]: number;
  };
}

export interface UserStoriesProps {
  currentUser?: {
    id: string;
    isVerified: boolean;
    following?: string[]; // Array of user IDs that the current user follows
  };
}

export interface ReactionType {
  emoji: string;
  name: string;
  icon: React.ComponentType<any>;
}
