
import { useState, useEffect } from "react";

export const useChatOnlineStatus = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    // Simulate online/offline status
    const onlineInterval = setInterval(() => {
      const isOnline = Math.random() > 0.2; // 80% chance of being online
      setOnline(isOnline);
    }, 30000);
    
    return () => {
      clearInterval(onlineInterval);
    };
  }, []);

  return { online };
};
