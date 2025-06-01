
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/components/chat/types";

export const useMessageSend = (
  message: string,
  setMessage: (message: string) => void,
  addMessage: (message: Message) => void
) => {
  const { toast } = useToast();

  const handleSendMessage = (
    e: React.FormEvent, 
    online: boolean,
    canSendMessages: () => boolean = () => true,
    currentUser?: { name: string }
  ) => {
    e.preventDefault();
    
    if (!online) {
      toast({
        title: "أنت غير متصل بالإنترنت",
        description: "يرجى الاتصال بالإنترنت لإرسال الرسائل",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user can send messages
    if (!canSendMessages()) {
      toast({
        title: "لا يمكن إرسال الرسالة",
        description: "يجب ترقية حسابك أو متابعة هذا المستخدم لإرسال رسائل",
        variant: "destructive"
      });
      return;
    }
    
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sentByMe: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      addMessage(newMessage);
      setMessage("");
      
      // Simulate reply after a delay
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: "شكرًا لرسالتك! سأرد عليك قريبًا.",
          sentByMe: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        addMessage(reply);
      }, 1000);
    }
  };

  return {
    handleSendMessage
  };
};
