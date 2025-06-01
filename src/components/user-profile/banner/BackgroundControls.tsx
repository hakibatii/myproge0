
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ProfileBackgroundSelector from "../ProfileBackgroundSelector";
import { useToast } from "@/hooks/use-toast";

interface BackgroundControlsProps {
  background: string;
  onBackgroundChange: (newBackground: string) => void;
}

export const BackgroundControls: React.FC<BackgroundControlsProps> = ({
  background,
  onBackgroundChange
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      onBackgroundChange(`url(${imageUrl})`);
      
      toast({
        title: "تم تغيير الخلفية",
        description: "تم تغيير خلفية الملف الشخصي بنجاح",
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute bottom-2 right-2 flex space-x-2 rtl-space-x-reverse">
      <Button 
        size="sm" 
        variant="outline" 
        className="bg-white/20 border-white/30 backdrop-blur-sm text-white hover:bg-white/40"
        onClick={triggerFileInput}
      >
        <Upload size={14} className="mr-1" />
        <span className="rtl text-xs">تحميل صورة</span>
      </Button>
      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <ProfileBackgroundSelector 
        currentBackground={background}
        onBackgroundChange={onBackgroundChange}
      />
    </div>
  );
};
