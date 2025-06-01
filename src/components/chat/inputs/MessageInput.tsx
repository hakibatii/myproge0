
import { useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MediaActions from './MediaActions';
import { useLanguage } from '@/contexts/LanguageContext';

interface MessageInputProps {
  online: boolean;
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleStartRecording: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  setKeyboardVisible: (visible: boolean) => void;
  mediaOpen: boolean;
  setMediaOpen: (open: boolean) => void;
  isOrganizer: boolean;
  setShowPriceInput: (show: boolean) => void;
  handleSelectPaymentOption: (option: string) => void;
  translations: {
    typeMessage: string;
    send?: string; // Make send optional
  };
}

const MessageInput = ({
  online,
  message,
  setMessage,
  handleSendMessage,
  handleKeyPress,
  handleStartRecording,
  inputRef,
  setKeyboardVisible,
  mediaOpen,
  setMediaOpen,
  isOrganizer,
  setShowPriceInput,
  handleSelectPaymentOption,
  translations
}: MessageInputProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden pr-2">
      {/* Mic button */}
      <Button
        className="p-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full"
        size="icon"
        disabled={!online}
        onClick={handleStartRecording}
        title={t("recording")}
      >
        <Mic className="h-5 w-5" />
      </Button>

      {/* Input field */}
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          placeholder={translations.typeMessage}
          className="w-full py-2 px-2 focus:outline-none focus:ring-0 border-0 bg-transparent text-right"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!online}
          onFocus={() => setKeyboardVisible(true)}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
          <MediaActions 
            mediaOpen={mediaOpen} 
            setMediaOpen={setMediaOpen} 
            isOrganizer={isOrganizer} 
            online={online} 
            setShowPriceInput={setShowPriceInput} 
            handleSelectPaymentOption={handleSelectPaymentOption}
            t={t}
          />
        </div>
      </div>
      
      {/* Send button - only show if there is text */}
      {message.trim() && (
        <Button
          className="ml-2 rounded-full bg-morocco-turquoise hover:bg-morocco-turquoise/90 p-2 h-8 w-8 flex items-center justify-center"
          size="icon"
          type="submit"
          disabled={!online}
          onClick={(e) => handleSendMessage(e)}
          title={translations.send || t("send")}
        >
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default MessageInput;
