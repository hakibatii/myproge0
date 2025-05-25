
import { Heart, Bookmark, MessageCircle, Share2, Flag, X, PlusCircle } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface TripCardDropdownProps {
  saved: boolean;
  user?: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  onSave: () => void;
  onMessage: () => void;
  onInterested: () => void;
  onNotInterested: () => void;
  onReport: () => void;
  onShare: () => void;
}

const TripCardDropdown = ({
  saved,
  user,
  onSave,
  onMessage,
  onInterested,
  onNotInterested,
  onReport,
  onShare,
}: TripCardDropdownProps) => {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem className="rtl cursor-pointer" onClick={onSave}>
        <Bookmark size={16} className="ml-2" />
        {saved ? 'إلغاء الحفظ' : 'حفظ الرحلة'}
      </DropdownMenuItem>
      
      {user && (
        <DropdownMenuItem className="rtl cursor-pointer" onClick={onMessage}>
          <MessageCircle size={16} className="ml-2" />
          إرسال رسالة إلى {user.name}
        </DropdownMenuItem>
      )}
      
      <DropdownMenuItem className="rtl cursor-pointer" onClick={onInterested}>
        <PlusCircle size={16} className="ml-2" />
        مهتم
      </DropdownMenuItem>
      
      <DropdownMenuItem className="rtl cursor-pointer" onClick={onNotInterested}>
        <X size={16} className="ml-2" />
        غير مهتم
      </DropdownMenuItem>
      
      <DropdownMenuItem className="rtl cursor-pointer" onClick={onReport}>
        <Flag size={16} className="ml-2" />
        إبلاغ عن الرحلة
      </DropdownMenuItem>
      
      <DropdownMenuItem className="rtl cursor-pointer" onClick={onShare}>
        <Share2 size={16} className="ml-2" />
        مشاركة
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default TripCardDropdown;
