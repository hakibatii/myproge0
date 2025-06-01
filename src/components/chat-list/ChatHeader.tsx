
import { Plus, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onFindUsers: () => void;
  onCreateGroup: () => void;
}

const ChatHeader = ({ onFindUsers, onCreateGroup }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <h1 className="text-xl font-bold rtl">المحادثات</h1>
      <div className="flex space-x-2 rtl:space-x-reverse">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onFindUsers}
          className="rounded-full"
        >
          <UserPlus size={20} />
        </Button>
        <Button 
          variant="default" 
          size="icon" 
          onClick={onCreateGroup}
          className="rounded-full bg-morocco-turquoise hover:bg-morocco-turquoise/90"
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
