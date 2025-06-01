
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CommentsHeaderProps {
  title: string;
  onBack: () => void;
}

const CommentsHeader = ({ title, onBack }: CommentsHeaderProps) => {
  return (
    <div className="flex items-center p-4 border-b">
      <button onClick={onBack} className="mr-2">
        <ArrowRight className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-bold rtl">{title}</h1>
    </div>
  );
};

export default CommentsHeader;
