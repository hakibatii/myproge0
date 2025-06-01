
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface StoryItemProps {
  id: string;
  userName: string;
  userAvatar: string;
  isVerified: boolean;
  onOpenStory: () => void;
  size?: "normal" | "small";
}

const StoryItem = ({ 
  id, 
  userName, 
  userAvatar, 
  isVerified, 
  onOpenStory,
  size = "normal" 
}: StoryItemProps) => {
  const avatarSize = size === "small" ? 56 : 64;
  const borderWidth = size === "small" ? 2 : 3;
  const fontSize = size === "small" ? 10 : 12;
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onOpenStory}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#F6AD55', '#0D9488', '#F6E05E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBorder, { width: avatarSize + 4, height: avatarSize + 4 }]}
      >
        <View 
          style={[
            styles.avatarContainer,
            { 
              width: avatarSize,
              height: avatarSize,
              borderWidth: borderWidth
            }
          ]}
        >
          <Image
            source={{ uri: userAvatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        {isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        )}
      </LinearGradient>
      <Text 
        style={[styles.userName, { fontSize }]}
        numberOfLines={1}
      >
        {userName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 4
  },
  gradientBorder: {
    borderRadius: 100,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  avatarContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: 0,
    backgroundColor: '#3B82F6',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold'
  },
  userName: {
    width: 64,
    textAlign: 'center',
    color: '#1F2937',
    textAlign: 'right'
  }
});

export default StoryItem;
