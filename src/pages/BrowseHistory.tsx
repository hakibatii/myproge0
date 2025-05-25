
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HistoryItem {
  id: string;
  title: string;
  type: 'city' | 'trip' | 'profile';
  timestamp: string;
  imageUrl?: string;
}

const BrowseHistory = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Mock data - in a real app, fetch from API
  const [history, setHistory] = useState<HistoryItem[]>([
    { 
      id: '1', 
      title: 'مراكش', 
      type: 'city', 
      timestamp: 'منذ يومين',
      imageUrl: 'https://images.unsplash.com/photo-1539020140153-e8c237112187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    { 
      id: '2', 
      title: 'جولة في مدينة مراكش', 
      type: 'trip', 
      timestamp: 'منذ 3 أيام',
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80'
    },
    { 
      id: '3', 
      title: 'فاطمة السيد', 
      type: 'profile', 
      timestamp: 'منذ أسبوع',
    },
  ]);

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleRemoveItem = (itemId: string) => {
    setHistory(history.filter(item => item.id !== itemId));
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("browse_history")}</h1>
        {history.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearHistory} 
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} className="mr-1" />
            <span className="rtl">{t("clear_all")}</span>
          </Button>
        )}
      </div>

      <div className="p-4">
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="h-16 w-16 object-cover rounded-lg mr-4" 
                    />
                  )}
                  {!item.imageUrl && item.type === 'profile' && (
                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">{item.title[0]}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium rtl">{item.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className={`
                        px-2 py-0.5 rounded text-xs mr-2
                        ${item.type === 'city' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' : ''}
                        ${item.type === 'trip' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : ''}
                        ${item.type === 'profile' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300' : ''}
                      `}>
                        {item.type === 'city' ? t("city") : item.type === 'trip' ? t("trip") : t("user_profile")}
                      </span>
                      <span className="rtl">{item.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveItem(item.id)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500 dark:text-gray-400 rtl">{t("no_browse_history")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseHistory;
