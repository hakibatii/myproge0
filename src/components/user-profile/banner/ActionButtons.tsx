
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ActionButtonsProps {
  onMessage: () => void;
  onFollow: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onMessage, onFollow }) => {
  const { t } = useLanguage();

  return (
    <div className="flex space-x-2 rtl-space-x-reverse">
      <Button 
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={onMessage}
      >
        <MessageCircle size={16} className="mr-1" />
        <span className="rtl">{t("message")}</span>
      </Button>
      <Button 
        variant="default"
        size="sm"
        className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white"
        onClick={onFollow}
      >
        <UserPlus size={16} className="mr-1" />
        <span className="rtl">{t("follow")}</span>
      </Button>
    </div>
  );
};
