
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HashtagProps } from "./types";

const HashtagList = ({ hashtags, onRemove }: HashtagProps) => {
  if (hashtags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-3 rtl">
      {hashtags.map((tag) => (
        <Badge key={tag} className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center gap-1">
          #{tag}
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-700" 
            onClick={() => onRemove(tag)}
          >
            <X size={12} />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default HashtagList;
