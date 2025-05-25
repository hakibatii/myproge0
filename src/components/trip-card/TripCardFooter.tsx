
import { useNavigate } from "react-router-dom";
import { MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentButton from "@/components/comments/CommentButton";

interface TripCardFooterProps {
  id: string;
  title: string;
  image: string;
  description: string;
  user?: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  onMessage: () => void;
  onShare: () => void;
}

const TripCardFooter = ({
  id,
  title,
  image,
  description,
  user,
  onMessage,
  onShare,
}: TripCardFooterProps) => {
  const navigate = useNavigate();
  
  const handleUserClick = () => {
    if (!user) return;
    navigate(`/profile/${user.name}`);
  };

  return (
    <div className="flex justify-between items-center mt-3">
      {/* User info */}
      {user ? (
        <div 
          className="flex items-center cursor-pointer"
          onClick={handleUserClick}
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium rtl">{user.name}</p>
        </div>
      ) : (
        <div className="w-8"></div> // Spacer
      )}
      
      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <CommentButton
          contentId={id}
          contentType="trip"
          commentsCount={0}
          title={title}
          contentPreview={description}
          contentImage={image}
          userName={user?.name}
          userAvatar={user?.avatar}
          userIsVerified={user?.isVerified}
          className="text-gray-600 hover:text-morocco-turquoise transition-colors"
        />
        
        <button 
          onClick={onShare}
          className="text-gray-600 hover:text-morocco-turquoise transition-colors"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TripCardFooter;
