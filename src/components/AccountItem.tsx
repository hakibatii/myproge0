
import { ChevronLeft } from "lucide-react";

interface AccountItemProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  onClick: () => void;
}

const AccountItem = ({ icon, title, value, onClick }: AccountItemProps) => {
  return (
    <button 
      className="flex items-center justify-between w-full p-4 border-b border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="text-morocco-turquoise mr-4">
          {icon}
        </div>
        <span className="font-medium rtl">{title}</span>
      </div>
      <div className="flex items-center">
        {value && <span className="text-gray-500 mr-2 rtl">{value}</span>}
        <ChevronLeft size={18} className="text-gray-400" />
      </div>
    </button>
  );
};

export default AccountItem;
