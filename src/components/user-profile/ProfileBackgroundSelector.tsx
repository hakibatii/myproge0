
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Upload } from "lucide-react";

interface ProfileBackgroundSelectorProps {
  currentBackground: string;
  onBackgroundChange: (background: string) => void;
}

const ProfileBackgroundSelector = ({ currentBackground, onBackgroundChange }: ProfileBackgroundSelectorProps) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(currentBackground);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const backgroundOptions = [
    "#1E3A8A", // Default blue
    "#047857", // Green
    "#7E22CE", // Purple
    "#B91C1C", // Red
    "#C2410C", // Orange
    "#1F2937", // Dark gray
    "linear-gradient(45deg, #1E3A8A, #7E22CE)", // Blue to Purple
    "linear-gradient(45deg, #047857, #1E3A8A)", // Green to Blue
    "linear-gradient(45deg, #B91C1C, #7E22CE)", // Red to Purple
  ];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result as string;
          setUploadedImage(imageUrl);
          setSelectedBackground(`url(${imageUrl})`);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveBackground = () => {
    onBackgroundChange(selectedBackground);
    toast({
      title: "تم",
      description: "تم تغيير خلفية الملف الشخصي",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute bottom-3 right-3 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors">
          <Camera size={20} className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="rtl">
        <DialogHeader>
          <DialogTitle>تغيير خلفية الملف الشخصي</DialogTitle>
        </DialogHeader>
        
        {/* Image upload section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 rtl">تحميل صورة خلفية</label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium rtl">اختر صورة للخلفية</p>
                {uploadedImage && <p className="text-xs text-green-500 mt-1">تم تحميل الصورة</p>}
              </div>
            </label>
          </div>
          {uploadedImage && (
            <div className="mt-2">
              <p className="text-sm mb-2">معاينة:</p>
              <div 
                className="h-24 rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${uploadedImage})` }}
              />
            </div>
          )}
        </div>
        
        <div className="my-4">
          <p className="text-sm font-medium mb-2">أو اختر لون</p>
          <div className="grid grid-cols-3 gap-3">
            {backgroundOptions.map((bg, index) => (
              <div 
                key={index}
                onClick={() => setSelectedBackground(bg)}
                style={{ background: bg }}
                className={`h-16 rounded-md cursor-pointer transition-all ${
                  selectedBackground === bg ? "ring-2 ring-white ring-offset-2 ring-offset-morocco-turquoise" : ""
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveBackground}>
            حفظ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBackgroundSelector;
