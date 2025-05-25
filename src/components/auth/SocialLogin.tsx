
import { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';

interface SocialAccount {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'apple';
}

interface SocialLoginProps {
  onLoginSuccess: (userData: { name: string; email: string; provider: string; providerId: string }) => void;
  isLoading: boolean;
}

const SocialLogin = ({ onLoginSuccess, isLoading }: SocialLoginProps) => {
  const { t } = useLanguage();
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [provider, setProvider] = useState<'google' | 'apple' | null>(null);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);

  // مثال لحسابات وهمية لغرض العرض
  const mockGoogleAccounts = [
    { id: 'g1', name: 'أحمد محمد', email: 'ahmed@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Ahmed+M&background=0D8ABC&color=fff', provider: 'google' as const },
    { id: 'g2', name: 'سارة علي', email: 'sara@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Sara+A&background=BC0D3C&color=fff', provider: 'google' as const }
  ];

  const mockAppleAccounts = [
    { id: 'a1', name: 'محمد عمر', email: 'mohammed@icloud.com', avatar: 'https://ui-avatars.com/api/?name=Mohammed+O&background=000&color=fff', provider: 'apple' as const },
    { id: 'a2', name: 'ليلى خالد', email: 'layla@icloud.com', avatar: 'https://ui-avatars.com/api/?name=Layla+K&background=333&color=fff', provider: 'apple' as const }
  ];

  const handleSocialLogin = (providerName: 'google' | 'apple') => {
    setProvider(providerName);
    // في تطبيق حقيقي، سنقوم هنا بالاتصال بـ API للحصول على قائمة الحسابات
    // لكن الآن نستخدم بيانات وهمية للعرض
    if (providerName === 'google') {
      setAccounts(mockGoogleAccounts);
    } else {
      setAccounts(mockAppleAccounts);
    }
    setShowAccountSelector(true);
  };

  const handleAccountSelect = (account: SocialAccount) => {
    // تخزين معلومات المستخدم في localStorage
    const userData = {
      name: account.name,
      email: account.email,
      provider: account.provider,
      providerId: account.id,
      avatar: account.avatar || '',
    };
    
    // في تطبيق حقيقي، سنقوم بعملية المصادقة الحقيقية هنا
    localStorage.setItem('socialAuthData', JSON.stringify(userData));
    
    // إغلاق نافذة اختيار الحساب
    setShowAccountSelector(false);
    
    // إرسال بيانات المستخدم إلى الأعلى
    onLoginSuccess({
      name: account.name,
      email: account.email,
      provider: account.provider,
      providerId: account.id
    });
  };

  const getDialogTitle = () => {
    if (provider === 'google') {
      return t('select_google_account') || 'اختر حساب Google';
    } else {
      return t('select_apple_account') || 'اختر حساب Apple';
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 bg-[#3a322d] text-white border-0 py-6 rounded-lg hover:bg-[#4a4239]"
          disabled={isLoading}
          onClick={() => handleSocialLogin('apple')}
        >
          <User size={18} />
          <span className="rtl text-sm">Apple</span>
        </Button>
        
        <Button
          variant="outline" 
          className="flex items-center justify-center gap-2 bg-[#3a322d] text-white border-0 py-6 rounded-lg hover:bg-[#4a4239]"
          disabled={isLoading}
          onClick={() => handleSocialLogin('google')}
        >
          <User size={18} />
          <span className="rtl text-sm">Google</span>
        </Button>
      </div>

      <Dialog open={showAccountSelector} onOpenChange={setShowAccountSelector}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center rtl">{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 rtl">
              {t('select_account_to_continue') || 'اختر الحساب للمتابعة'}
            </p>
            <div className="space-y-2">
              {accounts.map((account) => (
                <Button
                  key={account.id}
                  variant="outline"
                  className="w-full flex items-center justify-start gap-3 py-6 rtl"
                  onClick={() => handleAccountSelect(account)}
                >
                  <img 
                    src={account.avatar} 
                    alt={account.name} 
                    className="h-8 w-8 rounded-full" 
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{account.name}</span>
                    <span className="text-xs text-gray-500">{account.email}</span>
                  </div>
                </Button>
              ))}
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 rtl mt-4">
              {t('privacy_notice') || 'بالمتابعة، أنت توافق على سياسة الخصوصية وشروط الاستخدام'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialLogin;
