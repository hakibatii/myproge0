import { useState, useEffect } from "react";
import { ChatUser } from "@/components/chat/types";
import { getUserBadgeByTrips } from "@/components/user-profile/UserBadge";

export const useChatUsers = (username?: string) => {
  const [currentUser, setCurrentUser] = useState({
    id: "current-user",
    name: "أحمد المهندي",
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isVerified: false,
    userType: "traveler" as "traveler" | "organizer",
    plan: "free" as "free" | "basic" | "premium",
    following: ["1"]
  });
  
  const [chatUser, setChatUser] = useState<ChatUser>({
    id: "1",
    name: username || "سارة العامري",
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isVerified: true,
    status: "متصل",
    userType: "organizer",
    plan: "premium",
    badge: getUserBadgeByTrips(12).type, // Fixed: Using the type property of the badge
  });
  
  const [userPoints, setUserPoints] = useState(0);

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
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
    
    // Load user points from localStorage
    const savedPoints = localStorage.getItem('userPoints');
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints));
    }
  }, []);

  // Update chat user with points
  useEffect(() => {
    setChatUser(prev => ({
      ...prev,
      points: userPoints
    }));
  }, [userPoints]);

  // Check messaging permissions based on plan and follow status
  const canSendMessages = () => {
    // Both users are verified
    if (currentUser.isVerified && chatUser.isVerified) {
      return true;
    }
    
    // Current user is on premium plan
    if (currentUser.plan === "premium") {
      return true;
    }
    
    // Organizer with basic plan can message other organizers
    if (currentUser.plan === "basic" && 
        currentUser.userType === "organizer" && 
        chatUser.userType === "organizer") {
      return true;
    }
    
    // Users follow each other (mutual follow)
    if (currentUser.following?.includes(chatUser.id)) {
      return true;
    }
    
    return false;
  };

  return {
    currentUser,
    chatUser,
    userPoints,
    setUserPoints,
    canSendMessages
  };
};
