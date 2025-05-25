
import { useEffect } from "react";
import { Bell, X, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/components/user-profile/types";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onRefresh?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  error?: string | null;
  isStandalone?: boolean; // Whether the panel is standalone or embedded
  className?: string;
}

const NotificationsPanel = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onRefresh,
  onClose,
  isLoading = false,
  error = null,
  isStandalone = true,
  className = ""
}: NotificationsPanelProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  useEffect(() => {
    if (error) {
      toast({
        title: "خطأ",
        description: error,
        variant: "destructive"
      });
    }
  }, [error]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_trip':
        return <div className="bg-morocco-turquoise/20 p-2 rounded-full"><Bell size={16} className="text-morocco-turquoise" /></div>;
      case 'points_earned':
        return <div className="bg-morocco-gold/20 p-2 rounded-full"><Bell size={16} className="text-morocco-gold" /></div>;
      case 'badge_upgrade':
        return <div className="bg-purple-500/20 p-2 rounded-full"><Bell size={16} className="text-purple-500" /></div>;
      case 'referral':
        return <div className="bg-green-500/20 p-2 rounded-full"><Bell size={16} className="text-green-500" /></div>;
      default:
        return <div className="bg-gray-200/20 p-2 rounded-full"><Bell size={16} className="text-gray-500" /></div>;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (onMarkAsRead && !notification.read) {
      onMarkAsRead(notification.id);
    }
    
    // Here you could add navigation based on notification type/data
    // For example: navigate to a specific trip if notification.type === 'new_trip'
  };

  const containerClasses = `
    ${isStandalone ? "fixed inset-y-0 right-0 z-50 w-80" : "w-full h-full"} 
    bg-white dark:bg-morocco-navy shadow-lg flex flex-col
    ${className}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <h2 className="font-bold rtl">الإشعارات</h2>
          {unreadCount > 0 && (
            <Badge className="bg-morocco-turquoise ml-2">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          {onRefresh && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRefresh} 
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </Button>
          )}
          {onMarkAllAsRead && unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMarkAllAsRead} 
              className="rtl text-xs flex gap-1 items-center"
              disabled={isLoading}
            >
              <Check size={14} />
              <span>تعيين الكل كمقروء</span>
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner className="h-6 w-6 text-morocco-turquoise" />
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start">
                  {getNotificationIcon(notification.type)}
                  <div className="ml-3 flex-1">
                    <h4 className="font-medium rtl">{notification.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 rtl">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 rtl">لا توجد إشعارات جديدة</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsPanel;
