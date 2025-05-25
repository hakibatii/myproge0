
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PhoneVerificationFieldProps {
  phone: string;
  isVerified: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
}

const PhoneVerificationField: React.FC<PhoneVerificationFieldProps> = ({
  phone,
  isVerified,
  onChange,
  onVerify
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium rtl">{t("phone")}</label>
        {isVerified && (
          <div className="flex items-center text-green-500 text-sm">
            <Check size={16} className="ml-1" />
            <span>{t("verified")}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Input 
          name="phone" 
          value={phone} 
          onChange={onChange}
          className="rtl text-right flex-1" 
        />
        {!isVerified && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onVerify}
            className="whitespace-nowrap"
          >
            {t("verify")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhoneVerificationField;
