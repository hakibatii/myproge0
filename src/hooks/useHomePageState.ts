
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  postQuota: number; 
  postsThisWeek: number;
  following?: string[];
  userType?: 'traveler' | 'organizer';
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
}

export const useHomePageState = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Initialize current user with all required fields
  const [currentUser, setCurrentUser] = useState<User>({
    id: "current-user",
    name: "أحمد المهندي",
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isVerified: false,
    postQuota: 5,
    postsThisWeek: 3,
    following: ["user-1", "user-2"],
    userType: 'traveler'
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setCurrentUser(prev => ({
          ...prev,
          ...parsedUser
        }));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  // Refresh posts functionality
  const handleRefresh = () => {
    // In a real app, this would fetch updated data
    toast({
      title: t("refreshed"),
      description: t("posts_refreshed_successfully"),
    });
  };

  // Handle post creation
  const handlePostCreated = () => {
    toast({
      title: t("posted"),
      description: t("content_posted_successfully"),
    });
  };

  return {
    currentUser,
    handleRefresh,
    handlePostCreated
  };
};
