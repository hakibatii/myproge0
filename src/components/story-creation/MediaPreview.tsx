
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { X } from '@expo/vector-icons/Feather';

interface MediaPreviewProps {
  mediaPreview: string | null;
  isVideo: boolean;
  filterStyle: string;
  emojis: Array<{ id: string; emoji: string; x: number; y: number; size: number }>;
  onDeleteEmoji: (id: string) => void;
  onMoveEmoji: (id: string, x: number, y: number) => void;
}

const MediaPreview = ({
  mediaPreview,
  isVideo,
  filterStyle,
  emojis,
  onDeleteEmoji,
  onMoveEmoji
}: MediaPreviewProps) => {
  if (!mediaPreview) return null;

  return (
    <View style={styles.container}>
      {isVideo ? (
        <Video
          source={{ uri: mediaPreview }}
          style={[styles.media, { filter: filterStyle }]}
          resizeMode="contain"
          shouldPlay
          isLooping
        />
      ) : (
        <Image
          source={{ uri: mediaPreview }}
          style={[styles.media, { filter: filterStyle }]}
          resizeMode="contain"
        />
      )}

      {emojis.map((emojiItem) => (
        <View
          key={emojiItem.id}
          style={[styles.emojiContainer, { left: emojiItem.x, top: emojiItem.y }]}
        >
          <Text style={[styles.emoji, { fontSize: emojiItem.size }]}>
            {emojiItem.emoji}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteEmoji(emojiItem.id)}
          >
            <X size={12} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  media: {
    width: '100%',
    height: '100%'
  },
  emojiContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    color: '#FFFFFF'
  },
  deleteButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    backgroundColor: '#EF4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MediaPreview;
