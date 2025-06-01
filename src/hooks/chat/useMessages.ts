
import { useMessageCore } from "./useMessageCore";
import { useMessageSend } from "./useMessageSend";
import { useAudioMessage } from "./useAudioMessage";
import { usePaymentMessage } from "./usePaymentMessage";
import { useState } from "react";

export const useMessages = () => {
  const {
    message,
    setMessage,
    messages,
    initializeMessages,
    addMessage
  } = useMessageCore();
  
  const { handleSendMessage } = useMessageSend(message, setMessage, addMessage);
  const { handleSendAudio } = useAudioMessage(addMessage);
  const { handleSelectPaymentOption } = usePaymentMessage(addMessage);
  
  // New state for emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const canSendMessages = () => {
    // In a real app, check user permissions, account status, etc.
    return true;
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return {
    message,
    setMessage,
    messages,
    initializeMessages,
    addMessage,
    handleSendMessage: (e: React.FormEvent) => handleSendMessage(e, true, canSendMessages),
    handleSendAudio: (audioBlob: Blob, duration: number) => 
      handleSendAudio(audioBlob, duration, true, canSendMessages),
    handleSelectPaymentOption: (option: string) => 
      handleSelectPaymentOption(option, canSendMessages),
    showEmojiPicker,
    setShowEmojiPicker,
    handleEmojiSelect
  };
};
