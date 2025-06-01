
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface TripCardInfoProps {
  id: string;
  title: string;
  location: string;
  date: string;
  rating: number;
  originalPrice?: number;
  discountedPrice: number;
  currency: string;
}

const TripCardInfo = ({
  id,
  title,
  location,
  date,
  rating,
  originalPrice,
  discountedPrice,
  currency
}: TripCardInfoProps) => {
  return (
    <Link to={`/trip/${id}`} className="block">
      <h3 className="font-bold text-lg mb-1 rtl">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 rtl flex items-center">
        <span>{location}</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 rtl">{date}</p>
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-current text-yellow-500 stroke-none" />
          <span className="ml-1 font-medium text-sm">{rating}</span>
        </div>
        
        <div className="text-lg font-bold">
          <span className="rtl">{discountedPrice} {currency}</span>
          {originalPrice && originalPrice > discountedPrice && (
            <span className="text-gray-400 text-sm line-through mr-2 rtl">{originalPrice} {currency}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TripCardInfo;
