
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const LocationSearch = ({ onSearch, isSearching }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="absolute top-4 right-16 left-4 z-30">
      <div className="flex w-full max-w-xl">
        <div className="relative flex-1">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن الأماكن..."
            className="pl-10 rtl pr-4 w-full shadow-md"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <Button 
          type="submit" 
          className="mr-2 bg-morocco-turquoise hover:bg-morocco-turquoise/90"
          disabled={isSearching || !searchQuery.trim()}
        >
          {isSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            "بحث"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LocationSearch;
