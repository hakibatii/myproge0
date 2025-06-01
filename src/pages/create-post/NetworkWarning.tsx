
import { WifiOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NetworkWarningProps {
  isOnline: boolean;
}

const NetworkWarning = ({ isOnline }: NetworkWarningProps) => {
  const { t } = useLanguage();
  
  if (isOnline) return null;

  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center mt-4">
      <WifiOff className="text-red-600 dark:text-red-400 mr-3" size={20} />
      <div className="rtl">
        <p className="font-medium text-red-600 dark:text-red-400">{t("you_are_offline")}</p>
        <p className="text-sm text-red-500 dark:text-red-300 mt-1">{t("uploads_will_resume")}</p>
      </div>
    </div>
  );
};

export default NetworkWarning;
