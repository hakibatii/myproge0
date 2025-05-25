
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface StoryAdjustmentsProps {
  brightness: number;
  setBrightness: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
}

const StoryAdjustments = ({ brightness, setBrightness, contrast, setContrast }: StoryAdjustmentsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.adjustmentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>السطوع</Text>
          <Text style={styles.value}>{brightness}%</Text>
        </View>
        <Slider
          value={brightness}
          minimumValue={0}
          maximumValue={200}
          step={5}
          onValueChange={setBrightness}
          minimumTrackTintColor="#00A4A6"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#00A4A6"
          style={styles.slider}
        />
      </View>
      
      <View style={styles.adjustmentContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>التباين</Text>
          <Text style={styles.value}>{contrast}%</Text>
        </View>
        <Slider
          value={contrast}
          minimumValue={0}
          maximumValue={200}
          step={5}
          onValueChange={setContrast}
          minimumTrackTintColor="#00A4A6"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#00A4A6"
          style={styles.slider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24
  },
  adjustmentContainer: {
    gap: 8
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    color: '#1F2937'
  },
  value: {
    fontSize: 14,
    color: '#6B7280'
  },
  slider: {
    width: '100%',
    height: 40
  }
});

export default StoryAdjustments;
