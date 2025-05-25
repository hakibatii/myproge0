
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HashtagProps } from './types';

const HashtagDisplay = ({ hashtags, onRemove }: HashtagProps) => {
  if (hashtags.length === 0) return null;
  
  return (
    <View style={styles.container}>
      {hashtags.map((tag) => (
        <View key={tag} style={styles.tag}>
          <Text style={styles.tagText}>#{tag}</Text>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => onRemove(tag)}
          >
            <Feather name="x" size={12} color="#6B7280" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tagText: {
    color: '#374151',
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 4,
    padding: 2,
  },
});

export default HashtagDisplay;
