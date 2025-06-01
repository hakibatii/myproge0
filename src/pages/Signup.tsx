
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Import refactored components
import SignupHeader from "@/components/auth/SignupHeader";
import SignupTabs from "@/components/auth/SignupTabs";
import SocialSection from "@/components/auth/SocialSection";
import LoginLink from "@/components/auth/LoginLink";
import OfflineNotice from "@/components/auth/OfflineNotice";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  
  // Check for network connectivity
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const handleEmailSignup = (name: string, email: string, password: string) => {
    if (!isOnline) {
      toast({
        title: t("error_network") || "خطأ في الاتصال",
        description: t("offline") || "يرجى التحقق من اتصالك بالإنترنت",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      // In a real app, this would send a verification code to the user's email
      toast({
        title: t("verification_code_sent") || "تم إرسال رمز التحقق",
        description: `${t("check_email") || "تحقق من بريدك الإلكتروني:"} ${email}`,
      });
      
      // Navigate to verification page
      navigate("/verify-email", { state: { email } });
      setIsLoading(false);
    }, 1500);
  };

  const handlePhoneSignup = (name: string, phone: string, password: string) => {
    if (!isOnline) {
      toast({
        title: t("error_network") || "خطأ في الاتصال",
        description: t("offline") || "يرجى التحقق من اتصالك بالإنترنت",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      // In a real app, this would send a verification code via SMS
      // Store phone in session storage to be accessed by verification page
      sessionStorage.setItem("verifyPhone", phone);
      
      toast({
        title: t("verification_code_sent") || "تم إرسال رمز التحقق",
        description: `${t("code_sent_to") || "تم إرسال رمز التحقق إلى"} ${phone}`,
      });
      
      // Navigate to verification page
      navigate("/verify-phone", { state: { phone } });
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLoginSuccess = (userData: { name: string; email: string; provider: string; providerId: string }) => {
    // في تطبيق حقيقي، سنقوم بإرسال هذه البيانات إلى الخلفية للتحقق وإنشاء حساب
    localStorage.setItem("currentUser", JSON.stringify({
      name: userData.name,
      email: userData.email,
      provider: userData.provider,
      id: userData.providerId
    }));
    
    toast({
      title: t("success_login") || "تم تسجيل الدخول بنجاح",
      description: `${t("welcome_back") || "مرحبا بعودتك"}, ${userData.name}!`,
    });
    
    // توجيه المستخدم إلى الصفحة الرئيسية
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#2d2621] p-6">
      <OfflineNotice isOffline={!isOnline} />
      
      <div className="max-w-md w-full mx-auto">
        <SignupHeader />

        <SignupTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
          isOnline={isOnline}
          handleEmailSignup={handleEmailSignup}
          handlePhoneSignup={handlePhoneSignup}
        />

        <SocialSection 
          isLoading={isLoading} 
          onLoginSuccess={handleSocialLoginSuccess} 
        />

        <LoginLink />
      </div>
    </div>
  );
};

export default Signup;
