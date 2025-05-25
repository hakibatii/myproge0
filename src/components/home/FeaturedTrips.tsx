
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripCard from '../TripCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trip } from '@/components/user-profile/types';

export interface FeaturedTripsProps {
  title?: string; // Making the title optional
}

const FeaturedTrips = ({ title }: FeaturedTripsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock API fetch
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Mock data
      setTrips([
        {
          id: '1',
          image: 'https://images.unsplash.com/photo-1489749098374-a6677454b9b0',
          title: 'رحلة إلى مراكش القديمة',
          location: 'مراكش، المغرب',
          date: '15-20 أبريل',
          rating: 4.8,
          discountedPrice: 650,
          originalPrice: 850,
          currency: 'درهم',
          user: {
            id: 'user1',
            name: 'أحمد محمد',
            avatar: '/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png',
            isVerified: true,
            bio: '',
            background: '',
            phone: '',
            rating: 4.5,
            followersCount: 120,
            followingCount: 85
          }
        },
        {
          id: '2',
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada',
          title: 'استكشاف الصويرة',
          location: 'الصويرة، المغرب',
          date: '5-10 ماي',
          rating: 4.5,
          discountedPrice: 550,
          currency: 'درهم',
          user: {
            id: 'user2',
            name: 'سارة أحمد',
            avatar: '/lovable-uploads/2e26fab9-abc1-4d9d-9409-bde5d1908950.png',
            isVerified: true,
            bio: '',
            background: '',
            phone: '',
            rating: 4.7,
            followersCount: 230,
            followingCount: 112
          }
        },
        {
          id: '3',
          image: 'https://images.unsplash.com/photo-1562822367-e74e3f3ec731',
          title: 'جبال الأطلس',
          location: 'شفشاون، المغرب',
          date: '20-25 يونيو',
          rating: 4.9,
          discountedPrice: 750,
          originalPrice: 950,
          currency: 'درهم',
          user: {
            id: 'user3',
            name: 'محمد علي',
            avatar: '/lovable-uploads/4440a538-1312-41be-85aa-3fb734eeb69f.png',
            isVerified: false,
            bio: '',
            background: '',
            phone: '',
            rating: 4.2,
            followersCount: 89,
            followingCount: 65
          }
        }
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg rtl">{title || t("featured_trips")}</h2>
        <button 
          onClick={() => navigate('/trips')} 
          className="text-sm text-morocco-turquoise rtl"
        >
          {t("see_all")}
        </button>
      </div>
      
      {loading ? (
        <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-2 hide-scrollbar">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="min-w-[250px] h-[280px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-2 hide-scrollbar">
          {trips.map((trip) => (
            <div key={trip.id} className="min-w-[250px]">
              <TripCard 
                id={trip.id}
                image={trip.image}
                title={trip.title}
                location={trip.location}
                date={trip.date}
                rating={trip.rating}
                discountedPrice={trip.discountedPrice}
                originalPrice={trip.originalPrice}
                currency={trip.currency}
                user={trip.user}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedTrips;
