
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreHorizontal, Video, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatUser {
  username: string;
  avatar: string;
  isOnline: boolean;
  isTyping: boolean;
  lastSeen?: string;
  isVerified?: boolean;
}

interface TranslationProps {
  online: string;
  typing: string;
  offline: string;
  lastSeen: string;
}

interface ChatHeaderProps {
  chatUser: ChatUser;
  userPoints?: number;
  translations?: TranslationProps;
}

const ChatHeader = ({ chatUser, userPoints, translations }: ChatHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Use default translations if not provided
  const tx = translations || {
    online: "Online",
    typing: "typing...",
    offline: "Offline", 
    lastSeen: "Last seen"
  };

  const handleGoBack = () => {
    navigate("/chat-list");
  };

  const handleVoiceCall = () => {
    toast({
      description: t("voice_call") + " " + chatUser.username,
    });
  };

  const handleVideoCall = () => {
    toast({
      description: t("call") + " " + chatUser.username,
    });
  };

  return (
    <div className="bg-white dark:bg-morocco-navy/80 shadow-sm border-b border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={handleGoBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center" onClick={() => navigate(`/profile/${chatUser.username}`)}>
          <div className="relative">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={chatUser.avatar} />
              <AvatarFallback>{chatUser.username[0]}</AvatarFallback>
            </Avatar>
            {chatUser.isOnline && (
              <Badge className="absolute -bottom-1 -right-1 h-3 w-3 p-0 bg-green-500 border-white border-2 rounded-full" />
            )}
            {chatUser.isVerified && (
              <Badge className="absolute top-0 right-0 h-4 w-4 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
                <span className="text-[8px] text-white">✓</span>
              </Badge>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold rtl">{chatUser.username}</h3>
            <p className="text-xs text-gray-500 rtl">
              {chatUser.isTyping ? tx.typing : 
                chatUser.isOnline ? tx.online : 
                chatUser.lastSeen ? `${tx.lastSeen} ${chatUser.lastSeen}` : 
                tx.offline}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        {userPoints && (
          <div className="mr-4 bg-morocco-gold/10 text-morocco-gold px-2 py-1 rounded-full flex items-center">
            <span className="text-xs font-medium">{userPoints} ⭐</span>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full" 
          onClick={handleVoiceCall}
        >
          <Phone className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full" 
          onClick={handleVideoCall}
        >
          <Video className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="rtl cursor-pointer">
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem className="rtl cursor-pointer">
              بحث في المحادثة
            </DropdownMenuItem>
            <DropdownMenuItem className="rtl cursor-pointer">
              حذف المحادثة
            </DropdownMenuItem>
            <DropdownMenuItem className="rtl cursor-pointer text-red-500">
              حظر المستخدم
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
