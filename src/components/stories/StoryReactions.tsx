
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { EMOJI_REACTIONS } from "@/constants/storyConstants";
import { Story } from "@/types/story";

interface StoryReactionsProps {
  story: Story;
  selectedReaction: string | null;
  handleReaction: (reaction: string) => void;
}

const StoryReactions = ({ story, selectedReaction, handleReaction }: StoryReactionsProps) => {
  return (
    <>
      {/* Emoji reactions */}
      <View style={styles.reactionsContainer}>
        <View style={styles.reactionsBar}>
          {EMOJI_REACTIONS.map((reaction) => (
            <TouchableOpacity
              key={reaction.name}
              onPress={() => handleReaction(reaction.name)}
              style={[
                styles.reactionButton,
                selectedReaction === reaction.name && styles.selectedReaction,
                selectedReaction && selectedReaction !== reaction.name && styles.disabledReaction
              ]}
              disabled={selectedReaction && selectedReaction !== reaction.name}
            >
              <Text style={styles.emojiText}>{reaction.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Reaction counts */}
      {story.reactions && Object.keys(story.reactions).length > 0 && (
        <View style={styles.countsContainer}>
          <View style={styles.countsBar}>
            {Object.entries(story.reactions).map(([reaction, count]) => (
              <View key={reaction} style={styles.countItem}>
                <Text style={styles.emojiText}>
                  {EMOJI_REACTIONS.find(r => r.name === reaction)?.emoji}
                </Text>
                <Text style={styles.countText}>{count}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  reactionsContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  reactionsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16
  },
  reactionButton: {
    padding: 4
  },
  selectedReaction: {
    transform: [{ scale: 1.25 }],
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20
  },
  disabledReaction: {
    opacity: 0.5
  },
  emojiText: {
    fontSize: 20
  },
  countsContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  countsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 8
  },
  countItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 14
  }
});

export default StoryReactions;
