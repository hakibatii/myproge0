
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Story } from "@/types/story";
import { getMockStories, getMockFollowing } from "@/constants/storyConstants";

export const useUserStories = (currentUser: { id: string; isVerified: boolean; following?: string[] }) => {
  const { toast } = useToast();
  const [viewingStoryId, setViewingStoryId] = useState<string | null>(null);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [userReactions, setUserReactions] = useState<Record<string, string>>({});
  
  // Mock stories data
  const [stories, setStories] = useState<Story[]>(getMockStories());

  // Combine the current user's real following list with the mock one if needed
  const following = currentUser?.following || getMockFollowing();
  
  // Filter stories to only show from users that the current user follows
  const visibleStories = stories.filter(story => following.includes(story.userId) || story.userId === currentUser.id);

  const handleOpenStory = (storyId: string) => {
    setViewingStoryId(storyId);
    setSelectedReaction(userReactions[storyId] || null);
  };
  
  const handleOpenUserStories = (userId: string) => {
    // Find the first story from this user
    const userStory = stories.find(story => story.userId === userId);
    if (userStory) {
      setViewingStoryId(userStory.id);
      setSelectedReaction(userReactions[userStory.id] || null);
    }
  };
  
  const handleAddStory = () => {
    if (!currentUser?.isVerified) {
      toast({
        title: "تحتاج إلى ترقية",
        description: "يرجى ترقية حسابك لنشر القصص",
        variant: "destructive"
      });
      return false;
    }
    
    // If user is verified, the AddStoryButton will navigate to create-story page
    return true;
  };

  const currentStoryIndex = visibleStories.findIndex(story => story.id === viewingStoryId);
  
  const handleNextStory = () => {
    if (currentStoryIndex < visibleStories.length - 1) {
      const nextStoryId = visibleStories[currentStoryIndex + 1].id;
      setViewingStoryId(nextStoryId);
      setSelectedReaction(userReactions[nextStoryId] || null);
    } else {
      setViewingStoryId(null);
    }
  };
  
  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      const prevStoryId = visibleStories[currentStoryIndex - 1].id;
      setViewingStoryId(prevStoryId);
      setSelectedReaction(userReactions[prevStoryId] || null);
    }
  };

  const handleReaction = (reaction: string) => {
    if (!currentUser?.isVerified) {
      toast({
        title: "تحتاج إلى ترقية",
        description: "يرجى ترقية حسابك للتفاعل مع القصص",
        variant: "destructive"
      });
      return;
    }
    
    if (viewingStoryId) {
      // Check if user has already reacted to this story
      const currentReaction = userReactions[viewingStoryId];
      
      if (currentReaction === reaction) {
        // User is removing their reaction
        const updatedUserReactions = { ...userReactions };
        delete updatedUserReactions[viewingStoryId];
        setUserReactions(updatedUserReactions);
        setSelectedReaction(null);
        
        // Update the story's reactions count
        const updatedStories = stories.map(story => {
          if (story.id === viewingStoryId && story.reactions) {
            const updatedReactions = { ...story.reactions };
            if (updatedReactions[reaction] && updatedReactions[reaction] > 1) {
              updatedReactions[reaction] -= 1;
            } else {
              delete updatedReactions[reaction];
            }
            
            return {
              ...story,
              reactions: updatedReactions
            };
          }
          return story;
        });
        
        setStories(updatedStories);
        
        toast({
          title: "تم إلغاء التفاعل",
          description: "تم إلغاء تفاعلك مع القصة",
        });
      } else {
        // User is changing their reaction or adding a new one
        // First remove the old reaction if exists
        const updatedStories = stories.map(story => {
          if (story.id === viewingStoryId) {
            const updatedReactions = { ...(story.reactions || {}) };
            
            // Remove previous reaction if exists
            if (currentReaction && updatedReactions[currentReaction]) {
              if (updatedReactions[currentReaction] > 1) {
                updatedReactions[currentReaction] -= 1;
              } else {
                delete updatedReactions[currentReaction];
              }
            }
            
            // Add new reaction
            updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;
            
            return {
              ...story,
              reactions: updatedReactions
            };
          }
          return story;
        });
        
        setStories(updatedStories);
        setUserReactions({
          ...userReactions,
          [viewingStoryId]: reaction
        });
        setSelectedReaction(reaction);
        
        toast({
          title: "تفاعل جديد",
          description: "تم إضافة تفاعلك إلى القصة",
        });
      }
    }
  };

  return {
    stories,
    visibleStories,
    viewingStoryId,
    setViewingStoryId,
    selectedReaction,
    currentStoryIndex,
    handleOpenStory,
    handleOpenUserStories,
    handleAddStory,
    handleNextStory,
    handlePrevStory,
    handleReaction,
  };
};
