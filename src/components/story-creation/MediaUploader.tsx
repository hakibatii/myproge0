
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaUploaderProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaUploader = ({ handleFileChange }: MediaUploaderProps) => {
  const { toast } = useToast();

  const handleCaptureFromCamera = () => {
    // In a real implementation, this would trigger the device camera
    toast({
      title: "تنبيه",
      description: "سيتم تفعيل هذه الميزة قريبًا",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-10 h-[60vh]">
      <div className="space-y-4 text-center">
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col items-center">
            <label className="cursor-pointer p-4 bg-morocco-turquoise text-white rounded-full mb-2">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload size={24} />
            </label>
            <span className="text-sm rtl">تحميل</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="p-4 bg-morocco-turquoise text-white rounded-full mb-2"
              onClick={handleCaptureFromCamera}
            >
              <Camera size={24} />
            </button>
            <span className="text-sm rtl">التقاط</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 rtl">اختر صورة أو فيديو لإضافته إلى قصتك</p>
      </div>
    </div>
  );
};

export default MediaUploader;
