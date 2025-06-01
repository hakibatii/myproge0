
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MentionProps } from "./types";

const MentionList = ({ mentions, onRemove }: MentionProps) => {
  if (mentions.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-3 rtl">
      {mentions.map((user) => (
        <Badge key={user} className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center gap-1">
          @{user}
          <button 
            type="button" 
            className="text-blue-500 hover:text-blue-700" 
            onClick={() => onRemove(user)}
          >
            <X size={12} />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default MentionList;
