
import { useLanguage } from "@/contexts/LanguageContext";
import SearchBar from "@/components/SearchBar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of beautiful Moroccan city images
  const moroccanCities = [
    {
      url: "https://images.unsplash.com/photo-1539020140153-e8c237112187?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      name: "مراكش"
    },
    {
      url: "https://images.unsplash.com/photo-1489749098374-a6677454b9b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      name: "شفشاون"
    },
    {
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      name: "الصويرة"
    }
  ];
  
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % moroccanCities.length
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative h-72 mb-6 overflow-hidden rounded-xl">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {moroccanCities.map((city, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <img
                  src={city.url}
                  alt={`Morocco - ${city.name}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {city.name}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h1 className="text-3xl font-bold mb-1 rtl">{t("discover_morocco_beauty")}</h1>
        <p className="text-sm mb-4 rtl">{t("special_trips_moroccan_cities")}</p>
        <div className="relative">
          <SearchBar 
            placeholder={t("search_placeholder")} 
            className="shadow-lg" 
            showFilter={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
