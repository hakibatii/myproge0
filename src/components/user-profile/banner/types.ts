
import { User } from "../types";

export interface BackgroundStyleProps {
  backgroundStyle: React.CSSProperties;
}

export interface UserProfileBannerProps {
  user: User;
  onMessage: () => void;
  onFollow: () => void;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
}
