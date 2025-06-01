
import React from "react";
import { Star } from "lucide-react";

interface UserInfoProps {
  name: string;
  city?: string;
  isVerified: boolean;
  rating: number;
}

export const UserInfo: React.FC<UserInfoProps> = ({ name, city, isVerified, rating }) => {
  return (
    <div className="ml-2 flex-1">
      <h2 className="text-xl font-bold text-white rtl">{name}</h2>
      <div className="flex items-center gap-2">
        <div className="bg-gray-800/30 px-2 py-1 rounded-md flex items-center">
          <Star size={14} className="text-morocco-gold" />
          <span className="text-white ml-1">{rating}</span>
        </div>
        {city && (
          <span className="bg-gray-800/30 px-2 py-1 rounded-md text-white text-xs rtl">
            {city}
          </span>
        )}
        {isVerified && (
          <span className="bg-gray-800/30 px-3 py-1 rounded-md text-white text-sm rtl">
            منظم رحلات
          </span>
        )}
      </div>
    </div>
  );
};
