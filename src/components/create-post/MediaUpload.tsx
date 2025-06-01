
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MediaUploadProps } from './types';

interface ExtendedMediaUploadProps extends MediaUploadProps {
  onAddFile?: () => void;
}

const MediaUpload = ({ 
  onImageChange, 
  onVideoChange, 
  onAddFile 
}: ExtendedMediaUploadProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={onImageChange}
      >
        <Feather name="image" size={20} color="#6B7280" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={onVideoChange}
      >
        <Feather name="video" size={20} color="#6B7280" />
      </TouchableOpacity>

      {onAddFile && (
        <TouchableOpacity 
          style={styles.button}
          onPress={onAddFile}
        >
          <Feather name="file-text" size={20} color="#6B7280" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button}>
        <Feather name="camera" size={20} color="#6B7280" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Feather name="map-pin" size={20} color="#6B7280" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Feather name="hash" size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
});

export default MediaUpload;
