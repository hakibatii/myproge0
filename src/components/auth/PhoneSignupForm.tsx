
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface PhoneSignupFormProps {
  isLoading: boolean;
  isOnline: boolean;
  onSubmit: (name: string, phone: string, password: string) => void;
}

const PhoneSignupForm = ({ isLoading, isOnline, onSubmit }: PhoneSignupFormProps) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !phone || !password) {
      toast({
        title: t("error") || "خطأ في البيانات",
        description: t("validationError") || "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: t("error") || "كلمة المرور قصيرة",
        description: t("password_length_error") || "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
        variant: "destructive",
      });
      return;
    }

    onSubmit(name, phone, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div className="relative">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("fullName") || "الاسم"}
          className="w-full px-4 py-6 rounded-lg bg-[#3a322d] border-0 text-white placeholder:text-gray-400 rtl text-right"
          required
          disabled={!isOnline || isLoading}
        />
      </div>

      {/* Phone Input */}
      <div className="relative">
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("phoneNumber") || "رقم الهاتف"}
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
          placeholder={t("password") || "كلمة المرور"}
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

      {/* Signup Button */}
      <Button 
        type="submit"
        className="w-full py-6 rounded-lg font-medium transition-colors bg-[#d25f45] hover:bg-[#c04e36] text-white border-0"
        disabled={!isOnline || isLoading}
      >
        {isLoading ? (t("loading") || "جاري إنشاء الحساب...") : (t("signup") || "إنشاء حساب")}
      </Button>
    </form>
  );
};

export default PhoneSignupForm;
