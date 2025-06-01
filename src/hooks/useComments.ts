
import { useState, useEffect } from "react";
import { Comment, ContentType } from "@/types/comment";
import { useToast } from "@/hooks/use-toast";

// Mock data generator for comments
const generateMockComments = (contentId: string): Comment[] => {
  const mockUsers = [
    { id: "user-1", name: "سارة محمد", avatar: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png", isVerified: true },
    { id: "user-2", name: "محمد علي", avatar: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png", isVerified: false },
    { id: "user-3", name: "فاطمة أحمد", avatar: "/lovable-uploads/95be6345-50cf-44ca-9c71-0dee199339e3.png", isVerified: true },
    { id: "current-user", name: "أنت", avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png", isVerified: false },
  ];
  
  const timestamps = ["منذ 5 دقائق", "منذ 10 دقائق", "منذ ساعة", "منذ يومين", "الأسبوع الماضي"];
  
  const baseComments: Comment[] = [
    {
      id: `comment-${contentId}-1`,
      userId: "user-1",
      userName: mockUsers[0].name,
      userAvatar: mockUsers[0].avatar,
      userIsVerified: mockUsers[0].isVerified,
      content: "منشور رائع! استمتعت كثيراً بقراءته.",
      likes: 5,
      timestamp: timestamps[0],
      contentId: contentId,
      contentType: "post" as ContentType,
      replies: [
        {
          id: `reply-${contentId}-1-1`,
          userId: "user-2",
          userName: mockUsers[1].name,
          userAvatar: mockUsers[1].avatar,
          userIsVerified: mockUsers[1].isVerified,
          content: "أوافقك الرأي!",
          likes: 2,
          timestamp: timestamps[1],
          contentId: contentId,
          contentType: "post" as ContentType,
          parentId: `comment-${contentId}-1`
        }
      ]
    },
    {
      id: `comment-${contentId}-2`,
      userId: "user-3",
      userName: mockUsers[2].name,
      userAvatar: mockUsers[2].avatar,
      userIsVerified: mockUsers[2].isVerified,
      content: "شكراً على مشاركة هذه المعلومات المفيدة.",
      likes: 3,
      timestamp: timestamps[2],
      contentId: contentId,
      contentType: "post" as ContentType,
    }
  ];
  
  // Return base comments for contentId to ensure consistency
  return baseComments;
};

export const useComments = (contentId: string, contentType: ContentType, currentUserId: string = "current-user-id") => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  // Load mock comments
  useEffect(() => {
    if (contentId) {
      const loadedComments = generateMockComments(contentId);
      setComments(loadedComments);
    }
  }, [contentId]);
  
  // Add a new comment
  const addComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: `comment-${contentId}-${Date.now()}`,
      userId: currentUserId,
      userName: "أنت",
      userAvatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      userIsVerified: false,
      content: newComment,
      likes: 0,
      timestamp: "الآن",
      contentId: contentId,
      contentType: contentType,
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    
    toast({
      description: "تمت إضافة تعليقك بنجاح.",
      open: true
    });
  };
  
  // Add a reply to a comment
  const addReply = (parentId: string) => {
    if (!replyText.trim()) return;
    
    const newReply: Comment = {
      id: `reply-${contentId}-${parentId}-${Date.now()}`,
      userId: currentUserId,
      userName: "أنت",
      userAvatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
      userIsVerified: false,
      content: replyText,
      likes: 0,
      timestamp: "الآن",
      parentId: parentId,
      contentId: contentId,
      contentType: contentType
    };
    
    // Find the parent comment and add the reply
    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyText("");
    setReplyToId(null);
    
    toast({
      description: "تمت إضافة ردك بنجاح.",
      open: true
    });
  };
  
  // Toggle like on a comment
  const toggleLikeComment = (commentId: string) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  // Delete a comment or reply
  const deleteComment = (commentId: string) => {
    // First check if it's a top-level comment
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    
    // If the length is the same, it might be a reply
    if (updatedComments.length === comments.length) {
      // Check each comment's replies
      const commentsWithUpdatedReplies = comments.map(comment => {
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== commentId)
          };
        }
        return comment;
      });
      
      setComments(commentsWithUpdatedReplies);
    } else {
      setComments(updatedComments);
    }
    
    toast({
      description: "تم حذف التعليق بنجاح.",
      open: true
    });
  };
  
  return {
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
  };
};
