
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const DescriptionEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [description, setDescription] = useState("");
  const maxLength = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setDescription(text);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send the updated description to the server
    console.log("Updated description:", description);
    toast({
      title: t("description_updated"),
      description: t("changes_saved_successfully"),
    });
    navigate("/account");
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("personal_description")}</h1>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium rtl">{t("write_about_yourself")}</label>
            <Textarea 
              value={description} 
              onChange={handleChange} 
              className="h-40 rtl text-right"
              placeholder={t("write_here")}
            />
            <div className="text-sm text-right">
              {description.length} / {maxLength}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white"
          >
            {t("save_changes")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DescriptionEdit;
