
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would send a reset email/SMS to the user
    // For now, we'll just simulate the process
    setTimeout(() => {
      if (email) {
        setIsSubmitted(true);
        // Store email in session storage for the verification page
        sessionStorage.setItem("resetEmail", email);
        
        navigate("/reset-password");
      } else {
        toast({
          title: "خطأ",
          description: "يرجى إدخال البريد الإلكتروني",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2d2621] p-6">
      <div className="mb-6">
        <Link to="/login" className="text-white flex items-center">
          <ArrowLeft size={20} />
          <span className="mr-2">العودة</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              استعادة كلمة المرور
            </h1>
            <p className="text-gray-400 rtl">
              أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                className="w-full px-4 py-6 rounded-lg bg-[#3a322d] border-0 text-white placeholder:text-gray-400 rtl text-right"
                required
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
              disabled={isLoading}
            >
              {isLoading ? "جاري المعالجة..." : "إرسال رمز التحقق"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
