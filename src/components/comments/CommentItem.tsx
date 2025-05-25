
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { Comment } from "@/types/comment";
import ReplyItem from "./ReplyItem";
import ReplyForm from "./ReplyForm";

interface CommentItemProps {
  comment: Comment;
  currentUserId: string;
  likedComments: Record<string, boolean>;
  toggleLikeComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
  replyToId: string | null;
  setReplyToId: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  addReply: (parentId: string) => void;
}

const CommentItem = ({
  comment,
  currentUserId,
  likedComments,
  toggleLikeComment,
  deleteComment,
  replyToId,
  setReplyToId,
  replyText,
  setReplyText,
  addReply
}: CommentItemProps) => {
  return (
    <div className="p-4">
      <div className="flex mb-2">
        <div className="relative mr-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.userAvatar} alt={comment.userName} />
            <AvatarFallback>{comment.userName[0]}</AvatarFallback>
          </Avatar>
          {comment.userIsVerified && (
            <Badge className="absolute -bottom-1 -right-1 h-4 w-4 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
              <span className="text-[8px] text-white">✓</span>
            </Badge>
          )}
        </div>
        <div className="flex-1 rtl">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-sm">{comment.userName}</h4>
              <p className="text-xs text-gray-500">{comment.timestamp}</p>
            </div>
            {comment.userId === currentUserId && (
              <button 
                onClick={() => deleteComment(comment.id)}
                className="text-red-500 p-1"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          <p className="my-1 text-sm">{comment.content}</p>
          <div className="flex items-center gap-4 mt-1">
            <button 
              onClick={() => toggleLikeComment(comment.id)} 
              className={`flex items-center gap-1 text-xs ${likedComments[comment.id] ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart size={14} className={likedComments[comment.id] ? "fill-current" : ""} />
              <span>{comment.likes + (likedComments[comment.id] ? 1 : 0)}</span>
            </button>
            <button 
              onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
              className="flex items-center gap-1 text-xs text-gray-500"
            >
              <MessageCircle size={14} />
              <span>رد</span>
            </button>
          </div>

          {/* Reply input */}
          {replyToId === comment.id && (
            <ReplyForm
              setReplyText={setReplyText}
              replyText={replyText}
              addReply={() => addReply(comment.id)}
            />
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pr-6 border-r-2 border-gray-100 dark:border-gray-800">
              {comment.replies.map((reply) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  currentUserId={currentUserId}
                  likedComments={likedComments}
                  toggleLikeComment={toggleLikeComment}
                  deleteComment={deleteComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
