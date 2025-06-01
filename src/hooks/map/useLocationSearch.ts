import { useState } from 'react';
import { Location } from "@/types/map";
import { mockLocations } from './mockLocations';
import { useToast } from "@/hooks/use-toast";

// In a real app, this would connect to a real geocoding API
// We're simulating search with mock data for demonstration
export const useLocationSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const { toast } = useToast();

  const searchLocations = (query: string) => {
    setIsSearching(true);
    
    // Simulate API request delay
    setTimeout(() => {
      // Simple search against our mock data
      // In a real app, this would call a geocoding API like Mapbox Geocoding API
      const results = mockLocations.filter(location => 
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast({
          title: "لا توجد نتائج",
          description: `لم يتم العثور على أي مكان باسم "${query}"`,
        });
      } else {
        toast({
          title: "تم العثور على نتائج",
          description: `تم العثور على ${results.length} أماكن`,
        });
      }
    }, 800); // Simulate network delay
  };
  
  return {
    isSearching,
    searchResults,
    searchLocations,
    clearSearchResults: () => setSearchResults([])
  };
};

