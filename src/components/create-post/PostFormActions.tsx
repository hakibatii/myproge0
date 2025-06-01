
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { PostFormActionsProps } from "./types";

const PostFormActions = ({ onCancel, postQuota, postsThisWeek }: PostFormActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xs text-gray-500 rtl">
        يمكنك نشر {postQuota - postsThisWeek} منشورات في الأسبوع
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white"
        >
          <Send size={16} className="ml-1" />
          <span className="rtl">نشر</span>
        </Button>
      </div>
    </div>
  );
};

export default PostFormActions;
