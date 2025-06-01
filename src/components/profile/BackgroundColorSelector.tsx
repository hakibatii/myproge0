
import React from "react";

interface BackgroundColorSelectorProps {
  colors: { name: string; value: string }[];
  currentBackground: string;
  onColorSelect: (color: string) => void;
}

const BackgroundColorSelector: React.FC<BackgroundColorSelectorProps> = ({
  colors,
  currentBackground,
  onColorSelect
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium rtl">الخلفية</label>
      <div className="grid grid-cols-7 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onColorSelect(color.value)}
            className={`w-full h-10 rounded-md ${color.value} ${currentBackground === color.value ? 'ring-2 ring-offset-2 ring-black dark:ring-white' : ''}`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundColorSelector;
