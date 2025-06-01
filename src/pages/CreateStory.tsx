
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { X } from '@expo/vector-icons/Feather';
import { useToast } from '@/hooks/use-toast';
import StoryFilters from '@/components/story-creation/StoryFilters';
import StoryAdjustments from '@/components/story-creation/StoryAdjustments';
import StoryEmojis, { EMOJIS } from '@/components/story-creation/StoryEmojis';
import StoryTools from '@/components/story-creation/StoryTools';
import MediaPreview from '@/components/story-creation/MediaPreview';
import MediaUploader from '@/components/story-creation/MediaUploader';
import StoryDiscardDialog from '@/components/story-creation/StoryDiscardDialog';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const FILTERS = [
  { name: "normal", label: "طبيعي" },
  { name: "grayscale", label: "رمادي", filter: "grayscale(1)" },
  { name: "sepia", label: "سيبيا", filter: "sepia(1)" },
  { name: "vintage", label: "قديم", filter: "sepia(0.4) brightness(0.9)" },
  { name: "blur", label: "ضبابي", filter: "blur(2px)" },
  { name: "contrast", label: "تباين", filter: "contrast(1.5)" },
  { name: "brightness", label: "سطوع", filter: "brightness(1.5)" },
];

const CreateStory = () => {
  const navigation = useNavigation();
  const { toast } = useToast();
  const [mediaFile, setMediaFile] = useState<string | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const [emojis, setEmojis] = useState<Array<{ id: string; emoji: string; x: number; y: number; size: number }>>([]);
  const [isDraggingEmoji, setIsDraggingEmoji] = useState<string | null>(null);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const filterStyle = `${FILTERS.find(f => f.name === selectedFilter)?.filter || ''} brightness(${brightness/100}) contrast(${contrast/100})`;

  const handleAddEmoji = (emoji: string) => {
    const centerX = screenWidth / 2 - 25;
    const centerY = screenHeight / 2 - 25;
    
    setEmojis([
      ...emojis,
      {
        id: `emoji-${Date.now()}`,
        emoji,
        x: centerX,
        y: centerY,
        size: 50
      }
    ]);
  };

  const handleDeleteEmoji = (id: string) => {
    setEmojis(emojis.filter(emoji => emoji.id !== id));
  };

  const moveEmoji = (id: string, x: number, y: number) => {
    setEmojis(emojis.map(emoji =>
      emoji.id === id ? { ...emoji, x, y } : emoji
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDiscardDialogOpen(true)}>
          <X size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>إنشاء قصة</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => {
            // Handle share logic
          }}
        >
          <Text style={styles.shareText}>مشاركة</Text>
        </TouchableOpacity>
      </View>

      <MediaPreview
        mediaPreview={mediaPreview}
        isVideo={isVideo}
        filterStyle={filterStyle}
        emojis={emojis}
        onDeleteEmoji={handleDeleteEmoji}
        onMoveEmoji={moveEmoji}
      />

      <View style={styles.tools}>
        <StoryTools
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          brightness={brightness}
          onBrightnessChange={setBrightness}
          contrast={contrast}
          onContrastChange={setContrast}
          onAddEmoji={handleAddEmoji}
        />
      </View>

      <StoryDiscardDialog
        isOpen={discardDialogOpen}
        onClose={() => setDiscardDialogOpen(false)}
        onDiscard={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  shareButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500'
  },
  tools: {
    padding: 16
  }
});

export default CreateStory;
