
import { useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface PriceInputProps {
  price: string;
  setPrice: (price: string) => void;
  setShowPriceInput: (show: boolean) => void;
  handleSendPrice: () => void;
}

const PriceInput = ({
  price,
  setPrice,
  setShowPriceInput,
  handleSendPrice
}: PriceInputProps) => {
  const { t } = useLanguage();
  const priceInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center space-x-2">
      <Input
        ref={priceInputRef}
        type="number"
        placeholder={t("type_price")}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="flex-1"
        autoFocus
      />
      <Button
        size="sm"
        onClick={() => setShowPriceInput(false)}
        variant="ghost"
      >
        <X className="h-5 w-5" />
      </Button>
      <Button
        size="sm"
        onClick={handleSendPrice}
        disabled={!price}
        className="bg-morocco-turquoise hover:bg-morocco-turquoise/90"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PriceInput;
