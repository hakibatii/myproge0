
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

interface StoryAvatarProps {
  userAvatar: string;
  userName: string;
  isVerified: boolean;
  onClick: () => void;
}

const StoryAvatar = ({ userAvatar, userName, isVerified, onClick }: StoryAvatarProps) => {
  return (
    <button 
      onClick={onClick}
      className="relative w-16 h-16 rounded-full border-2 border-morocco-turquoise p-[2px]"
    >
      <Avatar className="w-full h-full">
        <AvatarImage src={userAvatar} alt={userName} className="object-cover" />
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>
      {isVerified && (
        <div className="absolute -top-1 -left-1 h-5 w-5 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
          <Check size={12} className="text-white" />
        </div>
      )}
    </button>
  );
};

export default StoryAvatar;
