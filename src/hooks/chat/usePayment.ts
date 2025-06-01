
import { useToast } from "@/hooks/use-toast";
import { Message, PaymentSelection } from "@/components/chat/types";

export const usePayment = (
  addMessage: (message: Message) => void
) => {
  const { toast } = useToast();

  const handleSelectPaymentOption = (option: 'cash' | 'card') => {
    const paymentSelection: PaymentSelection = {
      option,
      timestamp: new Date().toISOString(),
      tripId: "trip-" + Date.now()
    };
    
    // In a real app, save this to the database
    console.log("Payment selection:", paymentSelection);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: option === 'cash' ? 'اخترت الدفع نقدًا' : 'اخترت الدفع بالبطاقة',
      sentByMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    addMessage(newMessage);
    
    // Show toast
    toast({
      title: option === 'cash' ? 'تم اختيار الدفع النقدي' : 'تم اختيار الدفع بالبطاقة',
      description: 'سيتم التواصل معك قريبًا لإتمام عملية الدفع',
    });
    
    // Simulate response from the guide
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: option === 'cash' 
          ? 'شكرًا لاختيارك الدفع النقدي. سأتواصل معك لتحديد مكان ووقت الالتقاء.' 
          : 'شكرًا لاختيارك الدفع بالبطاقة. سأرسل لك رابط الدفع الآمن قريبًا.',
        sentByMe: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      addMessage(reply);
    }, 1500);
  };

  return {
    handleSelectPaymentOption
  };
};
