
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHomePageState } from "@/hooks/useHomePageState";

// Import custom components
import PageHeader from "./create-post/PageHeader";
import HashtagList from "./create-post/HashtagList";
import MentionList from "./create-post/MentionList";
import LocationDisplay from "./create-post/LocationDisplay";
import MediaPreview from "./create-post/MediaPreview";
import ActionToolbar from "./create-post/ActionToolbar";
import NetworkWarning from "./create-post/NetworkWarning";
import { usePostCreation } from "./create-post/usePostCreation";
import { FileText, X } from "lucide-react";

const CreatePost = () => {
  const { t } = useLanguage();
  const { currentUser } = useHomePageState();
  const {
    online,
    content,
    setContent,
    textareaRef,
    imagePreview,
    videoPreview,
    file,
    fileName,
    hashtags,
    mentionedUsers,
    location,
    handleImageChange,
    handleVideoChange,
    handleFileChange,
    handleRemoveHashtag,
    handleRemoveMention,
    handleAddLocationPrompt,
    handleAddHashtagPrompt,
    handleAddMentionPrompt,
    clearImage,
    clearVideo,
    clearFile,
    clearLocation,
    handleSubmit,
    canSubmit
  } = usePostCreation();

  return (
    <div className="page-container pb-16">
      <PageHeader 
        isOnline={online} 
        canSubmit={canSubmit}
        onSubmit={handleSubmit} 
      />

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder={t("what_to_share_today")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none border-gray-200 dark:border-gray-700 rtl text-right min-h-[150px]"
            rows={5}
            ref={textareaRef}
          />
          
          <MediaPreview 
            imagePreview={imagePreview}
            videoPreview={videoPreview}
            onClearImage={clearImage}
            onClearVideo={clearVideo}
          />
          
          {file && fileName && (
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
          
          <HashtagList 
            hashtags={hashtags} 
            onRemove={handleRemoveHashtag} 
          />
          
          <MentionList 
            mentions={mentionedUsers} 
            onRemove={handleRemoveMention} 
          />
          
          <LocationDisplay 
            location={location} 
            onClear={clearLocation} 
          />
          
          <ActionToolbar
            onAddImage={handleImageChange}
            onAddVideo={handleVideoChange}
            onAddFile={handleFileChange}
            onAddLocation={handleAddLocationPrompt}
            onAddHashtag={handleAddHashtagPrompt}
            onAddMention={handleAddMentionPrompt}
            currentUser={currentUser}
          />
          
          <NetworkWarning isOnline={online} />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
