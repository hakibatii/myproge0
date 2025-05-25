
import React from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileHeaderSectionProps {
  avatar: string;
  name: string;
  background: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBackgroundChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeaderSection: React.FC<ProfileHeaderSectionProps> = ({
  avatar,
  name,
  background,
  onAvatarChange,
  onBackgroundChange
}) => {
  const { t } = useLanguage();
  const avatarRef = React.useRef<HTMLInputElement>(null);
  const backgroundRef = React.useRef<HTMLInputElement>(null);
  
  // Determine background style based on the format of background value
  const backgroundStyle = background 
    ? background.startsWith('url(') 
      ? { backgroundImage: background } 
      : background.startsWith('data:') || background.includes('/')
        ? { backgroundImage: `url(${background})` }
        : { background: background }
    : { background: 'linear-gradient(45deg, #1E3A8A, #7E22CE)' }; // Default gradient
  
  const openAvatarPicker = () => {
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const openBackgroundPicker = () => {
    if (backgroundRef.current) {
      backgroundRef.current.click();
    }
  };

  return (
    <div className="relative">
      {/* Background Image - increased height for better visibility */}
      <div 
        className="w-full h-48 bg-cover bg-center relative rounded-lg overflow-hidden"
        style={backgroundStyle}
      >
        {/* Background Change Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 bottom-2 bg-black/20 hover:bg-black/40 text-white"
          onClick={openBackgroundPicker}
        >
          <Upload size={16} className="mr-1" />
          <span className="text-xs rtl">{t("change_background")}</span>
        </Button>
        <input 
          ref={backgroundRef}
          type="file" 
          accept="image/*" 
          onChange={onBackgroundChange} 
          className="hidden" 
        />
      </div>
      
      {/* Profile Avatar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          {/* Avatar Change Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-morocco-turquoise text-white hover:bg-morocco-turquoise/90"
            onClick={openAvatarPicker}
          >
            <Camera size={16} />
          </Button>
          <input 
            ref={avatarRef}
            type="file" 
            accept="image/*" 
            onChange={onAvatarChange} 
            className="hidden" 
          />
        </div>
      </div>
      
      {/* Spacer for content following the header */}
      <div className="h-12"></div>
    </div>
  );
};

export default ProfileHeaderSection;
