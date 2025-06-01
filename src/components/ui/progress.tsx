import React from "react";
import { View, StyleSheet } from "react-native";

type ProgressProps = {
  value: number;
  className?: string;
};

const Progress = React.forwardRef<any, ProgressProps>(
  ({ value, className }, ref) => {
    return (
      <View 
        ref={ref}
        style={[styles.container, className]}
      >
        <View 
          style={[
            styles.progressBar, 
            { width: `${value}%` }
          ]} 
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: 16,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
});

export { Progress };
