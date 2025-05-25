import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Check } from "lucide-react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

const Checkbox = React.forwardRef<any, CheckboxProps>(
  ({ checked, onChange, disabled, className }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        disabled={disabled}
        onPress={() => onChange(!checked)}
        style={[
          styles.container,
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked && <Check size={16} color="white" />}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Checkbox };
