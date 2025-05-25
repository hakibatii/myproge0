import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  default: {
    backgroundColor: '#007AFF',
  },
  destructive: {
    backgroundColor: '#FF3B30',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#8E8E93',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  defaultText: {
    color: 'white',
  },
  destructiveText: {
    color: 'white',
  },
  outlineText: {
    color: '#000000',
  },
});

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline';
  children?: React.ReactNode;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = React.forwardRef<any, ButtonProps>(
  ({ variant = 'default', children, style, onPress, disabled }, ref) => {
    return (
      <TouchableOpacity
        style={[styles.button, styles[variant], style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        ref={ref}
      >
        <Text style={[styles.text, styles[`${variant}Text`]]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export { Button };
