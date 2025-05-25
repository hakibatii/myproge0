
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AddStoryButtonProps {
  onClick: () => void;
}

const AddStoryButton = ({ onClick }: AddStoryButtonProps) => {
  const navigate = useNavigate();
  
  const handleAddStory = () => {
    // Call the parent's onClick handler first (for verification check)
    onClick();
    
    // Navigate to create story page if user is verified
    // This navigation will happen only if onClick doesn't prevent it
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.isVerified) {
        navigate("/create-story");
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center min-w-[65px]">
      {/* Reduced size of the button */}
      <button 
        onClick={handleAddStory} 
        className="relative w-14 h-14 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-800"
      >
        <PlusCircle size={22} className="text-morocco-turquoise" />
      </button>
      <span className="mt-0.5 text-xs rtl">إضافة</span>
    </div>
  );
};

export default AddStoryButton;
