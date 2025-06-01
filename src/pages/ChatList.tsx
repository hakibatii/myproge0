
import { useChatList } from "@/hooks/useChatList";
import ChatHeader from "@/components/chat-list/ChatHeader";
import ChatSearchBar from "@/components/chat-list/ChatSearchBar";
import ChatFilterTabs from "@/components/chat-list/ChatFilterTabs";
import ChatListComponent from "@/components/chat-list/ChatList";

const ChatList = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredChats,
    handleCreateGroup,
    handleFindUsers
  } = useChatList();

  return (
    <div className="page-container pb-20">
      <ChatHeader 
        onFindUsers={handleFindUsers} 
        onCreateGroup={handleCreateGroup} 
      />
      
      <div className="p-4">
        <ChatSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <ChatFilterTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <ChatListComponent 
          filteredChats={filteredChats} 
          activeTab={activeTab}
          onFindUsers={handleFindUsers}
        />
      </div>
    </div>
  );
};

export default ChatList;
