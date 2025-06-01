
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const usePostCreation = () => {
  const navigate = useNavigate();
  const [online, setOnline] = useState(navigator.onLine);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState("");
  const [location, setLocation] = useState("");
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [newMention, setNewMention] = useState("");
  
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If offline, show message
  useEffect(() => {
    if (!online) {
      toast({
        description: "انت غير متصل بالإنترنت، يرجى الاتصال بالإنترنت لنشر المحتوى",
        variant: "destructive"
      });
    }
  }, [online]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      // Reset video when setting image
      setVideo(null);
      setVideoPreview(null);
      toast({
        description: "تم إضافة الصورة بنجاح"
      });
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
      // Reset image when setting video
      setImage(null);
      setImagePreview(null);
      toast({
        description: "تم إضافة الفيديو بنجاح"
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      toast({
        description: `تم إضافة الملف ${selectedFile.name} بنجاح`
      });
    }
  };

  const handleAddHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleAddMention = () => {
    if (newMention.trim() && !mentionedUsers.includes(newMention.trim())) {
      setMentionedUsers([...mentionedUsers, newMention.trim()]);
      setNewMention("");
    }
  };

  const handleRemoveMention = (user: string) => {
    setMentionedUsers(mentionedUsers.filter((u) => u !== user));
  };
  
  const handleAddLocationPrompt = () => {
    const loc = prompt("أدخل موقعك:");
    if (loc) setLocation(loc);
  };
  
  const handleAddHashtagPrompt = () => {
    // Insert hashtag into textarea
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = textareaRef.current.value;
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      
      const updatedContent = `${beforeText}#${afterText}`;
      setContent(updatedContent);
      
      // Focus back to textarea with cursor after the #
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      }, 10);
    }
  };
  
  const handleAddMentionPrompt = () => {
    // Insert @ into textarea
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = textareaRef.current.value;
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      
      const updatedContent = `${beforeText}@${afterText}`;
      setContent(updatedContent);
      
      // Focus back to textarea with cursor after the @
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      }, 10);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  
  const clearVideo = () => {
    setVideo(null);
    setVideoPreview(null);
  };
  
  const clearFile = () => {
    setFile(null);
    setFileName(null);
  };
  
  const clearLocation = () => {
    setLocation("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!online) {
      toast({
        description: "انت غير متصل بالإنترنت، يرجى الاتصال بالإنترنت لنشر المحتوى",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim() && !image && !video && !file) {
      toast({
        description: "يجب كتابة محتوى أو إضافة صورة أو فيديو أو ملف للمنشور"
      });
      return;
    }

    // In a real app, send the post data to the server
    console.log("Post:", { content, image, video, file, fileName, hashtags, location, mentionedUsers });
    
    toast({
      description: "تم نشر المنشور بنجاح"
    });
    
    // Navigate back
    navigate('/home');
  };

  const canSubmit = Boolean(content.trim() || image || video || file);

  return {
    online,
    content,
    setContent,
    textareaRef,
    imagePreview,
    videoPreview,
    file,
    fileName,
    hashtags,
    newHashtag,
    setNewHashtag,
    location,
    mentionedUsers,
    newMention,
    setNewMention,
    handleImageChange,
    handleVideoChange,
    handleFileChange,
    handleAddHashtag,
    handleRemoveHashtag,
    handleAddMention,
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
  };
};
