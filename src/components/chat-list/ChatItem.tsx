
import { Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface ChatItemType {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  isGroup: boolean;
  members?: string[];
}

interface ChatItemProps {
  chat: ChatItemType;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (chat.isGroup) {
      // Navigate to group chat
      navigate(`/chat/${chat.id}?group=true`);
    } else {
      // Navigate to direct chat
      navigate(`/chat/${chat.id}`);
    }
  };

  return (
    <div 
      onClick={handleChatClick}
      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
    >
      <div className="relative">
        <Avatar className="h-12 w-12 mr-3">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        {chat.isOnline && !chat.isGroup && (
          <span className="absolute bottom-0 right-3 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
        )}
        {chat.isGroup && (
          <div className="absolute bottom-0 right-3 bg-gray-200 dark:bg-gray-700 rounded-full h-5 w-5 flex items-center justify-center">
            <Users size={12} />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 mr-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate rtl">{chat.name}</h3>
          <span className="text-xs text-gray-500">{chat.timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate rtl">
          {chat.lastMessage}
        </p>
      </div>
      
      {chat.unread > 0 && (
        <Badge className="ml-2 bg-morocco-turquoise">{chat.unread}</Badge>
      )}
      
      <ChevronRight size={16} className="ml-2 text-gray-400" />
    </div>
  );
};

export default ChatItem;
