
import { Button } from "@/components/ui/button";
import CreatePost from "@/components/CreatePost";
import { User } from "@/hooks/useHomePageState";
import { useNavigate } from "react-router-dom";

interface CreatePostSectionProps {
  currentUser: User;
}

const CreatePostSection = ({ currentUser }: CreatePostSectionProps) => {
  const navigate = useNavigate();

  // Redirect to create post page when clicked
  const handleCreatePostRedirect = () => {
    navigate('/create-post');
  };

  return <CreatePost user={currentUser} onPostBoxClick={handleCreatePostRedirect} />;
};

export default CreatePostSection;
