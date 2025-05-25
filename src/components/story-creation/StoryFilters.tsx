
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FILTERS } from "@/pages/CreateStory";

const { width: screenWidth } = Dimensions.get('window');
const FILTER_SIZE = (screenWidth - 48) / 4; // 4 columns with padding

interface StoryFiltersProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  mediaPreview: string | null;
}

const StoryFilters = ({ selectedFilter, setSelectedFilter, mediaPreview }: StoryFiltersProps) => {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => (
        <TouchableOpacity
          key={filter.name}
          style={[
            styles.filterButton,
            selectedFilter === filter.name && styles.selectedFilter
          ]}
          onPress={() => setSelectedFilter(filter.name)}
        >
          <View style={styles.previewContainer}>
            {mediaPreview && (
              <Image
                source={{ uri: mediaPreview }}
                style={[styles.preview, { filter: filter.filter || undefined }]}
              />
            )}
          </View>
          <Text style={styles.label}>{filter.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 8
  },
  filterButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8
  },
  selectedFilter: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#00A4A6'
  },
  previewContainer: {
    width: FILTER_SIZE,
    height: FILTER_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  label: {
    fontSize: 12,
    textAlign: 'center'
  }
});

export default StoryFilters;
