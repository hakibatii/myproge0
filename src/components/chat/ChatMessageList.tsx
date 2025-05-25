
import ChatMessage from "./ChatMessage";
import { Message, ChatUser } from "./types";

interface ChatMessageListProps {
  messages: Message[];
  chatUser: Pick<ChatUser, 'name' | 'avatar'>;
}

const ChatMessageList = ({ messages, chatUser }: ChatMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            chatUser={chatUser} 
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMessageList;
