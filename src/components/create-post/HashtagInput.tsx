
import { Button } from "@/components/ui/button";
import { HashtagInputProps } from "./types";

const HashtagInput = ({ newHashtag, onNewHashtagChange, onAddHashtag }: HashtagInputProps) => {
  return (
    <div className="flex-1 ml-2 rtl">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="أضف هاشتاغ للمدن المغربية"
          value={newHashtag}
          onChange={(e) => onNewHashtagChange(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-right text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onAddHashtag();
            }
          }}
        />
        <Button
          type="button"
          variant="ghost" 
          size="sm"
          className="ml-1"
          onClick={onAddHashtag}
        >
          <span className="rtl">إضافة</span>
        </Button>
      </div>
    </div>
  );
};

export default HashtagInput;
