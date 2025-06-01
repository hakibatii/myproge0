
export interface MediaFile {
  file: File | null;
  preview: string | null;
}

export interface HashtagProps {
  hashtags: string[];
  onRemove: (tag: string) => void;
}

export interface MentionProps {
  mentions: string[];
  onRemove: (user: string) => void;
}

export interface LocationProps {
  location: string;
  onClear: () => void;
}

export interface MediaProps {
  imagePreview: string | null;
  videoPreview: string | null;
  onClearImage: () => void;
  onClearVideo: () => void;
}
