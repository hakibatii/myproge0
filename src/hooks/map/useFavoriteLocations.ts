import { useState, useEffect } from 'react';
import { Location } from '@/types/map';
import { useToast } from "@/hooks/use-toast";

export const useFavoriteLocations = () => {
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
  const { toast } = useToast();
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteLocations');
      if (savedFavorites) {
        setFavoriteLocations(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);
  
  // Save to localStorage whenever favorites change
  const saveFavorites = (locations: Location[]) => {
    try {
      localStorage.setItem('favoriteLocations', JSON.stringify(locations));
      setFavoriteLocations(locations);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };
  
  // Add location to favorites
  const addToFavorites = (location: Location) => {
    // Check if already in favorites
    const exists = favoriteLocations.some(fav => fav.id === location.id);
    if (exists) {
      toast({
        title: "موجود بالفعل",
        description: `${location.name} موجود بالفعل في المفضلة`
      });
      return;
    }
    
    // Add to favorites
    const newFavorites = [...favoriteLocations, location];
    saveFavorites(newFavorites);
    
    toast({
      title: "تمت الإضافة للمفضلة",
      description: `تمت إضافة ${location.name} إلى المفضلة`
    });
  };
  
  // Remove location from favorites
  const removeFromFavorites = (locationId: string) => {
    const location = favoriteLocations.find(loc => loc.id === locationId);
    if (!location) return;
    
    const newFavorites = favoriteLocations.filter(loc => loc.id !== locationId);
    saveFavorites(newFavorites);
    
    toast({
      title: "تمت الإزالة",
      description: `تمت إزالة ${location.name} من المفضلة`
    });
  };
  
  // Check if location is favorited
  const isFavorite = (locationId: string): boolean => {
    return favoriteLocations.some(fav => fav.id === locationId);
  };
  
  return {
    favoriteLocations,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
