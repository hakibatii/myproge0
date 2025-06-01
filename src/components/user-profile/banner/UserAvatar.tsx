
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import { getUserBadgeByTrips, BadgedAvatar } from "../UserBadge";

interface UserAvatarProps {
  avatar: string;
  name: string;
  isVerified: boolean;
  tripCount?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  avatar, 
  name, 
  isVerified, 
  tripCount 
}) => {
  const badge = tripCount ? getUserBadgeByTrips(tripCount) : undefined;

  if (badge) {
    return (
      <BadgedAvatar
        badge={badge}
        avatar={avatar}
        name={name}
        size="md"
      />
    );
  }

  return (
    <div className="relative">
      <Avatar className="h-16 w-16 border-2 border-white">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
        {isVerified && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
        )}
      </Avatar>
    </div>
  );
};
