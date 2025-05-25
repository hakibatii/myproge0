
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, UserCheck, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Following {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  city?: string;
}

const Following = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [following, setFollowing] = useState<Following[]>([
    {
      id: "1",
      name: "أحمد المهندي",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      isVerified: true,
      city: "مراكش"
    },
    {
      id: "2",
      name: "فاطمة الزهراء",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      isVerified: false,
      city: "الرباط"
    },
    {
      id: "3",
      name: "عمر محمد",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      isVerified: true,
      city: "طنجة"
    },
    {
      id: "4",
      name: "نور الهدى",
      avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      isVerified: false,
      city: "أكادير"
    }
  ]);

  const filteredFollowing = following.filter(user => 
    user.name.includes(searchQuery) || 
    (user.city && user.city.includes(searchQuery))
  );
  
  const handleUnfollow = (id: string, name: string) => {
    setFollowing(following.filter(user => user.id !== id));
    
    toast({
      title: t("unfollow"),
      description: `${t("unfollow")} ${name}`
    });
  };
  
  const handleViewProfile = (id: string, name: string) => {
    navigate(`/profile/${name}`);
  };

  return (
    <div className="page-container">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("people_you_follow")}</h1>
      </div>
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          <Input
            placeholder={`${t("search_placeholder")}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rtl text-right"
          />
        </div>
        
        <div className="space-y-3">
          {filteredFollowing.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="rtl">{t("no_search_results")}</p>
            </div>
          ) : (
            filteredFollowing.map(user => (
              <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <div 
                  className="flex items-center flex-1 cursor-pointer" 
                  onClick={() => handleViewProfile(user.id, user.name)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.isVerified && (
                      <Badge className="absolute -top-1 -left-1 h-5 w-5 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
                        <span className="text-[8px] text-white">✓</span>
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mr-2">
                    <p className="font-medium rtl">{user.name}</p>
                    {user.city && (
                      <p className="text-xs text-gray-500 rtl">{user.city}</p>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  onClick={() => handleUnfollow(user.id, user.name)}
                >
                  <UserCheck size={16} className="mr-1" />
                  <span className="rtl">{t("unfollow")}</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Following;
