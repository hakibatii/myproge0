
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  avatar: string;
  isFollowing?: boolean;
  isVerified?: boolean;
  city?: string;
}

const Followers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("followers");
  
  // Mock data - in a real app these would come from an API
  const [followers, setFollowers] = useState<User[]>([
    {
      id: "user-1",
      name: "سارة العامري",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      isFollowing: true,
      isVerified: true,
      city: "مراكش"
    },
    {
      id: "user-2",
      name: "محمد الحسن",
      avatar: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png",
      isFollowing: false,
      city: "الدار البيضاء"
    },
    {
      id: "user-3",
      name: "فاطمة السيد",
      avatar: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png",
      isFollowing: true,
      isVerified: true,
      city: "فاس"
    }
  ]);
  
  const [following, setFollowing] = useState<User[]>([
    {
      id: "user-1",
      name: "سارة العامري",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      isVerified: true,
      city: "مراكش"
    },
    {
      id: "user-4",
      name: "أحمد الشرقاوي",
      avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
      isVerified: false,
      city: "الرباط"
    }
  ]);
  
  const handleFollow = (userId: string) => {
    setFollowers(followers.map(user => {
      if (user.id === userId) {
        return { ...user, isFollowing: !user.isFollowing };
      }
      return user;
    }));
    
    toast({
      title: "تم تحديث المتابعة",
      description: "تم تحديث حالة المتابعة بنجاح"
    });
  };
  
  const handleUnfollow = (userId: string) => {
    setFollowing(following.filter(user => user.id !== userId));
    
    toast({
      title: "تم إلغاء المتابعة",
      description: "تم إلغاء متابعة المستخدم بنجاح"
    });
  };
  
  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">المتابعات</h1>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="followers" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="followers" className="rtl">المتابِعون</TabsTrigger>
            <TabsTrigger value="following" className="rtl">المتابَعون</TabsTrigger>
          </TabsList>
          
          <TabsContent value="followers">
            {followers.length > 0 ? (
              <div className="space-y-4">
                {followers.map(user => (
                  <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center" onClick={() => handleProfileClick(user.name)}>
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium rtl">{user.name}</p>
                          {user.isVerified && (
                            <span className="ml-1 bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </span>
                          )}
                        </div>
                        {user.city && <p className="text-xs text-gray-500 rtl">{user.city}</p>}
                      </div>
                    </div>
                    
                    <Button
                      variant={user.isFollowing ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleFollow(user.id)}
                      className={user.isFollowing ? "rtl border-morocco-turquoise text-morocco-turquoise" : "rtl bg-morocco-turquoise text-white"}
                    >
                      {user.isFollowing ? "إلغاء المتابعة" : "متابعة"}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 rtl">لا يوجد متابعين حتى الآن</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="following">
            {following.length > 0 ? (
              <div className="space-y-4">
                {following.map(user => (
                  <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center" onClick={() => handleProfileClick(user.name)}>
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium rtl">{user.name}</p>
                          {user.isVerified && (
                            <span className="ml-1 bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </span>
                          )}
                        </div>
                        {user.city && <p className="text-xs text-gray-500 rtl">{user.city}</p>}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnfollow(user.id)}
                      className="rtl border-morocco-turquoise text-morocco-turquoise"
                    >
                      إلغاء المتابعة
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 rtl">لا تتابع أي شخص حتى الآن</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Followers;
