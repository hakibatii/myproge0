
import { useState, useEffect } from "react";
import { ChatUser, Message } from "@/components/chat/types";
import { useToast } from "@/hooks/use-toast";

export const useChatUser = (username: string | undefined) => {
  const { toast } = useToast();
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    isVerified: boolean;
  }>({
    id: "currentUserId",
    isVerified: true,
  });

  useEffect(() => {
    // Simulate fetching chat user data
    const fetchChatUser = () => {
      // In a real app, this would be fetched from an API
      if (username) {
        const user: ChatUser = {
          id: "123",
          name: username,
          avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
          isVerified: true,
        };
        setChatUser(user);
        
        // Load messages
        const initialMessages: Message[] = [
          {
            id: "1",
            text: `مرحبًا! أنا ${username}، مرشد سياحي. كيف يمكنني مساعدتك؟`,
            sentByMe: false,
            timestamp: "10:30",
          },
          {
            id: "2",
            text: "مرحبًا! أود الاستفسار عن رحلة إلى الصحراء",
            sentByMe: true,
            timestamp: "10:31",
          },
          {
            id: "3",
            text: "بالتأكيد! لدينا رحلة لمدة 3 أيام إلى مرزوقة بسعر 1200 درهم للشخص.",
            sentByMe: false,
            timestamp: "10:33",
          }
        ];
        setMessages(initialMessages);
      }
      
      // Simulate loading user points
      setUserPoints(150);
    };

    fetchChatUser();
  }, [username]);

  return {
    chatUser,
    userPoints,
    messages,
    currentUser
  };
};
