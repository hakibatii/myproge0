
import React, { useState } from 'react';
import { View, ScrollView, Modal, StyleSheet, Dimensions } from 'react-native';
import { UserStoriesProps } from '@/types/story';
import StoryItem from './stories/StoryItem';
import StoryViewer from './stories/StoryViewer';
import AddStoryButton from './stories/AddStoryButton';
import { useUserStories } from '@/hooks/useUserStories';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UserStories = ({ currentUser }: UserStoriesProps) => {
  const safeCurrentUser = currentUser || { 
    id: "guest-user", 
    isVerified: false,
    following: [] 
  };

  const {
    visibleStories,
    viewingStoryId,
    setViewingStoryId,
    selectedReaction,
    currentStoryIndex,
    handleOpenStory,
    handleAddStory,
    handleNextStory,
    handlePrevStory,
    handleReaction,
  } = useUserStories(safeCurrentUser);

  const viewingStory = visibleStories.find(s => s.id === viewingStoryId);
  const limitedStories = visibleStories.slice(0, 5);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AddStoryButton onPress={handleAddStory} />

        {limitedStories.map((story) => (
          <StoryItem
            key={story.id}
            id={story.id}
            userName={story.userName}
            userAvatar={story.userAvatar}
            isVerified={story.isVerified}
            onOpenStory={() => handleOpenStory(story.id)}
            size="small"
          />
        ))}
      </ScrollView>

      <Modal
        visible={viewingStoryId !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setViewingStoryId(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {viewingStoryId && viewingStory && (
              <StoryViewer
                story={viewingStory}
                currentStoryIndex={currentStoryIndex}
                totalStories={visibleStories.length}
                selectedReaction={selectedReaction}
                handlePrevStory={handlePrevStory}
                handleNextStory={handleNextStory}
                handleReaction={handleReaction}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: screenWidth,
    height: screenHeight * 0.8,
    backgroundColor: '#000000',
    overflow: 'hidden',
    borderRadius: 12
  }
});

export default UserStories;
