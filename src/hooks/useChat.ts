
import { useState } from "react";
import { Message } from "@/components/chat/types";
import { useChatUser } from "./chat/useChatUser";
import { useChatOnlineStatus } from "./chat/useChatOnlineStatus";
import { useTripSuccess } from "./chat/useTripSuccess";
import { useMessages } from "./chat/useMessages";

export const useChat = (username: string | undefined) => {
  const { online } = useChatOnlineStatus();
  const { chatUser, userPoints, messages: initialMessages, currentUser } = useChatUser(username);
  const { showTripSuccessDialog, setShowTripSuccessDialog, handleTripSuccess } = useTripSuccess();
  
  // Use our refactored useMessages hook
  const { 
    message, 
    setMessage, 
    messages, 
    addMessage, 
    handleSendMessage: sendMessage,
    handleSendAudio: sendAudio,
    handleSelectPaymentOption: selectPaymentOption,
    showEmojiPicker,
    setShowEmojiPicker,
    handleEmojiSelect
  } = useMessages();
  
  // Initialize messages when initialMessages changes
  useState(() => {
    if (initialMessages.length > 0) {
      // Initialize messages with the ones from useChatUser
      addMessage(initialMessages);
    }
  });
  
  // Wrapper functions to pass through to the appropriate hook functions
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(e, online);
  };
  
  const handleSendAudio = (audioBlob: Blob, duration: number) => {
    sendAudio(audioBlob, duration, online);
  };
  
  const handleSelectPaymentOption = (option: string) => {
    selectPaymentOption(option, true);
    
    // Show trip success dialog after payment option is selected
    setTimeout(() => {
      setShowTripSuccessDialog(true);
    }, 1000);
  };

  return {
    online,
    message,
    setMessage,
    messages,
    chatUser,
    userPoints,
    currentUser,
    showTripSuccessDialog,
    setShowTripSuccessDialog,
    handleSendMessage,
    handleSendAudio,
    handleSelectPaymentOption,
    handleTripSuccess,
    showEmojiPicker,
    setShowEmojiPicker,
    handleEmojiSelect
  };
};
