
import { PostType } from "../types/post-types";

export const mockPosts: PostType[] = [
  {
    id: "post-1",
    user: {
      id: "user-1",
      name: "محمد الناصر",
      avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
      isVerified: true,
      userType: "organizer",
      subscriptionTier: "premium"
    },
    content: "رحلة رائعة إلى جبال الأطلس! أنصح الجميع بزيارتها في فصل الخريف للاستمتاع بالألوان الخلابة والطقس المعتدل.",
    image: "/lovable-uploads/95be6345-50cf-44ca-9c71-0dee199339e3.png",
    likes: 128,
    comments: 45,
    timestamp: "منذ 3 ساعات",
    hashtags: ["المغرب", "جبالالأطلس", "سياحة", "سفر"]
  },
  {
    id: "post-2",
    user: {
      id: "user-2",
      name: "سارة المغربي",
      avatar: "/lovable-uploads/fcdeaac3-1e78-4852-8b73-0e03820aff6f.png",
      isVerified: false,
      userType: "traveler"
    },
    content: "يوم ممتع في مدينة مراكش القديمة، مشيت أكثر من 10 كيلومترات لاكتشاف أسرار المدينة الحمراء!",
    image: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png",
    likes: 65,
    comments: 12,
    timestamp: "منذ 8 ساعات",
    hashtags: ["مراكش", "المدينةالقديمة", "سفر", "مغامرات"]
  },
  {
    id: "post-3",
    user: {
      id: "user-3",
      name: "شركة الرحلات السعيدة",
      avatar: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png",
      isVerified: true,
      userType: "organizer",
      subscriptionTier: "enterprise"
    },
    content: "عرض خاص لمدة محدودة! اكتشف جمال الصحراء المغربية مع خصم 20% على جميع رحلاتنا الصحراوية في شهر أكتوبر.",
    likes: 94,
    comments: 31,
    timestamp: "منذ يوم",
    hashtags: ["عروض", "سياحة", "الصحراء", "رحلة"]
  },
  {
    id: "post-4",
    user: {
      id: "user-4",
      name: "أحمد المسافر",
      avatar: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png",
      isVerified: false,
      userType: "traveler"
    },
    content: "أفضل مطعم تقليدي جربته في فاس! المأكولات لذيذة والخدمة رائعة والأسعار معقولة.",
    likes: 42,
    comments: 17,
    timestamp: "منذ 3 أيام",
    hashtags: ["فاس", "مطاعم", "أكلتقليدي", "نصائحسفر"]
  },
  {
    id: "post-5",
    user: {
      id: "user-5",
      name: "مجموعة أطلس للسياحة",
      avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
      isVerified: true,
      userType: "organizer",
      subscriptionTier: "basic"
    },
    content: "انضموا إلينا في رحلة رائعة لاستكشاف ساحل الصويرة الساحر واكتشاف أسرار هذه المدينة الساحلية الجميلة.",
    image: "/lovable-uploads/95be6345-50cf-44ca-9c71-0dee199339e3.png",
    likes: 76,
    comments: 22,
    timestamp: "منذ 5 أيام",
    hashtags: ["الصويرة", "سياحة", "شاطئ", "سفر", "رحلات"]
  }
];
