
import { UserBadge as UserBadgeType } from "./types";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Crown, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserBadgeProps {
  badge: UserBadgeType;
  size?: 'sm' | 'md' | 'lg';
}

// New component for badge with avatar
interface BadgedAvatarProps {
  badge: UserBadgeType;
  avatar: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const getUserBadgeByTrips = (tripCount: number): UserBadgeType => {
  if (tripCount >= 15) {
    return {
      type: 'vip',
      color: 'bg-purple-600',
      label: 'VIP المسافر'
    };
  } else if (tripCount >= 10) {
    return {
      type: 'gold',
      color: 'bg-morocco-gold',
      label: 'المسافر الذهبي'
    };
  } else if (tripCount >= 5) {
    return {
      type: 'silver',
      color: 'bg-gray-400',
      label: 'المسافر الفضي'
    };
  } else {
    return {
      type: 'beginner',
      color: 'bg-morocco-turquoise',
      label: 'المسافر المبتدئ'
    };
  }
};

export const getPointsForNextBadge = (tripCount: number): number => {
  if (tripCount < 5) {
    return 5 - tripCount;
  } else if (tripCount < 10) {
    return 10 - tripCount;
  } else if (tripCount < 15) {
    return 15 - tripCount;
  } else {
    return 0; // Already at highest badge
  }
};

// Original badge component
const UserBadge = ({ badge, size = 'md' }: UserBadgeProps) => {
  const { t } = useLanguage();
  
  const getBadgeIcon = () => {
    switch (badge.type) {
      case 'vip':
        return <Crown className="mr-1" size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />;
      case 'gold':
        return <Award className="mr-1" size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />;
      case 'silver':
        return <Star className="mr-1" size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />;
      default:
        return <User className="mr-1" size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />;
    }
  };

  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge className={`${badge.color} text-white flex items-center ${sizeClasses[size]}`}>
            {getBadgeIcon()}
            <span className="rtl">{t(badge.type)}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="rtl">
          <p>فئة المستخدم: {t(badge.type)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// New component for avatar with badge ring
export const BadgedAvatar = ({ badge, avatar, name, size = 'md' }: BadgedAvatarProps) => {
  const { t } = useLanguage();
  
  const getBadgeColor = () => {
    switch (badge.type) {
      case 'vip':
        return 'from-purple-400 to-purple-700 border-purple-500';
      case 'gold':
        return 'from-yellow-300 to-amber-600 border-amber-500';
      case 'silver':
        return 'from-gray-300 to-gray-500 border-gray-400';
      default:
        return 'from-morocco-turquoise to-teal-600 border-teal-500';
    }
  };
  
  const getBadgeName = () => {
    const badgeName = t(badge.type);
    return badgeName;
  };
  
  const sizeClasses = {
    sm: {
      avatar: 'h-10 w-10',
      wrapper: 'h-12 w-12',
      label: 'text-[8px] top-0'
    },
    md: {
      avatar: 'h-14 w-14',
      wrapper: 'h-16 w-16',
      label: 'text-[10px] top-0'
    },
    lg: {
      avatar: 'h-20 w-20',
      wrapper: 'h-24 w-24',
      label: 'text-xs top-1'
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`relative ${sizeClasses[size].wrapper} flex items-center justify-center`}>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getBadgeColor()} animate-pulse opacity-70`}></div>
            <div className={`absolute inset-[3px] rounded-full bg-gradient-to-br ${getBadgeColor()} border-2 z-0`}></div>
            <Avatar className={`${sizeClasses[size].avatar} relative z-10 border-2 border-white dark:border-gray-800`}>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className={`absolute ${sizeClasses[size].label} left-0 right-0 mx-auto text-center bg-white dark:bg-gray-800 px-1 rounded-full font-bold z-20 text-transparent bg-clip-text bg-gradient-to-r ${getBadgeColor()}`}>
              {getBadgeName()}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="rtl">فئة المستخدم: {t(badge.type)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserBadge;
