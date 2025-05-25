import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import AudioRecording from './inputs/AudioRecording';
import VirtualKeyboard from './inputs/VirtualKeyboard';
import PriceInput from './inputs/PriceInput';
import MessageInput from './inputs/MessageInput';
import EmojiPicker from './inputs/EmojiPicker';

interface ChatInputProps {
  online: boolean;
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  handleSendAudio: (audioBlob: Blob, duration: number) => void;
  handleSelectPaymentOption: (option: string) => void;
  translations?: {
    typeMessage: string;
    send: string;
  };
  currentUser?: {
    userType?: 'traveler' | 'organizer';
  };
  showEmojiPicker?: boolean;
  setShowEmojiPicker?: (show: boolean) => void;
  handleEmojiSelect?: (emoji: string) => void;
}

const ChatInput = ({
  online,
  message,
  setMessage,
  handleSendMessage,
  handleSendAudio,
  handleSelectPaymentOption,
  translations,
  currentUser,
  showEmojiPicker = false,
  setShowEmojiPicker = () => {},
  handleEmojiSelect = () => {},
}: ChatInputProps) => {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [readyToSendAudio, setReadyToSendAudio] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardLanguage, setKeyboardLanguage] = useState<'ar' | 'fr'>('ar');
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [price, setPrice] = useState('');
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tx = translations || {
    typeMessage: 'Type a message...',
    send: 'Send',
  };

  const isOrganizer = currentUser?.userType === 'organizer';

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSendMessage(e as unknown as React.FormEvent);
      }
    }
  };

  const handleKeyClick = (key: string) => {
    setMessage(message + key);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspace = () => {
    setMessage(message.slice(0, -1));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleKeyboardLanguage = () => {
    setKeyboardLanguage((prev) => (prev === 'ar' ? 'fr' : 'ar'));
  };

  const handleSendPrice = () => {
    if (price && isOrganizer) {
      handleSelectPaymentOption(`cash|${price}`);
      setPrice('');
      setShowPriceInput(false);
      toast({
        description: t('price_sent'),
      });
    }
  };

  const handleStartRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      toast({
        description: t(fileType === 'image' ? 'image_upload_success' : 'video_upload_success'),
      });
      event.target.value = '';
      const messageText = fileType === 'image' ? t('image_message') : t('video_message');
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      setMessage(messageText);
      handleSendMessage(fakeEvent);
    }
    setMediaOpen(false);
    setShowMediaOptions(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setShowMediaOptions(!showMediaOptions)}
        disabled={!online}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 transition"
      >
        {showMediaOptions && (
          <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-20 w-44">
            <button
              onClick={() => {
                setShowMediaOptions(false);
                alert('فتح الكاميرا - هنا تضيف وظيفة الكاميرا');
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              تصوير صورة
            </button>
            <button
              onClick={() => {
                setShowMediaOptions(false);
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              استيراد صورة/فيديو
            </button>
          </div>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileSelected}
      />

      <MessageInput
        online={online}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        handleStartRecording={handleStartRecording}
        inputRef={inputRef}
        setKeyboardVisible={setKeyboardVisible}
        mediaOpen={mediaOpen}
        setMediaOpen={setMediaOpen}
        isOrganizer={isOrganizer}
        setShowPriceInput={setShowPriceInput}
        handleSelectPaymentOption={handleSelectPaymentOption}
        translations={tx}
      />

      <button
        onClick={toggleEmojiPicker}
        disabled={!online}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </button>

      {currentUser?.userType === 'traveler' && (
        <div className="relative inline-block">
          <button
            onClick={() => setShowPaymentOptions(!showPaymentOptions)}
            className="p-2 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-700 dark:hover:bg-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-credit-card"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </button>
          {showPaymentOptions && (
            <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-20 w-44">
              <button
                onClick={() => {
                  handleSelectPaymentOption('الدفع عند اللقاء');
                  setShowPaymentOptions(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                الدفع عند اللقاء
              </button>
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
              >
                الدفع بالبطاقة (غير مفعل)
              </button>
            </div>
          )}
        </div>
      )}

      {showPriceInput && isOrganizer && (
        <PriceInput price={price} setPrice={setPrice} onSend={handleSendPrice} />
      )}

      {showEmojiPicker && (
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      <VirtualKeyboard
        keyboardVisible={keyboardVisible}
        keyboardLanguage={keyboardLanguage}
        setKeyboardVisible={setKeyboardVisible}
        toggleKeyboardLanguage={toggleKeyboardLanguage}
        handleKeyClick={handleKeyClick}
        handleBackspace={handleBackspace}
      />
    </div>
  );
};

export default ChatInput;