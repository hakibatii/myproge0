
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/components/chat/types";

export const useAudioMessage = (
  addMessage: (message: Message) => void
) => {
  const { toast } = useToast();

  const handleSendAudio = (
    audioBlob: Blob, 
    duration: number, 
    online: boolean,
    canSendMessages: () => boolean = () => true
  ) => {
    if (!online) {
      toast({
        title: "أنت غير متصل بالإنترنت",
        description: "يرجى الاتصال بالإنترنت لإرسال الرسائل الصوتية",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user can send messages
    if (!canSendMessages()) {
      toast({
        title: "لا يمكن إرسال الرسالة الصوتية",
        description: "يجب ترقية حسابك أو متابعة هذا المستخدم لإرسال رسائل",
        variant: "destructive"
      });
      return;
    }
    
    // Create a fake URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: "رسالة صوتية",
      sentByMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAudioMessage: true,
      audioUrl: audioUrl,
      audioDuration: duration
    };
    
    addMessage(newMessage);
    
    // Simulate reply after a delay
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "شكرًا لرسالتك الصوتية! سأرد عليك قريبًا.",
        sentByMe: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      addMessage(reply);
    }, 1500);
  };

  return {
    handleSendAudio
  };
};
