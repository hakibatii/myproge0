const [showPaymentOptions, setShowPaymentOptions] = React.useState(false);
import { useParams } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import TripSuccessDialog from "@/components/chat/TripSuccessDialog";
import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/contexts/LanguageContext";

const Chat = () => {const [showPaymentOptions, setShowPaymentOptions] = React.useState(false);
  const { username } = useParams<{ username: string }>();
  const { t } = useLanguage();
  const { 
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
  } = useChat(username);

  return (
    <div className="page-container flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <ChatHeader 
        chatUser={{
          username: chatUser?.name || "",
          avatar: chatUser?.avatar || "",
          isOnline: online,
          isTyping: false,
          lastSeen: "2 hours ago",
          isVerified: chatUser?.isVerified
        }} 
        userPoints={userPoints} 
        translations={{
          online: t("online"),
          typing: t("typing"),
          offline: t("offline_status"),
          lastSeen: t("last_seen")
        }}
      />
      <ChatMessageList messages={messages} chatUser={chatUser} />
      <ChatInput 
        online={online}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleSendAudio={handleSendAudio}
        handleSelectPaymentOption={handleSelectPaymentOption}
        translations={{
          typeMessage: t("type_a_message"),
          send: t("send")
        }}
        currentUser={{ userType: currentUser?.id ? "traveler" : "organizer" }}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        handleEmojiSelect={handleEmojiSelect}
      />
      
      <TripSuccessDialog 
        open={showTripSuccessDialog} 
        onOpenChange={setShowTripSuccessDialog}
        onConfirm={handleTripSuccess}
      />
    </div>
  );
};

export default Chat;
