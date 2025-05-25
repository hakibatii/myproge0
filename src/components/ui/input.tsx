import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8E8E93',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export interface InputProps {
  style?: any;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  disabled?: boolean;
}

const Input = React.forwardRef<any, InputProps>(
  ({ style, placeholder, value, onChangeText, secureTextEntry, keyboardType, disabled }, ref) => {
    return (
      <TextInput
        style={[styles.input, disabled && styles.disabled, style]}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={!disabled}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
