
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ContentType } from "@/types/comment";

interface CommentButtonProps {
  contentId: string;
  contentType: ContentType;
  commentsCount: number;
  title?: string;
  contentPreview?: string;
  contentImage?: string;
  userName?: string;
  userAvatar?: string;
  userIsVerified?: boolean;
  className?: string;
}

const CommentButton = ({
  contentId,
  contentType,
  commentsCount,
  title,
  contentPreview,
  contentImage,
  userName,
  userAvatar,
  userIsVerified,
  className
}: CommentButtonProps) => {
  const navigate = useNavigate();

  const handleOpenComments = () => {
    navigate("/comments", {
      state: {
        contentId,
        contentType,
        title,
        contentPreview,
        contentImage,
        userName,
        userAvatar,
        userIsVerified
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleOpenComments}
      className={`flex items-center gap-1 text-gray-500 ${className || ""}`}
    >
      <MessageCircle size={18} />
      <span className="rtl">{commentsCount}</span>
    </Button>
  );
};

export default CommentButton;
