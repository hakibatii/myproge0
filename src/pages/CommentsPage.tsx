
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useComments } from "@/hooks/useComments";
import { ContentType, CommentsPageParams } from "@/types/comment";
import CommentsList from "@/components/comments/CommentsList";
import CommentsHeader from "@/components/comments/CommentsHeader";
import ContentPreview from "@/components/comments/ContentPreview";
import CommentForm from "@/components/comments/CommentForm";

const CommentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contentId, contentType } = useParams();
  
  // Use location state or default values
  const params = location.state as CommentsPageParams || {
    contentId: contentId || "",
    contentType: (contentType as ContentType) || "post",
    title: "",
  };
  
  // Ensure contentType is a valid ContentType
  const validContentType: ContentType = (params.contentType === "post" || params.contentType === "trip") 
    ? params.contentType 
    : "post";
  
  const { 
    comments,
    newComment,
    setNewComment,
    addComment,
    replyToId,
    setReplyToId,
    replyText,
    setReplyText,
    addReply,
    likedComments,
    toggleLikeComment,
    deleteComment
  } = useComments(params.contentId || "", validContentType, "current-user-id");

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-gray-900 pb-20">
      <CommentsHeader 
        title={params.title || "التعليقات"} 
        onBack={handleBack}
      />
      
      <ContentPreview params={params} />

      <div className="divide-y">
        <CommentsList
          comments={comments}
          currentUserId="current-user-id" // This should come from authentication context
          likedComments={likedComments}
          toggleLikeComment={toggleLikeComment}
          deleteComment={deleteComment}
          replyToId={replyToId}
          setReplyToId={setReplyToId}
          replyText={replyText}
          setReplyText={setReplyText}
          addReply={addReply}
        />
      </div>
      
      {/* Comment Form */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <CommentForm 
          newComment={newComment}
          setNewComment={setNewComment}
          addComment={addComment}
        />
      </div>
    </div>
  );
};

export default CommentsPage;
