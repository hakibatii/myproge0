import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { UpgradeFormData } from "./types";

interface IdDocumentsStepProps {
  formData: UpgradeFormData;
  updateFormData: (field: keyof UpgradeFormData, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const IdDocumentsStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}: IdDocumentsStepProps) => {
  const [previewFront, setPreviewFront] = useState<string | null>(null);
  const [previewBack, setPreviewBack] = useState<string | null>(null);

  useEffect(() => {
    if (formData.idFront) {
      setPreviewFront(URL.createObjectURL(formData.idFront));
    } else {
      setPreviewFront(null);
    }
  }, [formData.idFront]);

  useEffect(() => {
    if (formData.idBack) {
      setPreviewBack(URL.createObjectURL(formData.idBack));
    } else {
      setPreviewBack(null);
    }
  }, [formData.idBack]);

  const handleFileChange = (field: 'idFront' | 'idBack') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData(field, e.target.files[0]);
    }
  };

  const removeFile = (field: 'idFront' | 'idBack') => {
    updateFormData(field, null);
  };

  const isFormValid = () => {
    return formData.idFront && formData.idBack;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold rtl">صور البطاقة الوطنية</h2>
        <p className="text-sm text-gray-500 rtl">يرجى تحميل صورة واضحة للبطاقة الوطنية من الأمام والخلف</p>
      </div>
      
      <div className="space-y-4">
        {/* Front side */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center relative">
          {previewFront ? (
            <div className="flex flex-col items-center">
              <img src={previewFront} alt="صورة البطاقة من الأمام" className="w-40 h-28 object-cover rounded-md mb-2" />
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => removeFile('idFront')}
              >
                <Trash2 className="w-4 h-4" />
                حذف الصورة
              </Button>
            </div>
          ) : (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange('idFront')}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium rtl">صورة البطاقة من الأمام</p>
              </div>
            </label>
          )}
        </div>
        
        {/* Back side */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center relative">
          {previewBack ? (
            <div className="flex flex-col items-center">
              <img src={previewBack} alt="صورة البطاقة من الخلف" className="w-40 h-28 object-cover rounded-md mb-2" />
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => removeFile('idBack')}
              >
                <Trash2 className="w-4 h-4" />
                حذف الصورة
              </Button>
            </div>
          ) : (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange('idBack')}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium rtl">صورة البطاقة من الخلف</p>
              </div>
            </label>
          )}
        </div>
      </div>
      
      <div className="flex space-x-4 rtl-space-x-reverse">
        <Button
          onClick={prevStep}
          variant="outline"
          className="w-1/2"
        >
          السابق
        </Button>
        <Button
          onClick={nextStep}
          className="w-1/2 bg-morocco-gold hover:bg-morocco-gold/90 text-white"
          disabled={!isFormValid()}
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

export default IdDocumentsStep;
