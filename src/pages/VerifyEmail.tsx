
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // Get email from location state or session storage
  const email = location.state?.email || sessionStorage.getItem("verifyEmail") || "";

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
      return;
    }

    // Store email in session storage
    sessionStorage.setItem("verifyEmail", email);

    // Set up countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would validate against a code sent to the user's email
    // For demo purposes, we'll accept any 6-digit code
    setTimeout(() => {
      if (verificationCode.length === 6) {
        // Store user in local storage to simulate successful registration
        const newUser = {
          id: `user-${Date.now()}`,
          name: "",
          email: email,
          emailVerified: true,
          isVerified: false,
          registeredAt: new Date().toISOString(),
        };
        
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        
        toast({
          title: "تم التحقق من البريد الإلكتروني بنجاح",
          description: "جاري تحويلك للصفحة الرئيسية...",
        });
        
        // Navigate to home after verification
        navigate('/home');
      } else {
        toast({
          title: "خطأ في التحقق",
          description: "يرجى إدخال رمز التحقق الصحيح (6 أرقام)",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return;
    
    setIsResending(true);
    // In a real app, this would resend the verification code to the email
    setTimeout(() => {
      toast({
        title: "تم إرسال رمز جديد",
        description: `تم إرسال رمز تحقق جديد إلى ${email}`,
      });
      setTimeLeft(60);
      setIsResending(false);
      
      // Set up countdown timer again
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#2d2621] p-6">
      <div className="max-w-md w-full mx-auto">
        <div className="absolute top-4 left-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-white p-2 rounded-full hover:bg-white/10"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-4 rtl">
            التحقق من البريد الإلكتروني
          </h1>
          <p className="text-gray-300 rtl">
            أدخل رمز التحقق المرسل إلى
          </p>
          <p className="text-white font-medium rtl">
            {email}
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              className="text-center text-3xl letter-spacing-wider h-16 bg-[#3a322d] border-0 text-white"
              placeholder="_ _ _ _ _ _"
              autoFocus
              maxLength={6}
              disabled={isLoading}
            />
            <p className="text-sm text-center text-gray-400 rtl">
              أدخل الرمز المكون من 6 أرقام
            </p>
          </div>

          <Button 
            type="submit"
            className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
            disabled={verificationCode.length !== 6 || isLoading}
          >
            {isLoading ? "جاري التحقق..." : "تحقق"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm rtl">
            لم تستلم الرمز؟{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className={`font-medium ${
                timeLeft > 0
                  ? "text-gray-500"
                  : "text-[#e06952] hover:underline"
              }`}
              disabled={timeLeft > 0 || isResending}
            >
              {timeLeft > 0
                ? `إعادة الإرسال (${timeLeft})`
                : isResending
                ? "جاري إعادة الإرسال..."
                : "إعادة الإرسال"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
