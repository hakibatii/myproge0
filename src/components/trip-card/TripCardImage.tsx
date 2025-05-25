
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface TripCardImageProps {
  id: string;
  image: string;
  user?: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  openDropdownMenu: () => void;
}

const TripCardImage = ({ id, image, user, openDropdownMenu }: TripCardImageProps) => {
  return (
    <div className="relative">
      <img src={image} alt={`Trip ${id}`} className="w-full h-48 object-cover" />
      {user && (
        <Link to={`/profile/${user.name}`} className="absolute top-2 right-2 flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full px-2 py-1">
          <div className="relative">
            <Avatar className="h-6 w-6 mr-1">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            {user.isVerified && (
              <Badge className="absolute -bottom-1 -right-1 h-3 w-3 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
                <span className="text-[6px] text-white">✓</span>
              </Badge>
            )}
          </div>
          <span className="text-xs rtl">{user.name}</span>
        </Link>
      )}
      <div className="absolute top-2 left-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                openDropdownMenu();
              }}
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TripCardImage;
