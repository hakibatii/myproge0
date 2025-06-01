
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, UserCheck, Mail, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  userType?: 'traveler' | 'organizer';
  plan?: 'free' | 'basic' | 'premium';
}

interface CurrentUser {
  id: string;
  isVerified: boolean;
  plan?: 'free' | 'basic' | 'premium';
  following?: string[];
}

interface UserProfileBannerProps {
  user: User;
  onMessage: () => void;
  onFollow: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

const UserProfileBanner = ({ 
  user, 
  onMessage, 
  onFollow, 
  onFollowersClick, 
  onFollowingClick 
}: UserProfileBannerProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: "current-user",
    isVerified: false,
    following: []
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [canMessage, setCanMessage] = useState(false);

  // Load current user from localStorage
  useEffect(() => {
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setCurrentUser(prev => ({
          ...prev,
          ...parsedUser
        }));
        
        // Check if current user is following this profile
        if (parsedUser.following && parsedUser.following.includes(user.id)) {
          setIsFollowing(true);
        }
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, [user.id]);

  // Determine if message button should be shown
  useEffect(() => {
    // Both users are verified
    if (currentUser.isVerified && user.isVerified) {
      setCanMessage(true);
      return;
    }
    
    // Current user is on premium plan
    if (currentUser.plan === "premium") {
      setCanMessage(true);
      return;
    }
    
    // Organizer with basic plan can message other organizers
    if (currentUser.plan === "basic" && user.userType === "organizer") {
      setCanMessage(true);
      return;
    }
    
    // Users follow each other (mutual follow)
    if (isFollowing && currentUser.following?.includes(user.id)) {
      setCanMessage(true);
      return;
    }
    
    setCanMessage(false);
  }, [currentUser, user, isFollowing]);

  const handleFollow = () => {
    // Update UI immediately for better UX
    setIsFollowing(!isFollowing);
    
    // In a real app, call API to follow/unfollow
    // For demo, just update localStorage
    if (!isFollowing) {
      // Follow user
      const newFollowing = [...(currentUser.following || []), user.id];
      localStorage.setItem("currentUser", JSON.stringify({
        ...currentUser,
        following: newFollowing
      }));
      
      toast({
        title: "تمت المتابعة",
        description: `تمت متابعة ${user.name} بنجاح`,
      });
    } else {
      // Unfollow user
      const newFollowing = (currentUser.following || []).filter(id => id !== user.id);
      localStorage.setItem("currentUser", JSON.stringify({
        ...currentUser,
        following: newFollowing
      }));
      
      toast({
        title: "تم إلغاء المتابعة",
        description: `تم إلغاء متابعة ${user.name}`,
      });
    }
    
    // Call the parent component's onFollow callback
    onFollow();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mx-2 -mt-16 z-10 relative">
      <div className="flex items-start">
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {user.isVerified && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 p-1 bg-blue-500 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">
              <Crown size={14} className="text-white" />
            </Badge>
          )}
        </div>
        
        <div className="flex-1 ml-4">
          <h2 className="text-xl font-bold rtl">{user.name}</h2>
          
          <div className="flex mt-2 space-x-4 rtl:space-x-reverse">
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={onFollowersClick}
            >
              <span className="font-semibold">{user.followersCount}</span>
              <span className="text-sm text-gray-500 rtl">متابِعين</span>
            </div>
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={onFollowingClick}
            >
              <span className="font-semibold">{user.followingCount}</span>
              <span className="text-sm text-gray-500 rtl">يتابع</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            variant={isFollowing ? "outline" : "default"} 
            size="sm" 
            onClick={handleFollow}
            className={isFollowing 
              ? "border-gray-300 rtl" 
              : "bg-morocco-turquoise hover:bg-morocco-turquoise/90 rtl"}
          >
            {isFollowing ? (
              <>
                <UserCheck size={16} className="ml-1" />
                <span>متابَع</span>
              </>
            ) : (
              <>
                <UserPlus size={16} className="ml-1" />
                <span>متابعة</span>
              </>
            )}
          </Button>
          
          {canMessage && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onMessage}
              className="rtl border-morocco-sand text-morocco-sand hover:bg-morocco-sand/10"
            >
              <Mail size={16} className="ml-1" />
              <span>رسالة</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileBanner;
