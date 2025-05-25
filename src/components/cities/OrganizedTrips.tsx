
import { useState } from "react";
import TripCard from "@/components/TripCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface OrganizedTrip {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  rating: number;
  originalPrice?: number;
  discountedPrice: number;
  currency: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  description: string;
  tags: string[];
}

const OrganizedTrips = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  
  // بيانات وهمية للرحلات المنظمة
  const organizedTrips: OrganizedTrip[] = [
    {
      id: "org-1",
      image: "https://images.unsplash.com/photo-1539020140153-e8c237112187?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      title: "جولة استكشافية في مراكش",
      location: "مراكش, المغرب",
      date: "5 أيام, 4 ليالي",
      rating: 4.9,
      originalPrice: 950,
      discountedPrice: 750,
      currency: "درهم",
      user: {
        id: "org-user-1",
        name: "شركة سفريات المغرب",
        avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
        isVerified: true
      },
      description: "استكشف أجمل معالم مدينة مراكش التاريخية مع مرشدين محليين وإقامة فاخرة",
      tags: ["سياحة", "تاريخ", "ثقافة"]
    },
    {
      id: "org-2",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      title: "رحلة شفشاون الزرقاء",
      location: "شفشاون, المغرب",
      date: "3 أيام, 2 ليالي",
      rating: 4.7,
      originalPrice: 700,
      discountedPrice: 550,
      currency: "درهم",
      user: {
        id: "org-user-2",
        name: "رحلات الأطلس",
        avatar: "/lovable-uploads/95be6345-50cf-44ca-9c71-0dee199339e3.png",
        isVerified: true
      },
      description: "رحلة مميزة إلى المدينة الزرقاء الساحرة مع جولات في الجبال المحيطة",
      tags: ["مغامرة", "تصوير", "طبيعة"]
    },
    {
      id: "org-3",
      image: "https://images.unsplash.com/photo-1570096949819-3f10b02a06f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      title: "صحراء مرزوقة والنجوم",
      location: "مرزوقة, المغرب",
      date: "4 أيام, 3 ليالي",
      rating: 4.8,
      originalPrice: 1200,
      discountedPrice: 999,
      currency: "درهم",
      user: {
        id: "org-user-1",
        name: "شركة سفريات المغرب",
        avatar: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
        isVerified: true
      },
      description: "تجربة الحياة البدوية في الصحراء ومشاهدة النجوم بعيداً عن أضواء المدينة",
      tags: ["صحراء", "مغامرة", "نجوم"]
    },
  ];

  // عرض عدد محدود من الرحلات إلا إذا تم طلب عرض الكل
  const displayedTrips = showAll ? organizedTrips : organizedTrips.slice(0, 2);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold rtl">{t("organized_trips")}</h2>
      </div>

      <div className="space-y-4">
        {displayedTrips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            image={trip.image}
            title={trip.title}
            location={trip.location}
            date={trip.date}
            rating={trip.rating}
            originalPrice={trip.originalPrice}
            discountedPrice={trip.discountedPrice}
            currency={trip.currency}
            user={trip.user}
            description={trip.description}
          />
        ))}
      </div>
      
      {!showAll && organizedTrips.length > 2 && (
        <Button
          variant="outline"
          className="w-full mt-4 text-morocco-turquoise border-morocco-turquoise/30"
          onClick={() => setShowAll(true)}
        >
          {t("load_more")}
        </Button>
      )}
    </div>
  );
};

export default OrganizedTrips;
