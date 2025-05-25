
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChatItemType } from "@/components/chat-list/ChatItem";

export const useChatList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for chats
  const [chats, setChats] = useState<ChatItemType[]>([
    {
      id: "1",
      name: "سارة العامري",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      lastMessage: "مرحبا، كيف يمكنني مساعدتك؟",
      timestamp: "10:30",
      unread: 2,
      isOnline: true,
      isGroup: false
    },
    {
      id: "2",
      name: "محمد الحسن",
      avatar: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png",
      lastMessage: "شكرا على المعلومات",
      timestamp: "أمس",
      unread: 0,
      isOnline: false,
      isGroup: false
    },
    {
      id: "3",
      name: "مجموعة المسافرين المغاربة",
      avatar: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png",
      lastMessage: "خالد: هل يمكننا تنظيم رحلة أخرى الشهر القادم؟",
      timestamp: "09:15",
      unread: 5,
      isOnline: false,
      isGroup: true,
      members: ["user-1", "user-2", "user-3", "user-4"]
    },
    {
      id: "4",
      name: "مجموعة رحلة مراكش",
      avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
      lastMessage: "أحمد: سأكون جاهزاً في الموعد المحدد",
      timestamp: "الأمس",
      unread: 3,
      isOnline: true,
      isGroup: true,
      members: ["user-1", "user-5", "user-6", "user-7", "user-8"]
    },
  ]);
  
  // Get current user from localStorage
  const [currentUser, setCurrentUser] = useState({
    id: "current-user",
    name: "أحمد المهندي",
    isVerified: false,
    planType: "free",
    following: ["1"],
    accountType: "public"
  });
  
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
  
  const filteredChats = chats.filter(chat => {
    // Filter by search query
    if (searchQuery && !chat.name.includes(searchQuery)) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === "groups" && !chat.isGroup) {
      return false;
    }
    if (activeTab === "direct" && chat.isGroup) {
      return false;
    }
    if (activeTab === "unread" && chat.unread === 0) {
      return false;
    }
    
    return true;
  });
  
  const handleCreateGroup = () => {
    // In a real app, navigate to group creation page
    toast({
      title: "إنشاء مجموعة",
      description: "تم فتح صفحة إنشاء مجموعة جديدة",
    });
    
    // For demo, show the first group
    navigate("/group-members/3");
  };
  
  const handleFindUsers = () => {
    // In a real app, navigate to user search page
    toast({
      title: "البحث عن مستخدمين",
      description: "تم فتح صفحة البحث عن مستخدمين",
    });
    
    // For demo, navigate to followers page
    navigate("/followers");
  };

  // Function to add a user to a group
  const handleAddToGroup = (userId: string, groupId: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === groupId) {
          // Add user to members if not already in group
          const updatedMembers = chat.members ? 
            [...chat.members, userId] : 
            [userId];
            
          return {
            ...chat,
            members: [...new Set(updatedMembers)] // Remove duplicates
          };
        }
        return chat;
      });
    });
    
    toast({
      title: "تمت إضافة المستخدم",
      description: "تمت إضافة المستخدم إلى المجموعة بنجاح",
    });
  };
  
  // Function to remove a user from a group
  const handleRemoveFromGroup = (userId: string, groupId: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === groupId && chat.members) {
          return {
            ...chat,
            members: chat.members.filter(id => id !== userId)
          };
        }
        return chat;
      });
    });
    
    toast({
      title: "تمت إزالة المستخدم",
      description: "تمت إزالة المستخدم من المجموعة بنجاح",
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredChats,
    handleCreateGroup,
    handleFindUsers,
    handleAddToGroup,
    handleRemoveFromGroup,
    currentUser
  };
};
