
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import EmptyComments from "./EmptyComments";

interface CommentsListProps {
  comments: Comment[];
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

const CommentsList = ({
  comments,
  currentUserId,
  likedComments,
  toggleLikeComment,
  deleteComment,
  replyToId,
  setReplyToId,
  replyText,
  setReplyText,
  addReply
}: CommentsListProps) => {
  if (comments.length === 0) {
    return <EmptyComments />;
  }

  return (
    <div className="divide-y">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          likedComments={likedComments}
          toggleLikeComment={toggleLikeComment}
          deleteComment={deleteComment}
          replyToId={replyToId}
          setReplyToId={setReplyToId}
          replyText={replyText}
          setReplyText={setReplyText}
          addReply={addReply}
        />
      ))}
    </div>
  );
};

export default CommentsList;
