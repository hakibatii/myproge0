
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FavoriteItem {
  id: string;
  image: string;
  name: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  specialOffer?: string;
  currency: string;
}

const Favorites = () => {
  const { t } = useLanguage();
  
  const favoriteItems: FavoriteItem[] = [
    {
      id: "1",
      image: "/lovable-uploads/95be6345-50cf-44ca-9c71-0dee199339e3.png",
      name: "عطر الأميرة الفاخر",
      category: "متجر العطور الراقية",
      originalPrice: 1200,
      discountedPrice: 750,
      discountPercentage: 30,
      currency: "ر.س"
    },
    {
      id: "2",
      image: "/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png",
      name: "محفظة جلد طبيعي",
      category: "متجر المنتجات الجلدية",
      originalPrice: 600,
      discountedPrice: 450,
      discountPercentage: 25,
      currency: "ر.س"
    },
    {
      id: "3",
      image: "/lovable-uploads/6987f1fe-61bb-43a9-93a8-33fa255e9314.png",
      name: "ساعة سويسرية أصلية",
      category: "متجر الساعات الفاخرة",
      originalPrice: 4000,
      discountedPrice: 3200,
      discountPercentage: 20,
      currency: "ر.س"
    },
    {
      id: "4",
      image: "/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png",
      name: "سماعات بلوتوث احترافية",
      category: "متجر التقنية المتطورة",
      originalPrice: 1299,
      discountedPrice: 899,
      specialOffer: "عرض حصري",
      currency: "ر.س"
    }
  ];

  return (
    <div className="page-container px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold rtl">{t("your_favorites")}</h1>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-2 gap-3">
        {favoriteItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-morocco-navy rounded-xl overflow-hidden shadow-sm">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
              <button className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              {item.discountPercentage && (
                <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs py-1 px-2 rounded-full rtl">
                  خصم {item.discountPercentage}%
                </div>
              )}
              {item.specialOffer && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs py-1 px-2 rounded-full rtl">
                  {t("exclusive_offer")}
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400 rtl">
                {item.category}
              </p>
              <h3 className="text-base font-medium mt-1 rtl">
                {item.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <div className="rtl">
                  <span className="font-bold text-morocco-turquoise">
                    {item.discountedPrice} {item.currency}
                  </span>
                  {item.originalPrice > item.discountedPrice && (
                    <span className="text-xs text-gray-500 line-through mr-2">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
                <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
