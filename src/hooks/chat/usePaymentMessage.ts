
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/components/chat/types";

export const usePaymentMessage = (
  addMessage: (message: Message) => void
) => {
  const { toast } = useToast();

  const handleSelectPaymentOption = (
    option: string, 
    canSendMessages: () => boolean = () => true
  ) => {
    // Check if user can send messages
    if (!canSendMessages()) {
      toast({
        title: "لا يمكن إرسال خيار الدفع",
        description: "يجب ترقية حسابك أو متابعة هذا المستخدم لإرسال رسائل",
        variant: "destructive"
      });
      return;
    }
    
    let messageText = "";
    
    // Check if this is a price from organizer
    if (option.includes('|')) {
      const [paymentType, price] = option.split('|');
      messageText = `سعر الرحلة: ${price} DH`;
    } else if (option === "cash") {
      messageText = "أفضل الدفع عند اللقاء";
    } else if (option === "card") {
      messageText = "أفضل الدفع ببطاقة بنكية (غير متاح حاليًا)";
    }
    
    // Add payment option message to chat
    const paymentMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sentByMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPaymentOption: true
    };
    
    addMessage(paymentMessage);
    
    // Show toast based on selected option
    if (option === "card") {
      toast({
        title: "خيار الدفع ببطاقة غير متاح حاليًا",
        description: "سيتم تفعيل هذه الخاصية قريبًا",
      });
    } else if (option === "cash") {
      toast({
        title: "تم إرسال خيار الدفع",
        description: "يمكنك الآن التواصل مع منظم الرحلة لإتمام الحجز",
      });
    } else if (option.includes('|')) {
      toast({
        title: "تم إرسال سعر الرحلة",
        description: "يمكن للمسافر الآن اختيار طريقة الدفع",
      });
    }
    
    // Add organizer response
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "شكرًا لاختيارك طريقة الدفع، سنتواصل معك لإتمام التفاصيل.",
        sentByMe: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      addMessage(reply);
    }, 1000);
    
    return option;
  };

  return {
    handleSelectPaymentOption
  };
};
