
import React from "react";
import { Bell, Settings, Moon, UserX, History } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AccountActionsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  unreadNotificationsCount: number;
  openNotifications: () => void;
}

const AccountActions: React.FC<AccountActionsProps> = ({
  isDarkMode,
  toggleDarkMode,
  unreadNotificationsCount,
  openNotifications
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex space-x-2 rtl:space-x-reverse">
      {/* Notifications Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-white"
        onClick={openNotifications}
      >
        <Bell size={24} />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadNotificationsCount}
          </span>
        )}
      </Button>

      {/* Settings Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Settings size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rtl">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <Moon className="mr-2" size={16} />
              <span>{t("dark_mode")}</span>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </div>
          <DropdownMenuItem onClick={() => navigate("/blocked-users")}>
            <UserX className="ml-2" size={16} />
            <span>{t("block")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/browse-history")}>
            <History className="ml-2" size={16} />
            <span>{t("history")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountActions;
