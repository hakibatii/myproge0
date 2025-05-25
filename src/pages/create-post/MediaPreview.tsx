
import { X } from "lucide-react";
import { MediaProps } from "./types";

const MediaPreview = ({ imagePreview, videoPreview, onClearImage, onClearVideo }: MediaProps) => {
  if (!imagePreview && !videoPreview) return null;
  
  return (
    <>
      {imagePreview && (
        <div className="relative mb-3 rounded-lg overflow-hidden">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
            onClick={onClearImage}
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      {videoPreview && (
        <div className="relative mb-3 rounded-lg overflow-hidden">
          <video
            src={videoPreview}
            controls
            className="w-full rounded-lg"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
            onClick={onClearVideo}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
};

export default MediaPreview;
