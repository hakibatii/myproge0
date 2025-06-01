
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAccountData = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  
  const [user, setUser] = useState({
    id: "user-1",
    name: "أحمد المهندي",
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    email: "ahmed@example.com",
    tripCount: 7,
    points: 350,
    city: "مراكش",
    isVerified: true,
    background: "",
    description: "مرشد سياحي متخصص في المناطق الجبلية والصحراوية في المغرب. أتحدث العربية والإنجليزية والفرنسية بطلاقة."
  });

  // Load user data from localStorage
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    
    const userJson = localStorage.getItem("currentUser");
    if (userJson) {
      try {
        const storedUser = JSON.parse(userJson);
        setUser(prev => ({
          ...prev,
          ...storedUser,
          // Ensure background and description properties exist
          background: storedUser.background || "",
          description: storedUser.description || prev.description
        }));
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("currentUser");
    }
    toast({
      title: "تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح",
    });
    return "/login";
  };
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (typeof document !== 'undefined') {
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
      }
      
      toast({
        title: newMode ? "تم تفعيل الوضع المظلم" : "تم تفعيل الوضع الفاتح",
        description: newMode ? "تم تغيير المظهر إلى الوضع المظلم" : "تم تغيير المظهر إلى الوضع الفاتح",
      });
    }
  };

  return {
    user,
    isDarkMode,
    handleLogout,
    toggleDarkMode,
  };
};
