
import { useState, useEffect } from "react";
import { mockPosts } from "../data/mock-posts";
import { PostType } from "../types/post-types";

export const usePostsFiltering = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Sort posts by likes to show most popular first in "all" tab
      const sortedPosts = [...mockPosts].sort((a, b) => b.likes - a.likes);
      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLoading(true);

    setTimeout(() => {
      if (value === "all") {
        // Sort by popularity (likes + comments)
        const popularPosts = [...posts].sort((a, b) => 
          (b.likes + b.comments) - (a.likes + a.comments)
        );
        setFilteredPosts(popularPosts);
      } else if (value === "travelers") {
        setFilteredPosts(
          posts.filter(post => post.user.userType === "traveler")
        );
      } else if (value === "organizers") {
        // Sort organizer posts by subscription tier (premium first)
        const sortedOrganizerPosts = posts
          .filter(post => post.user.userType === "organizer")
          .sort((a, b) => {
            const tierOrder = {
              enterprise: 4,
              premium: 3,
              basic: 2,
              free: 1,
              undefined: 0
            };
            const aTier = a.user.subscriptionTier || "undefined";
            const bTier = b.user.subscriptionTier || "undefined";
            
            return tierOrder[bTier] - tierOrder[aTier];
          });
        
        setFilteredPosts(sortedOrganizerPosts);
      }
      setLoading(false);
    }, 500);
  };

  return {
    activeTab,
    loading,
    filteredPosts,
    handleTabChange
  };
};
