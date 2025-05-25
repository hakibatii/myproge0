
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight, X } from '@expo/vector-icons/Feather';
import { Story } from '@/types/story';
import StoryReactions from './StoryReactions';
import StoryProgress from './StoryProgress';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface StoryViewerProps {
  story: Story | undefined;
  currentStoryIndex: number;
  totalStories: number;
  selectedReaction: string | null;
  handlePrevStory: () => void;
  handleNextStory: () => void;
  handleReaction: (reaction: string) => void;
  onClose: () => void;
}

const StoryViewer = ({
  story,
  currentStoryIndex,
  totalStories,
  selectedReaction,
  handlePrevStory,
  handleNextStory,
  handleReaction,
  onClose,
}: StoryViewerProps) => {
  if (!story) return null;

  return (
    <View style={styles.container}>
      {/* Story header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: story.userAvatar }}
            style={styles.avatar}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>{story.userName}</Text>
            <Text style={styles.timestamp}>{story.createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Story content */}
      <Image 
        source={{ uri: story.image }}
        style={styles.storyImage}
        resizeMode="cover"
      />
      
      {/* Navigation buttons */}
      <TouchableOpacity 
        style={[styles.navButton, styles.leftNav]}
        onPress={handlePrevStory}
        disabled={currentStoryIndex === 0}
      >
        <ChevronLeft size={32} color="#FFFFFF" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navButton, styles.rightNav]}
        onPress={handleNextStory}
        disabled={currentStoryIndex === totalStories - 1}
      >
        <ChevronRight size={32} color="#FFFFFF" />
      </TouchableOpacity>
      
      {/* Progress indicator */}
      <StoryProgress 
        currentStoryIndex={currentStoryIndex} 
        totalStories={totalStories} 
      />
      
      {/* Emoji reactions */}
      <StoryReactions 
        story={story} 
        selectedReaction={selectedReaction} 
        handleReaction={handleReaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8
  },
  userTextContainer: {
    justifyContent: 'center'
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500'
  },
  timestamp: {
    color: '#E5E7EB',
    fontSize: 12
  },
  storyImage: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    top: 0,
    left: 0
  },
  navButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  leftNav: {
    left: 0
  },
  rightNav: {
    right: 0
  }
});

export default StoryViewer;
