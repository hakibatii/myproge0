
import { Paperclip, CreditCard, Image, Video, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface MediaActionsProps {
  mediaOpen: boolean;
  setMediaOpen: (open: boolean) => void;
  isOrganizer: boolean;
  online: boolean;
  setShowPriceInput: (show: boolean) => void;
  handleSelectPaymentOption: (option: string) => void;
  t: (key: string) => string;
}

const MediaActions = ({
  mediaOpen,
  setMediaOpen,
  isOrganizer,
  online,
  setShowPriceInput,
  handleSelectPaymentOption,
  t
}: MediaActionsProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleVideoUpload = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    
    if (file) {
      // In a real app, you'd upload the file to a server
      toast({
        description: t(type === 'image' ? "image_upload_success" : "video_upload_success"),
      });
      
      // Reset the input for future uploads
      event.target.value = '';
    }
    
    // Close the media menu
    setMediaOpen(false);
  };

  return (
    <>
      {mediaOpen && (
        <div className="flex items-center gap-2 mr-2 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-md animate-fade-in">
          {isOrganizer ? (
            // Prix pour les organisateurs
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-morocco-turquoise/10 hover:bg-morocco-turquoise/20 border-morocco-turquoise/30"
              onClick={() => setShowPriceInput(true)}
            >
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">{t("set_price")}</span>
            </Button>
          ) : (
            // Options de paiement pour les voyageurs - changées en boutons plus visibles
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-green-100 hover:bg-green-200 border-green-300 text-green-700"
                onClick={() => {
                  handleSelectPaymentOption('cash');
                  setMediaOpen(false);
                }}
              >
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">{t("payment_cash")}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-500 opacity-70"
                disabled={true}
                onClick={() => {
                  handleSelectPaymentOption('card');
                  setMediaOpen(false);
                }}
              >
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">{t("payment_card")}</span>
              </Button>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            disabled={!online}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border-slate-200"
            onClick={handleImageUpload}
          >
            <Image className="h-4 w-4" />
            <span className="text-xs">{t("image")}</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={!online}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border-slate-200"
            onClick={handleVideoUpload}
          >
            <Video className="h-4 w-4" />
            <span className="text-xs">{t("video")}</span>
          </Button>
          
          {/* Hidden file inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelected(e, 'image')}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileSelected(e, 'video')}
          />
        </div>
      )}
      
      <Button
        size="icon"
        variant="ghost"
        disabled={!online}
        className="h-7 w-7 rounded-full cursor-pointer"
        onClick={() => setMediaOpen(!mediaOpen)}
      >
        <Paperclip className="h-4 w-4" />
      </Button>
    </>
  );
};

export default MediaActions;
