
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, UserMinus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const BlockedUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Mock data - in a real app, fetch from API
  const [blockedUsers, setBlockedUsers] = useState([
    { id: '1', name: 'أحمد محمود', avatar: '/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png' },
    { id: '2', name: 'فاطمة السيد', avatar: '/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png' },
    { id: '3', name: 'محمد عبدالله', avatar: '/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png' },
  ]);

  const handleUnblock = (userId: string) => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
    
    toast({
      title: t("unblock"),
      description: t("user_unblocked_successfully"),
    });
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20 hide-scrollbar touch-scroll">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("blocked_users")}</h1>
      </div>

      <div className="p-4">
        {blockedUsers.length > 0 ? (
          <div className="space-y-4">
            {blockedUsers.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium rtl">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleUnblock(user.id)} 
                  className="text-red-500 hover:text-red-700 hover:bg-red-100/20"
                >
                  <UserMinus size={20} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500 dark:text-gray-400 rtl">{t("no_blocked_users")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockedUsers;
