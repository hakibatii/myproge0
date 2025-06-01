
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MapPin, Map, User, MessageSquare } from "lucide-react-native";
import { useLanguage } from "@/contexts/LanguageContext";
import { View, Text, StyleSheet } from 'react-native';

// استيراد الشاشات
import HomeScreen from "../pages/Home";
import CitiesScreen from "../pages/Cities";
import ChatListScreen from "../pages/ChatList";
import MapScreen from "../pages/Map";
import AccountScreen from "../pages/Account";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = <Home size={size} color={color} />;
              break;
            case 'Cities':
              icon = <MapPin size={size} color={color} />;
              break;
            case 'ChatList':
              icon = <MessageSquare size={size} color={color} />;
              break;
            case 'Map':
              icon = <Map size={size} color={color} />;
              break;
            case 'Account':
              icon = <User size={size} color={color} />;
              break;
          }
          return icon;
        },
        tabBarLabel: ({ focused, color }) => {
          let label = '';
          switch (route.name) {
            case 'Home':
              label = t("home");
              break;
            case 'Cities':
              label = t("cities");
              break;
            case 'ChatList':
              label = t("chat");
              break;
            case 'Map':
              label = t("map");
              break;
            case 'Account':
              label = t("account");
              break;
          }
          return <Text style={[styles.label, { color }]}>{label}</Text>;
        },
        tabBarActiveTintColor: '#4FD1C5', // morocco-turquoise
        tabBarInactiveTintColor: '#6B7280', // gray-500
        tabBarStyle: styles.tabBar
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cities" component={CitiesScreen} />
      <Tab.Screen name="ChatList" component={ChatListScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 64,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  }
});

export default NavBar;
