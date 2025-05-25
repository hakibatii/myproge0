
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2 } from "lucide-react";
import { Comment } from "@/types/comment";

interface ReplyItemProps {
  reply: Comment;
  currentUserId: string;
  likedComments: Record<string, boolean>;
  toggleLikeComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
}

const ReplyItem = ({
  reply,
  currentUserId,
  likedComments,
  toggleLikeComment,
  deleteComment
}: ReplyItemProps) => {
  return (
    <div className="mb-2">
      <div className="flex">
        <div className="relative mr-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={reply.userAvatar} alt={reply.userName} />
            <AvatarFallback>{reply.userName[0]}</AvatarFallback>
          </Avatar>
          {reply.userIsVerified && (
            <Badge className="absolute -bottom-1 -right-1 h-3 w-3 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
              <span className="text-[6px] text-white">✓</span>
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="font-semibold text-xs">{reply.userName}</h5>
              <p className="text-xs text-gray-500">{reply.timestamp}</p>
            </div>
            {reply.userId === currentUserId && (
              <button 
                onClick={() => deleteComment(reply.id)}
                className="text-red-500 p-1"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <p className="my-1 text-xs">{reply.content}</p>
          <button 
            onClick={() => toggleLikeComment(reply.id)} 
            className={`flex items-center gap-1 text-xs ${likedComments[reply.id] ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart size={12} className={likedComments[reply.id] ? "fill-current" : ""} />
            <span>{reply.likes + (likedComments[reply.id] ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
