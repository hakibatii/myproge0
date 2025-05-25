
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VirtualKeyboardProps {
  keyboardVisible: boolean;
  keyboardLanguage: 'ar' | 'fr';
  setKeyboardVisible: (visible: boolean) => void;
  toggleKeyboardLanguage: () => void;
  handleKeyClick: (key: string) => void;
  handleBackspace: () => void;
}

const VirtualKeyboard = ({
  keyboardVisible,
  keyboardLanguage,
  setKeyboardVisible,
  toggleKeyboardLanguage,
  handleKeyClick,
  handleBackspace
}: VirtualKeyboardProps) => {
  // Arabic and French keyboard layouts
  const arabicKeys = [
    'ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د',
    'ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'ئ',
    'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ', 'ذ'
  ];

  const frenchKeys = [
    'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
    'w', 'x', 'c', 'v', 'b', 'n', 'é', 'è', 'ê', 'à',
    'ù', 'ç', 'ô', 'î'
  ];

  const currentKeys = keyboardLanguage === 'ar' ? arabicKeys : frenchKeys;

  if (!keyboardVisible) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between mb-2 items-center">
        <button
          onClick={toggleKeyboardLanguage}
          className="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded shadow-sm"
        >
          {keyboardLanguage === 'ar' ? 'العربية' : 'Français'}
        </button>
        <button
          onClick={() => setKeyboardVisible(false)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-8 gap-1">
        {currentKeys.map((key) => (
          <button
            key={key}
            className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
            onClick={() => handleKeyClick(key)}
            type="button"
          >
            {key}
          </button>
        ))}
      </div>
      
      <div className="flex mt-1 gap-1">
        <button
          className="p-2 flex-1 bg-white dark:bg-gray-700 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
          onClick={() => handleKeyClick(' ')}
          type="button"
        >
          Space
        </button>
        <button
          className="p-2 w-16 bg-white dark:bg-gray-700 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
          onClick={handleBackspace}
          type="button"
        >
          ←
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
