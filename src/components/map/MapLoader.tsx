
interface MapLoaderProps {
  loading: boolean;
}

const MapLoader = ({ loading }: MapLoaderProps) => {
  if (!loading) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 z-10">
      <div className="flex flex-col items-center text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-morocco-turquoise mb-2"></div>
        <p className="rtl">جاري تحميل الخريطة...</p>
      </div>
    </div>
  );
};

export default MapLoader;
