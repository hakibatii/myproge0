
import { useEffect } from "react";

/**
 * This component loads the Mapbox CSS dynamically to avoid import issues
 */
const MapboxStyles = () => {
  useEffect(() => {
    // Check if the stylesheet already exists to prevent duplicates
    const existingLink = document.querySelector('link[href*="mapbox-gl"]');
    if (existingLink) return;
    
    // Dynamically create a link element to load the CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
    
    // Add it to the document head
    document.head.appendChild(link);
    
    // Clean up when component unmounts
    return () => {
      const linkToRemove = document.querySelector('link[href*="mapbox-gl"]');
      if (linkToRemove && linkToRemove.parentNode) {
        linkToRemove.parentNode.removeChild(linkToRemove);
      }
    };
  }, []);
  
  return null;
};

export default MapboxStyles;
