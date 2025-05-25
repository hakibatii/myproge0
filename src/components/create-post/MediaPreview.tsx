
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { MediaPreviewProps } from './types';

const MediaPreview = ({ imagePreview, videoPreview, onClearImage, onClearVideo }: MediaPreviewProps) => {
  if (!imagePreview && !videoPreview) return null;
  
  return (
    <View style={styles.container}>
      {imagePreview && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: imagePreview }}
            style={styles.preview}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClearImage}
          >
            <Feather name="x" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
      
      {videoPreview && (
        <View style={styles.previewContainer}>
          <Video
            source={{ uri: videoPreview }}
            style={styles.preview}
            useNativeControls
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClearVideo}
          >
            <Feather name="x" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  previewContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  preview: {
    width: '100%',
    height: 192,
    borderRadius: 8,
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
});

export default MediaPreview;
