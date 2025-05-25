
import { MessageSquare, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyChatStateProps {
  onFindUsers: () => void;
  activeTab: string;
}

const EmptyChatState = ({ onFindUsers, activeTab }: EmptyChatStateProps) => {
  return (
    <div className="text-center py-10 text-gray-500 rtl">
      <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-2" />
      <p>لا توجد محادثات {activeTab === "unread" ? "غير مقروءة" : ""}</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onFindUsers}
      >
        <UserPlus size={16} className="mr-2" />
        <span className="rtl">البحث عن أصدقاء</span>
      </Button>
    </div>
  );
};

export default EmptyChatState;
