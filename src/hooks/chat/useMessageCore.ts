
import { useState } from "react";
import { Message } from "@/components/chat/types";

export const useMessageCore = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const initializeMessages = (initialMessages: Message[]) => {
    setMessages(initialMessages);
  };

  const addMessage = (newMessage: Message) => {
    setMessages(prev => [...prev, newMessage]);
  };

  return {
    message,
    setMessage,
    messages,
    initializeMessages,
    addMessage
  };
};
