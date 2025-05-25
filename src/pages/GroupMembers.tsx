
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, UserPlus, User, Users, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChatList } from "@/hooks/useChatList";

// Mock user data
const mockUsers = [
  {
    id: "user-1",
    name: "سارة العامري",
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    isFollowing: true,
    isFollower: true,
    isInGroup: true,
  },
  {
    id: "user-2",
    name: "محمد الحسن",
    avatar: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png",
    isFollowing: true,
    isFollower: false,
    isInGroup: true,
  },
  {
    id: "user-3",
    name: "فاطمة المرزوقي",
    avatar: "/lovable-uploads/fcdeaac3-1e78-4852-8b73-0e03820aff6f.png",
    isFollowing: false,
    isFollower: true,
    isInGroup: true,
  },
  {
    id: "user-4",
    name: "خالد العزاوي",
    avatar: "/lovable-uploads/95be6345-50cf-44ca-9c71-0dee199339e3.png",
    isFollowing: true,
    isFollower: true,
    isInGroup: true,
  },
  {
    id: "user-5",
    name: "نور السعدي",
    avatar: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png",
    isFollowing: true,
    isFollower: true,
    isInGroup: false,
  },
  {
    id: "user-6",
    name: "عمر الراشدي",
    avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
    isFollowing: false,
    isFollower: false,
    isInGroup: false,
  },
];

const GroupMembers = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { handleAddToGroup, handleRemoveFromGroup } = useChatList();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [groupInfo, setGroupInfo] = useState({
    id: groupId || "3",
    name: "مجموعة المسافرين المغاربة",
    avatar: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png",
    memberCount: 4,
    createdAt: "2023-05-15"
  });
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle user in group
  const toggleUserInGroup = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          if (user.isInGroup) {
            // Remove from group
            handleRemoveFromGroup(userId, groupInfo.id);
            return { ...user, isInGroup: false };
          } else {
            // Add to group (only if following or follower)
            if (user.isFollowing || user.isFollower) {
              handleAddToGroup(userId, groupInfo.id);
              return { ...user, isInGroup: true };
            } else {
              toast({
                title: t("cannot_add_to_group"),
                description: t("must_follow_first"),
                variant: "destructive"
              });
              return user;
            }
          }
        }
        return user;
      })
    );
  };
  
  // Follow a user
  const handleFollow = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, isFollowing: true };
        }
        return user;
      })
    );
    
    toast({
      description: t("now_following"),
    });
  };

  return (
    <div className="page-container pb-20">
      <div className="bg-morocco-turquoise text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/chat-list")}
          className="text-white hover:bg-morocco-turquoise/20 mr-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">{t("group_members")}</h1>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={groupInfo.avatar} />
            <AvatarFallback><Users /></AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold rtl">{groupInfo.name}</h2>
            <p className="text-sm text-gray-500 rtl">
              {groupInfo.memberCount} {t("members")}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <Input
            placeholder={t("search_members")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rtl"
          />
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2 rtl">{t("group_members")}</h3>
          
          {filteredUsers.filter(user => user.isInGroup).length === 0 ? (
            <p className="text-center py-4 text-gray-500 rtl">{t("no_members_found")}</p>
          ) : (
            <div className="space-y-2">
              {filteredUsers
                .filter(user => user.isInGroup)
                .map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                      <div className="rtl">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.isFollowing && user.isFollower ? t("mutual_follow") : 
                           user.isFollowing ? t("you_follow") : 
                           user.isFollower ? t("follows_you") : ""}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleUserInGroup(user.id)}
                      className="text-red-500"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t("remove")}
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2 rtl">{t("add_members")}</h3>
          
          {filteredUsers.filter(user => !user.isInGroup).length === 0 ? (
            <p className="text-center py-4 text-gray-500 rtl">{t("no_users_found")}</p>
          ) : (
            <div className="space-y-2">
              {filteredUsers
                .filter(user => !user.isInGroup)
                .map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                      <div className="rtl">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.isFollowing && user.isFollower ? t("mutual_follow") : 
                           user.isFollowing ? t("you_follow") : 
                           user.isFollower ? t("follows_you") : t("not_following")}
                        </p>
                      </div>
                    </div>
                    {user.isFollowing || user.isFollower ? (
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserInGroup(user.id)}
                        className="text-morocco-turquoise"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        {t("add")}
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFollow(user.id)}
                        className="text-blue-500"
                      >
                        <User className="h-4 w-4 mr-1" />
                        {t("follow")}
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
