
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Users, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const AccountType = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<'public' | 'private'>(() => {
    // Get the current account type from localStorage
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      return userData.accountType || 'public';
    }
    return 'public';
  });

  const handleTypeChange = (type: 'public' | 'private') => {
    setSelectedType(type);
    
    // Save the account type to localStorage
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      userData.accountType = type;
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } else {
      // Create a new user object if not exists
      const newUser = { accountType: type };
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }
    
    toast({
      title: t("account_type_updated"),
      description: type === 'public' 
        ? t("account_type_public_success") 
        : t("account_type_private_success"),
    });
  };

  const handleSave = () => {
    navigate("/account");
  };

  return (
    <div className="page-container pb-20">
      <div className="bg-morocco-turquoise text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/account")}
          className="text-white hover:bg-morocco-turquoise/20 mr-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">{t("account_type")}</h1>
      </div>
      
      <div className="p-6 space-y-6">
        <div 
          className={`p-4 border rounded-lg flex items-start space-x-4 ${
            selectedType === 'public' ? 'border-morocco-turquoise bg-morocco-turquoise/5' : 'border-gray-200'
          }`}
          onClick={() => handleTypeChange('public')}
        >
          <div className={`p-3 rounded-full ${
            selectedType === 'public' ? 'bg-morocco-turquoise text-white' : 'bg-gray-100'
          }`}>
            <Globe className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg rtl mb-1">{t("public_account")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 rtl">
              خاصية الرسائل مفعلة لجميع المستخدمين
            </p>
          </div>
        </div>
        
        <div 
          className={`p-4 border rounded-lg flex items-start space-x-4 ${
            selectedType === 'private' ? 'border-morocco-turquoise bg-morocco-turquoise/5' : 'border-gray-200'
          }`}
          onClick={() => handleTypeChange('private')}
        >
          <div className={`p-3 rounded-full ${
            selectedType === 'private' ? 'bg-morocco-turquoise text-white' : 'bg-gray-100'
          }`}>
            <Lock className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg rtl mb-1">{t("private_account")}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 rtl">
              خاصية الرسائل تتفعل عند تبادل متابعات فقط
            </p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <Button 
          className="w-full bg-morocco-turquoise hover:bg-morocco-turquoise/90"
          onClick={handleSave}
        >
          {t("save")}
        </Button>
      </div>
    </div>
  );
};

export default AccountType;
