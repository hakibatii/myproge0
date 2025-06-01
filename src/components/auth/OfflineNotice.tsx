
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OfflineNoticeProps {
  isOffline: boolean;
}

const OfflineNotice = ({ isOffline }: OfflineNoticeProps) => {
  const { t } = useLanguage();

  if (!isOffline) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm">
      {t("offline") || "أنت غير متصل بالإنترنت، يرجى التحقق من اتصالك"}
    </div>
  );
};

export default OfflineNotice;
