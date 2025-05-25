
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

const VerifyPhone = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Get phone from session storage
    const storedPhone = sessionStorage.getItem("verifyPhone");
    if (!storedPhone) {
      navigate("/profile-edit");
      return;
    }
    setPhone(storedPhone);
  }, [navigate]);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would verify the code with a backend
    // For now, we'll just simulate verification
    setTimeout(() => {
      // Any code of 6 digits is considered valid for this demo
      if (verificationCode.length === 6) {
        setIsVerified(true);
        
        // Update user in localStorage with verified phone
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          const user = JSON.parse(userJson);
          user.phone = phone;
          user.phoneVerified = true;
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        
        toast({
          title: "تم التحقق من رقم الهاتف",
          description: "تم التحقق من رقمك بنجاح",
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

  return (
    <div className="min-h-screen flex flex-col bg-[#2d2621] p-6">
      <div className="mb-6">
        <Link to="/profile-edit" className="text-white flex items-center">
          <ArrowLeft size={20} />
          <span className="mr-2">العودة</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          {isVerified ? (
            // Success state
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={80} className="text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                تم التحقق بنجاح
              </h1>
              <p className="text-gray-300 mb-8 rtl">
                تم التحقق من رقم هاتفك بنجاح
              </p>
              <Button 
                onClick={() => navigate("/profile-edit")}
                className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
              >
                العودة إلى الملف الشخصي
              </Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  التحقق من رقم الهاتف
                </h1>
                <p className="text-gray-400 rtl">
                  أدخل رمز التحقق الذي تم إرساله إلى {phone}
                </p>
              </div>

              {/* Verification code form */}
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
                
                <div className="text-center">
                  <button
                    type="button"
                    className="text-[#e06952] hover:underline text-sm"
                    onClick={() => {
                      toast({
                        title: "تم إعادة إرسال الرمز",
                        description: "تحقق من رسائلك النصية",
                      });
                    }}
                  >
                    إعادة إرسال الرمز
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
