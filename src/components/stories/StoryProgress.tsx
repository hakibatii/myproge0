
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface StoryProgressProps {
  currentStoryIndex: number;
  totalStories: number;
}

const StoryProgress = ({ currentStoryIndex, totalStories }: StoryProgressProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalStories }).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.progressBar,
            index === currentStoryIndex ? styles.active :
            index < currentStoryIndex ? styles.completed : styles.inactive
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 4,
    padding: 4
  },
  progressBar: {
    height: 4,
    flex: 1,
    borderRadius: 2
  },
  active: {
    backgroundColor: '#FFFFFF'
  },
  completed: {
    backgroundColor: '#9CA3AF'
  },
  inactive: {
    backgroundColor: '#4B5563'
  }
});

export default StoryProgress;
