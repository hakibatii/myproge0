
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormHeaderProps {
  title: string;
  backLink: string;
}

const FormHeader = ({ title, backLink }: FormHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
      <button onClick={() => navigate(backLink)} className="mr-4">
        <ChevronRight className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-bold flex-1 rtl">{title}</h1>
    </div>
  );
};

export default FormHeader;
