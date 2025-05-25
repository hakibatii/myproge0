
import { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      navigate("/forgot-password");
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would verify the code with a backend
    // For now, we'll just simulate verification
    setTimeout(() => {
      // Any code of 6 digits is considered valid for this demo
      if (verificationCode.length === 6) {
        setIsCodeVerified(true);
        toast({
          title: "تم التحقق من الرمز",
          description: "يمكنك الآن إعادة تعيين كلمة المرور",
        });
      } else {
        toast({
          title: "رمز غير صالح",
          description: "يرجى إدخال رمز التحقق الصحيح",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would update the password in a database
    // For now, we just simulate success
    setTimeout(() => {
      toast({
        title: "تم إعادة تعيين كلمة المرور",
        description: "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة",
      });
      navigate("/login");
      setIsLoading(false);
    }, 1000);
  };

  const handleSkipReset = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2d2621] p-6">
      <div className="mb-6">
        <Link to="/forgot-password" className="text-white flex items-center">
          <ArrowLeft size={20} />
          <span className="mr-2">العودة</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isCodeVerified ? "إعادة تعيين كلمة المرور" : "أدخل رمز التحقق"}
            </h1>
            <p className="text-gray-400 rtl">
              {isCodeVerified 
                ? "أدخل كلمة المرور الجديدة" 
                : `تم إرسال رمز التحقق إلى ${email}`}
            </p>
          </div>

          {!isCodeVerified ? (
            // Verification code form
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode}
                  onChange={setVerificationCode}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
                
              <Button 
                type="submit"
                className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
                disabled={verificationCode.length !== 6 || isLoading}
              >
                {isLoading ? "جاري التحقق..." : "تحقق من الرمز"}
              </Button>
            </form>
          ) : (
            // New password form
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور الجديدة"
                  className="w-full px-4 py-6 rounded-lg bg-[#3a322d] border-0 text-white placeholder:text-gray-400 rtl text-right"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button 
                  type="submit"
                  className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
                  disabled={password.length < 6 || isLoading}
                >
                  {isLoading ? "جاري الحفظ..." : "تعيين كلمة المرور الجديدة"}
                </Button>
                
                <Button 
                  type="button"
                  variant="ghost"
                  className="w-full py-6 rounded-lg font-medium text-white"
                  onClick={handleSkipReset}
                >
                  عدم تغيير كلمة المرور
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
