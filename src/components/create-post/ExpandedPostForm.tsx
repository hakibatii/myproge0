
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "./types";
import HashtagDisplay from "./HashtagDisplay";
import MediaPreview from "./MediaPreview";
import MediaUpload from "./MediaUpload";
import HashtagInput from "./HashtagInput";
import PostFormActions from "./PostFormActions";
import { FileText, X } from "lucide-react";

interface ExpandedPostFormProps {
  user: User;
  content: string;
  setContent: (content: string) => void;
  imagePreview: string | null;
  videoPreview: string | null;
  fileName?: string | null;
  hashtags: string[];
  newHashtag: string;
  setNewHashtag: (value: string) => void;
  handleAddHashtag: () => void;
  handleRemoveHashtag: (tag: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  clearVideo: () => void;
  clearFile?: () => void;
  onCancel: () => void;
}

const ExpandedPostForm = ({
  user,
  content,
  setContent,
  imagePreview,
  videoPreview,
  fileName,
  hashtags,
  newHashtag,
  setNewHashtag,
  handleAddHashtag,
  handleRemoveHashtag,
  handleImageChange,
  handleVideoChange,
  handleFileChange,
  clearImage,
  clearVideo,
  clearFile,
  onCancel
}: ExpandedPostFormProps) => {
  // Only show verification badge for organizers with paid subscription or verified status
  const showVerificationBadge = user.isVerified && 
    (user.userType === 'organizer' && user.subscriptionTier && user.subscriptionTier !== 'free');

  return (
    <>
      <div className="flex items-start mb-3">
        <div className="relative">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {showVerificationBadge && (
            <Badge className="absolute -bottom-1 -right-1 h-4 w-4 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
              <span className="text-[8px] text-white">✓</span>
            </Badge>
          )}
        </div>
        <Textarea
          placeholder="شارك تجربتك مع المتابعين..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 resize-none border-gray-200 dark:border-gray-700 rtl text-right"
          rows={3}
        />
      </div>
      
      <MediaPreview 
        imagePreview={imagePreview}
        videoPreview={videoPreview}
        onClearImage={clearImage}
        onClearVideo={clearVideo}
      />
      
      {fileName && clearFile && (
        <div className="flex items-center gap-2 mb-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg rtl">
          <FileText size={20} className="text-blue-500" />
          <span className="text-sm flex-1">{fileName}</span>
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-700"
            onClick={clearFile}
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      <HashtagDisplay 
        hashtags={hashtags} 
        onRemove={handleRemoveHashtag} 
      />
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <MediaUpload 
            onImageChange={handleImageChange}
            onVideoChange={handleVideoChange}
            onAddFile={handleFileChange}
          />
          
          <HashtagInput 
            newHashtag={newHashtag}
            onNewHashtagChange={setNewHashtag}
            onAddHashtag={handleAddHashtag}
          />
        </div>
        
        <PostFormActions 
          onCancel={onCancel}
          postQuota={user.postQuota}
          postsThisWeek={user.postsThisWeek}
        />
      </div>
    </>
  );
};

export default ExpandedPostForm;
