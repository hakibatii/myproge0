
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, implement login functionality with proper backend validation
    // For now, we'll simulate a login process
    setTimeout(() => {
      // Mock login success
      if (email && password) {
        // Store user info in localStorage
        const user = {
          id: "user-123",
          email,
          name: "User",
          isVerified: true,
          phone: "",
          phoneVerified: false
        };
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبًا بك مجددًا في تطبيقنا",
        });
        
        // Navigate to home
        navigate("/home");
      } else {
        toast({
          title: "فشل تسجيل الدخول",
          description: "بريد إلكتروني أو كلمة مرور غير صحيحة",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle Google login
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // In a real app, this would use Google OAuth
    // For now, we'll simulate a successful login
    setTimeout(() => {
      const mockGoogleUser = {
        id: "google-user-123",
        email: "user@gmail.com",
        name: "Google User",
        isVerified: false,
        phone: "",
        phoneVerified: false,
        provider: "google"
      };
      
      localStorage.setItem("currentUser", JSON.stringify(mockGoogleUser));
      
      toast({
        title: "تم تسجيل الدخول بنجاح باستخدام Google",
        description: "مرحبًا بك مجددًا في تطبيقنا",
      });
      
      navigate("/home");
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle Apple login
  const handleAppleLogin = () => {
    setIsLoading(true);
    // In a real app, this would use Apple OAuth
    // For now, we'll simulate a successful login
    setTimeout(() => {
      const mockAppleUser = {
        id: "apple-user-123",
        email: "user@icloud.com",
        name: "Apple User",
        isVerified: false,
        phone: "",
        phoneVerified: false,
        provider: "apple"
      };
      
      localStorage.setItem("currentUser", JSON.stringify(mockAppleUser));
      
      toast({
        title: "تم تسجيل الدخول بنجاح باستخدام Apple",
        description: "مرحبًا بك مجددًا في تطبيقنا",
      });
      
      navigate("/home");
      setIsLoading(false);
    }, 1500);
  };
  
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

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#2d2621] p-6">
      {!isOnline && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm">
          أنت غير متصل بالإنترنت، يرجى التحقق من اتصالك
        </div>
      )}
      
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            تسجيل الدخول
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-6 rounded-lg bg-[#3a322d] border-0 text-white placeholder:text-gray-400 rtl text-right"
              required
              disabled={!isOnline || isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-6 rounded-lg bg-[#3a322d] border-0 text-white placeholder:text-gray-400 rtl text-right"
              required
              disabled={!isOnline || isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 left-3 flex items-center"
              disabled={!isOnline || isLoading}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-[#e06952] hover:underline text-sm rtl">
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* Login Button */}
          <Button 
            type="submit"
            className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
            disabled={!isOnline || isLoading}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-600"></div>
          <div className="mx-4 text-gray-400 text-sm">أو المتابعة باستخدام</div>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 bg-[#3a322d] text-white border-0 py-6 rounded-lg hover:bg-[#4a4239]"
            disabled={!isOnline || isLoading}
            onClick={handleAppleLogin}
          >
            <span className="rtl text-sm">Apple</span>
          </Button>
          
          <Button
            variant="outline" 
            className="flex items-center justify-center gap-2 bg-[#3a322d] text-white border-0 py-6 rounded-lg hover:bg-[#4a4239]"
            disabled={!isOnline || isLoading}
            onClick={handleGoogleLogin}
          >
            <span className="rtl text-sm">Google</span>
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="rtl text-gray-300">
            ليس لديك حساب؟{" "}
            <Link to="/signup" className="text-[#e06952] font-medium hover:underline">
              التسجيل
            </Link>
          </p>
        </div>

        {/* Demo Account */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm">
            [Demo: Use Test Account]
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
