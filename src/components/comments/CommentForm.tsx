
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface CommentFormProps {
  newComment: string;
  setNewComment: (text: string) => void;
  addComment: () => void;
}

const CommentForm = ({ newComment, setNewComment, addComment }: CommentFormProps) => {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png" alt="أنت" />
          <AvatarFallback>أ</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب تعليقاً..."
            className="rtl text-right"
          />
          <Button onClick={addComment} disabled={!newComment.trim()} size="sm" className="mr-2">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
