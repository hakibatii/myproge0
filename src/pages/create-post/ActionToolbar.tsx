
import { Camera, Video, FileText, Hash, AtSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ActionToolbarProps {
  onAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddVideo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddLocation: () => void;
  onAddHashtag: () => void;
  onAddMention: () => void;
  currentUser?: {
    isVerified: boolean;
  };
}

const ActionToolbar = ({
  onAddImage,
  onAddVideo,
  onAddFile,
  onAddLocation,
  onAddHashtag,
  onAddMention,
  currentUser
}: ActionToolbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const isVerified = currentUser?.isVerified || false;
  
  const handleCreateTrip = () => {
    if (!isVerified) {
      toast({
        title: t("upgrade_needed"),
        description: t("upgrade_to_post_trips"),
        duration: 3000,
      });
      navigate('/upgrade-form');
      return;
    }
    navigate('/create-trip');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center rtl">
        <div className="flex gap-3">
          <label className="cursor-pointer text-gray-500 hover:text-morocco-turquoise">
            <Camera size={20} />
            <input type="file" className="hidden" accept="image/*" onChange={onAddImage} />
          </label>
          <label className="cursor-pointer text-gray-500 hover:text-morocco-turquoise">
            <Video size={20} />
            <input type="file" className="hidden" accept="video/*" onChange={onAddVideo} />
          </label>
          <label className="cursor-pointer text-gray-500 hover:text-morocco-turquoise">
            <FileText size={20} />
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onAddFile} />
          </label>
          <button 
            type="button" 
            className="text-gray-500 hover:text-morocco-turquoise"
            onClick={onAddLocation}
          >
            <MapPin size={20} />
          </button>
          <button 
            type="button" 
            className="text-gray-500 hover:text-morocco-turquoise"
            onClick={onAddHashtag}
          >
            <Hash size={20} />
          </button>
          <button 
            type="button" 
            className="text-gray-500 hover:text-morocco-turquoise"
            onClick={onAddMention}
          >
            <AtSign size={20} />
          </button>
        </div>
      </div>
      
      {/* Create post / Create trip buttons */}
      <div className="flex justify-center gap-3 mt-3">
        <Button 
          type="submit" 
          className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white py-2 px-4 rounded-full shadow-lg flex items-center"
        >
          <span className="rtl ml-1">{t("create_post") || "إنشاء منشور"}</span>
        </Button>
        
        <Button 
          type="button"
          className="bg-morocco-gold hover:bg-morocco-gold/90 text-white py-2 px-4 rounded-full shadow-lg flex items-center"
          onClick={handleCreateTrip}
        >
          <span className="rtl ml-1">{t("create_trip") || "إنشاء رحلة"}</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionToolbar;
