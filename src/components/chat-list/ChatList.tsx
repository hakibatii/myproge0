
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatItem, { ChatItemType } from "./ChatItem";
import EmptyChatState from "./EmptyChatState";

interface ChatListProps {
  filteredChats: ChatItemType[];
  activeTab: string;
  onFindUsers: () => void;
}

const ChatList = ({ filteredChats, activeTab, onFindUsers }: ChatListProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-2">
        {filteredChats.length === 0 ? (
          <EmptyChatState onFindUsers={onFindUsers} activeTab={activeTab} />
        ) : (
          filteredChats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatList;
