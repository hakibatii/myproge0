
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setVisible(!visible)}
        style={styles.trigger}
      >
        {children}
      </TouchableOpacity>
      
      {visible && (
        <View style={[
          styles.tooltip, 
          position === 'top' && styles.tooltipTop,
          position === 'bottom' && styles.tooltipBottom,
          position === 'left' && styles.tooltipLeft,
          position === 'right' && styles.tooltipRight,
        ]}>
          <Text style={styles.tooltipText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  trigger: {
    // Styles for the trigger element
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    zIndex: 100,
  },
  tooltipTop: {
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: -50 }],
    marginBottom: 8,
  },
  tooltipBottom: {
    top: '100%',
    left: '50%',
    transform: [{ translateX: -50 }],
    marginTop: 8,
  },
  tooltipLeft: {
    right: '100%',
    top: '50%',
    transform: [{ translateY: -50 }],
    marginRight: 8,
  },
  tooltipRight: {
    left: '100%',
    top: '50%',
    transform: [{ translateY: -50 }],
    marginLeft: 8,
  },
  tooltipText: {
    color: 'white',
    fontSize: 14,
  },
});

export { Tooltip };
