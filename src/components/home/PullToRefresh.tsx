
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface PullToRefreshProps {
  onRefresh: () => void;
}

const PullToRefresh = ({ onRefresh }: PullToRefreshProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (document.documentElement.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
      } else {
        startY.current = null;
      }
      setPullDistance(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current !== null) {
        const currentY = e.touches[0].clientY;
        const distance = currentY - startY.current;
        
        if (distance > 0) {
          // Resistance factor to make the pull harder as it goes further
          const newPullDistance = Math.min(distance * 0.5, 100);
          setPullDistance(newPullDistance);
          
          if (newPullDistance >= 80 && !refreshing) {
            setRefreshing(true);
          }
        }
      }
    };

    const handleTouchEnd = () => {
      startY.current = null;
      
      if (refreshing) {
        // Handle refresh
        refreshPosts();
      }
      
      setPullDistance(0);
    };

    const refreshPosts = () => {
      // Simulate refreshing posts from server
      setTimeout(() => {
        setRefreshing(false);
        onRefresh();
        
        toast({
          title: t("refreshed"),
          description: t("posts_refreshed_successfully"),
        });
      }, 1000);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [refreshing, toast, t, onRefresh]);

  if (pullDistance <= 0) return null;

  return (
    <div 
      className="absolute top-0 left-0 right-0 flex items-center justify-center z-50 py-2"
      style={{ transform: `translateY(${pullDistance}px)` }}
    >
      <div className="flex flex-col items-center">
        <svg 
          className={`animate-spin h-6 w-6 text-gray-500 ${refreshing ? 'opacity-100' : 'opacity-70'}`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <span className="text-xs mt-1">{refreshing ? t("refreshing") : t("pull_to_refresh")}</span>
      </div>
    </div>
  );
};

export default PullToRefresh;
