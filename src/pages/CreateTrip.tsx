
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Camera, Image, Video, MapPin, Send, Hash, X, AtSign, CalendarIcon, Clock, Globe, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [online, setOnline] = useState(navigator.onLine);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState("");

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If offline, show message
  useEffect(() => {
    if (!online) {
      toast({
        title: "انت غير متصل بالإنترنت",
        description: "يرجى الاتصال بالإنترنت لنشر المحتوى",
        variant: "destructive"
      });
    }
  }, [online, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!online) {
      toast({
        title: "انت غير متصل بالإنترنت",
        description: "يرجى الاتصال بالإنترنت لنشر المحتوى",
        variant: "destructive"
      });
      return;
    }
    
    if (!title.trim() || !description.trim() || !location.trim() || !startDate || !endDate || !price) {
      toast({
        title: "تنبيه",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    // In a real app, send the trip data to the server
    console.log("Trip:", { 
      title, 
      description, 
      image, 
      video,
      location,
      startDate,
      endDate,
      price,
      hashtags
    });
    
    toast({
      title: "تم النشر بنجاح",
      description: "تم نشر الرحلة بنجاح",
    });
    
    // Navigate back
    navigate('/home');
  };

  return (
    <div className="page-container pb-16">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="mr-4">
          <X className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">إنشاء رحلة جديدة</h1>
        <Button 
          type="button"
          onClick={handleSubmit}
          className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white"
          disabled={!online || !title.trim() || !description.trim() || !location.trim() || !startDate || !endDate || !price}
        >
          <Send size={16} className="ml-1" />
          <span className="rtl">نشر</span>
        </Button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="rtl">عنوان الرحلة</Label>
            <Input
              placeholder="أدخل عنوان الرحلة"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rtl text-right"
            />
          </div>

          <div className="space-y-2">
            <Label className="rtl">وصف الرحلة</Label>
            <Textarea
              placeholder="وصف تفصيلي للرحلة"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none border-gray-200 dark:border-gray-700 rtl text-right min-h-[100px]"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="rtl">الموقع</Label>
            <Input
              placeholder="مدينة، منطقة، بلد"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rtl text-right"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="rtl">تاريخ البداية</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rtl text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="rtl">تاريخ النهاية</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rtl text-right"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="rtl">السعر (بالدرهم)</Label>
            <Input
              type="number"
              placeholder="السعر بالدرهم"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rtl text-right"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="rtl">صورة الرحلة</Label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Image size={32} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 rtl">اضغط لإضافة صورة</span>
              </label>
              
              <label className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
                <Video size={32} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 rtl">اضغط لإضافة فيديو</span>
              </label>
            </div>
          </div>
          
          {imagePreview && (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          {videoPreview && (
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={videoPreview}
                controls
                className="w-full rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                onClick={() => {
                  setVideo(null);
                  setVideoPreview(null);
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="space-y-2">
            <Label className="rtl">هاشتاغ</Label>
            <div className="flex">
              <Input
                placeholder="أضف هاشتاغ للمدن المغربية"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                className="flex-1 rtl text-right"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHashtag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddHashtag}
                variant="outline" 
                className="mr-2"
              >
                إضافة
              </Button>
            </div>
            
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {hashtags.map((tag) => (
                  <Badge key={tag} className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center gap-1">
                    #{tag}
                    <button 
                      type="button" 
                      className="text-gray-500 hover:text-gray-700" 
                      onClick={() => handleRemoveHashtag(tag)}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {!online && (
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-md text-red-700 dark:text-red-300 flex items-center gap-2 rtl">
              <Globe size={18} />
              <span>أنت غير متصل بالإنترنت. لن تتمكن من النشر حتى تعود للاتصال.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
