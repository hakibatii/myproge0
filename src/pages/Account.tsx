import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import AccountHeader from "@/components/account/AccountHeader";
import AccountItemsList from "@/components/account/AccountItemsList";
import AccountActions from "@/components/account/AccountActions";
import { useAccountData } from "@/components/account/useAccountData";
import { useNotifications } from "@/hooks/useNotifications";
import { useLanguage } from "@/contexts/LanguageContext";

const Account = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    user,
    isDarkMode,
    toggleDarkMode,
    handleLogout,
  } = useAccountData();
  
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
    isLoading,
    error
  } = useNotifications();
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogoutClick = () => {
    const redirectUrl = handleLogout();
    navigate(redirectUrl);
  };

  const handlePrivacyPolicyClick = () => {
    navigate("/privacy-policy");
  };

  const profileData = {
    name: user.name,
    avatar: user.avatar,
    city: user.city,
    points: user.points || 0,
    tripCount: user.tripCount || 0,
    isVerified: user.isVerified,
    background: user.background || "",
    description: user.description || "مرشد سياحي متخصص في المناطق الجبلية والصحراوية في المغرب. أتحدث العربية والإنجليزية والفرنسية بطلاقة."
  };

  return (
    <div className="page-container bg-gray-100 dark:bg-morocco-navy/90 pb-20 hide-scrollbar touch-scroll">
      <div className="relative">
        <div className="bg-morocco-turquoise text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold rtl">{t("account")}</h1>
            
            <AccountActions 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              unreadNotificationsCount={unreadCount}
              openNotifications={() => setIsNotificationsOpen(true)}
            />
          </div>
        </div>

        <div className="px-4 -mt-2">
          <AccountHeader user={profileData} />
        </div>
      </div>

      <div className="mt-3">
        <AccountItemsList 
          isVerified={user.isVerified}
          handleLogout={handleLogoutClick}
          handlePrivacyPolicy={handlePrivacyPolicyClick}
        />
      </div>
      
      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent side="right" className="sm:max-w-md p-0 hide-scrollbar touch-scroll">
          <NotificationsPanel
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onRefresh={refreshNotifications}
            onClose={() => setIsNotificationsOpen(false)}
            isLoading={isLoading}
            error={error}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Account;
