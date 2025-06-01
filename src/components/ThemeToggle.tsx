
import { Moon, Sun } from "lucide-react-native";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, theme === "light" && styles.activeButton]}
      >
        <Text style={styles.text}>off</Text>
        <Sun size={16} color={theme === "light" ? "white" : "gray"} />
      </TouchableOpacity>
      
      <Switch 
        value={theme === "dark"}
        onValueChange={toggleTheme}
      />
      
      <TouchableOpacity 
        style={[styles.button, theme === "dark" && styles.activeButton]}
      >
        <Moon size={16} color={theme === "dark" ? "white" : "gray"} />
        <Text style={styles.text}>on</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    padding: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: theme === "light" ? '#ef4444' : '#10b981',
  },
  text: {
    fontSize: 12,
    marginHorizontal: 4,
    fontWeight: '500',
  }
});

export default ThemeToggle;
