
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker = ({ onEmojiSelect, onClose }: EmojiPickerProps) => {
  const { t } = useLanguage();
  
  // Common emojis used in chat
  const emojis = [
    '😊', '😂', '😍', '🥰', '😘', '😎', '😇', 
    '🤔', '😳', '😱', '😭', '😢', '😡', '🥺',
    '👍', '👎', '❤️', '🔥', '🎉', '👏', '🙏',
    '💪', '✨', '🌹', '🌞', '🌙', '🤝', '👋',
    '🎁', '🎈', '🎂', '🍕', '🍦', '🍷', '☕'
  ];

  return (
    <div className="absolute bottom-16 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64 max-h-48 overflow-y-auto z-10">
      <div className="flex justify-between items-center mb-2 border-b pb-1">
        <h4 className="text-sm font-medium">{t("emojis")}</h4>
        <button 
          onClick={onClose}
          className="text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1"
        >
          {t("close")}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(emoji)}
            className="p-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
