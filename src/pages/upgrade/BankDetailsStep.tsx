
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpgradeFormData } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";

interface BankDetailsStepProps {
  formData: UpgradeFormData;
  updateFormData: (field: keyof UpgradeFormData, value: any) => void;
  prevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BankDetailsStep = ({
  formData,
  updateFormData,
  prevStep,
  onSubmit
}: BankDetailsStepProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name as keyof UpgradeFormData, e.target.value);
  };

  const isFormValid = () => {
    // For the free package, we don't require bank details
    if (formData.subscriptionType === 'basic') {
      return true;
    }
    // For paid packages, we require a transfer reference for manual payment verification
    return formData.paymentReference ? true : false;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const bankAccountInfo = {
    accountNumber: "2303304805938211011450085",
    accountHolder: "ABDELILAH IBORK"
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccountInfo.accountNumber).then(() => {
      setHasCopied(true);
      toast({
        description: "تم نسخ رقم الحساب البنكي",
      });
      setTimeout(() => setHasCopied(false), 3000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold rtl">{t("bank_info")}</h2>
        <p className="text-sm text-gray-500 rtl">{t("bank_info_desc")}</p>
      </div>
      
      {formData.subscriptionType === 'basic' ? (
        <div className="text-center p-4 mb-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-green-600 dark:text-green-400 rtl">لا حاجة لمعلومات بنكية للباقة المجانية</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bank account information */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold rtl mb-2">معلومات الحساب البنكي للدفع</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium rtl">اسم صاحب الحساب:</p>
                <p className="text-base rtl bg-white dark:bg-gray-800 p-2 rounded mt-1">{bankAccountInfo.accountHolder}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium rtl">رقم الحساب البنكي:</p>
                <div className="flex rtl items-center mt-1">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded flex-1 text-base overflow-x-auto">
                    {bankAccountInfo.accountNumber}
                  </div>
                  <button 
                    className="p-2 bg-morocco-gold/10 hover:bg-morocco-gold/20 rounded-full ml-2" 
                    onClick={handleCopyAccount}
                    title="نسخ رقم الحساب"
                  >
                    {hasCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-morocco-gold" />}
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 rtl">
                <p>يرجى تحويل مبلغ {formData.subscriptionType === 'premium' ? '150' : formData.subscriptionType === 'professional' ? '249' : '449'} درهم إلى الحساب أعلاه</p>
              </div>
            </div>
          </div>
          
          {/* Payment reference */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <label className="block text-sm font-medium rtl">مرجع الدفع</label>
              <p className="text-xs text-gray-500 rtl mb-2">أدخل رقم الحوالة أو أي مرجع للتحويل البنكي الذي قمت به</p>
              <Input 
                name="paymentReference" 
                value={formData.paymentReference || ""} 
                onChange={handleInputChange} 
                className="rtl text-right"
                placeholder="مثال: TRF123456789"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex space-x-4 rtl:space-x-reverse">
        <Button
          onClick={prevStep}
          variant="outline"
          className="w-1/2 rtl"
        >
          {t("previous")}
        </Button>
        <Button
          onClick={handleSubmitForm}
          className="w-1/2 bg-morocco-gold hover:bg-morocco-gold/90 text-white rtl"
          disabled={!isFormValid()}
        >
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default BankDetailsStep;
