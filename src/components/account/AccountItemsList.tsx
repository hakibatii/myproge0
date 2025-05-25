
import { useNavigate } from "react-router-dom";
import { 
  Bell, Settings, Lock, HelpCircle, LogOut, 
  CreditCard, Edit3, Headphones, BookOpen, 
  Trash2, History, Heart, Users, User, Globe
} from "lucide-react";
import AccountItem from "../AccountItem";
import { useLanguage } from "@/contexts/LanguageContext";

interface AccountItemsListProps {
  isVerified: boolean;
  handleLogout: () => void;
  handlePrivacyPolicy: () => void;
}

const AccountItemsList = ({ isVerified, handleLogout, handlePrivacyPolicy }: AccountItemsListProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-2 px-4">
      {/* Profile settings section */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <AccountItem
          icon={<Edit3 className="text-blue-500" />}
          title={t("edit_profile")}
          onClick={() => navigate("/profile-edit")}
        />
        <AccountItem
          icon={<User className="text-purple-500" />}
          title={t("account_type")}
          onClick={() => navigate("/account-type")}
        />
        <AccountItem
          icon={<Globe className="text-green-500" />}
          title={t("language")}
          onClick={() => navigate("/language")}
        />
      </div>

      {/* Content management section */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <AccountItem
          icon={<Heart className="text-red-500" />}
          title={t("favorites")}
          onClick={() => navigate("/favorites")}
        />
        <AccountItem
          icon={<History className="text-amber-500" />}
          title={t("browsing_history")}
          onClick={() => navigate("/browse-history")}
        />
        <AccountItem
          icon={<Users className="text-indigo-500" />}
          title={t("following")}
          onClick={() => navigate("/following")}
        />
      </div>

      {/* Account management section */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <AccountItem
          icon={<CreditCard className="text-morocco-gold" />}
          title={t("upgrade_account")}
          onClick={() => navigate("/upgrade")}
          value={!isVerified ? t("not_verified") : undefined}
        />
        <AccountItem
          icon={<Headphones className="text-sky-500" />}
          title={t("help_support")}
          onClick={() => navigate("/support")}
        />
        <AccountItem
          icon={<BookOpen className="text-emerald-500" />}
          title={t("privacy_policy")}
          onClick={handlePrivacyPolicy}
        />
        <AccountItem
          icon={<Trash2 className="text-red-500" />}
          title={t("delete_account")}
          onClick={() => navigate("/delete-account")}
        />
        <AccountItem
          icon={<LogOut className="text-red-600" />}
          title={t("logout")}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default AccountItemsList;
