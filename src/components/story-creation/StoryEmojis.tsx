
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Slider from '@react-native-community/slider';

export const EMOJIS = ["😊", "❤️", "👍", "🔥", "⭐", "🎉", "😂", "👏", "🌹", "🤩"];

interface StoryEmojisProps {
  handleAddEmoji: (emoji: string) => void;
  emojis: Array<{ id: string; emoji: string; x: number; y: number; size: number }>;
  isDraggingEmoji: string | null;
  handleEmojiResize: (id: string, newSize: number) => void;
}

const StoryEmojis = ({ handleAddEmoji, emojis, isDraggingEmoji, handleEmojiResize }: StoryEmojisProps) => {
  const [isResizeModalVisible, setResizeModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.emojiGrid}>
        {EMOJIS.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={styles.emojiButton}
            onPress={() => handleAddEmoji(emoji)}
          >
            <Text style={styles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {emojis.length > 0 && isDraggingEmoji && (
        <TouchableOpacity 
          style={styles.resizeButton}
          onPress={() => setResizeModalVisible(true)}
        >
          <Text style={styles.resizeButtonText}>تغيير حجم الإيموجي</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={isResizeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تغيير حجم الإيموجي</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>صغير</Text>
                <Text style={styles.sliderLabel}>كبير</Text>
              </View>
              <Slider
                value={50}
                minimumValue={20}
                maximumValue={100}
                step={5}
                onValueChange={(value) => {
                  if (isDraggingEmoji) {
                    handleEmojiResize(isDraggingEmoji, value);
                  }
                }}
                minimumTrackTintColor="#00A4A6"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#00A4A6"
              />
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setResizeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16
  },
  emojiButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6'
  },
  emojiText: {
    fontSize: 24
  },
  resizeButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center'
  },
  resizeButtonText: {
    fontSize: 14,
    color: '#1F2937'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16
  },
  sliderContainer: {
    marginBottom: 16
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6B7280'
  },
  closeButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#00A4A6',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500'
  }
});

export default StoryEmojis;
