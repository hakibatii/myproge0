
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ChatSearchBar = ({ searchQuery, setSearchQuery }: ChatSearchBarProps) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
      <Input
        placeholder="البحث..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 rtl text-right"
      />
    </div>
  );
};

export default ChatSearchBar;
