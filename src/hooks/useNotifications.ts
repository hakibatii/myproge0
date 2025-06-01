
import { useState, useEffect } from "react";
import { Notification } from "@/components/user-profile/types";
import { useToast } from "@/hooks/use-toast";

export function useNotifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock fetching notifications - in a real app, this would be an API call
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "new_trip",
          title: "رحلة جديدة متاحة",
          message: "هناك رحلة جديدة إلى مراكش متاحة الآن",
          timestamp: "منذ 10 دقائق",
          read: false,
          data: { tripId: "trip-1" }
        },
        {
          id: "2",
          type: "points_earned",
          title: "ربحت نقاط جديدة",
          message: "لقد ربحت 50 نقطة مكافأة عند إكمال رحلتك",
          timestamp: "منذ 3 ساعات",
          read: false,
          data: { points: 50 }
        },
        {
          id: "3",
          type: "badge_upgrade",
          title: "ترقية الشارة",
          message: "تهانينا! لقد تمت ترقيتك إلى المسافر الفضي",
          timestamp: "منذ يومين",
          read: true,
          data: { badgeType: "silver" }
        },
        {
          id: "4",
          type: "referral",
          title: "استخدام رمز الإحالة",
          message: "قام صديقك محمد باستخدام رمز الإحالة الخاص بك",
          timestamp: "منذ 3 أيام",
          read: true,
          data: { referralCode: "ABC123" }
        },
        {
          id: "5",
          type: "system",
          title: "متابع جديد",
          message: "قام سارة العامري بمتابعتك",
          timestamp: "منذ أسبوع",
          read: true,
          data: {}
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (err) {
      setError("فشل في تحميل الإشعارات");
      console.error("Failed to fetch notifications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    // In a real app, you'd make an API call to mark the notification as read
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    // In a real app, you'd make an API call to mark all notifications as read
    console.log("Marking all notifications as read");
    toast({
      title: "تم تعيين كل الإشعارات كمقروءة",
      description: "تم تحديث حالة جميع الإشعارات"
    });
  };

  const refreshNotifications = () => {
    fetchNotifications();
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم تحديث قائمة الإشعارات الخاصة بك"
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refreshNotifications
  };
}
