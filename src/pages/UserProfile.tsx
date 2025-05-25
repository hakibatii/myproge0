
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import UserProfileHeader from "@/components/user-profile/UserProfileHeader";
import { UserProfileBanner } from "@/components/user-profile/banner";
import UserProfileTabs from "@/components/user-profile/UserProfileTabs";
import { User, Post, Trip } from "@/components/user-profile/types";

const UserProfile = () => {
  const { username } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("#1E3A8A");
  
  // Mock data - in a real app, fetch from API based on username
  const user: User & { city?: string; completionPercentage?: number } = {
    id: "user-1",
    name: username || "سارة العامري",
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    background: bgColor,
    bio: "مرشدة سياحية متخصصة في السياحة الصحراوية، أتحدث العربية والإنجليزية والفرنسية.",
    phone: "+966 4567 123 55 964",
    isVerified: true,
    rating: 4.8,
    followersCount: 320,
    followingCount: 150,
    city: "مراكش",
    completionPercentage: 85
  };
  
  // Mock current user
  const currentUser = {
    id: "current-user",
    isVerified: false,
  };

  // Mock interaction status (has current user interacted with this profile?)
  const hasInteracted = true;

  // Mock posts
  const posts: Post[] = [
    {
      id: "1",
      user,
      content: "تجربتي في مدينة مراكش كانت رائعة جداً، أنصح الجميع بزيارتها والاستمتاع بالمناظر الطبيعية الخلابة والأماكن التاريخية.",
      image: "https://images.unsplash.com/photo-1489749098374-a6677454b9b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      likes: 24,
      comments: 5,
      timestamp: "منذ ساعتين",
      hashtags: ["مراكش", "سياحة", "المغرب"]
    },
    {
      id: "2",
      user,
      content: "زيارة شفشاون كانت من أجمل التجارب في حياتي، المدينة الزرقاء ساحرة بكل تفاصيلها.",
      likes: 18,
      comments: 3,
      timestamp: "منذ 5 ساعات",
      hashtags: ["شفشاون", "المدينة_الزرقاء", "المغرب"],
      video: "https://example.com/sample-video.mp4" // This would be a real video URL in production
    },
  ];

  // Mock trips
  const trips: Trip[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1489749098374-a6677454b9b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      title: "جولة في مدينة مراكش",
      location: "مراكش, المغرب",
      date: "3 أيام, 4 ليالي",
      rating: 4.8,
      originalPrice: 850,
      discountedPrice: 650,
      currency: "درهم",
      user
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      title: "استكشاف شفشاون الزرقاء",
      location: "شفشاون, المغرب",
      date: "2 أيام, 3 ليالي",
      rating: 4.7,
      originalPrice: 600,
      discountedPrice: 500,
      currency: "درهم",
      user
    },
  ];

  const handleMessage = () => {
    if (!currentUser.isVerified) {
      toast({
        title: "تحتاج إلى ترقية",
        description: "يرجى ترقية حسابك لإرسال رسائل",
      });
      return;
    }
    
    navigate(`/chat/${user.name}`);
  };

  const handleFollow = () => {
    if (!currentUser.isVerified) {
      toast({
        title: "تحتاج إلى ترقية",
        description: "يرجى ترقية حسابك لمتابعة المستخدمين",
      });
      return;
    }
    
    toast({
      title: "تمت المتابعة",
      description: `تمت متابعة ${user.name} بنجاح`,
    });
  };
  
  const handleFollowersClick = () => {
    navigate('/followers');
  };
  
  const handleFollowingClick = () => {
    navigate('/following');
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <UserProfileHeader 
        user={user}
        currentUser={currentUser}
        hasInteracted={hasInteracted}
      />
      <UserProfileBanner 
        user={user} 
        onMessage={handleMessage} 
        onFollow={handleFollow} 
        onFollowersClick={handleFollowersClick}
        onFollowingClick={handleFollowingClick}
      />
      <UserProfileTabs posts={posts} trips={trips} currentUser={currentUser} />
    </div>
  );
};

export default UserProfile;
