
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ReplyFormProps {
  replyText: string;
  setReplyText: (text: string) => void;
  addReply: () => void;
}

const ReplyForm = ({ replyText, setReplyText, addReply }: ReplyFormProps) => {
  return (
    <div className="flex mt-2">
      <Avatar className="h-6 w-6 mr-1">
        <AvatarImage src="/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png" alt="أنت" />
        <AvatarFallback>أ</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex">
        <Input
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="اكتب رداً..."
          className="rtl text-right text-sm p-2 h-8"
          size={30}
        />
        <Button 
          onClick={addReply} 
          disabled={!replyText.trim()} 
          size="sm" 
          variant="ghost" 
          className="h-8 px-2"
        >
          <Send size={14} />
        </Button>
      </div>
    </div>
  );
};

export default ReplyForm;
