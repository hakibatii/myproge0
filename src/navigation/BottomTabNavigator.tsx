import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Home, MapPin, Map, User, MessageSquare } from '@expo/vector-icons/Feather';
import { useLanguage } from '@/contexts/LanguageContext';

// استيراد الصفحات
import HomePage from '../pages/Home';
import CitiesPage from '../pages/Cities';
import ChatListPage from '../pages/ChatList';
import MapPage from '../pages/Map';
import AccountPage from '../pages/Account';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#4FD1C5', // morocco-turquoise
        tabBarInactiveTintColor: '#6B7280', // gray-500
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
              label = t('home');
              break;
            case 'Cities':
              label = t('cities');
              break;
            case 'ChatList':
              label = t('chat');
              break;
            case 'Map':
              label = t('map');
              break;
            case 'Account':
              label = t('account');
              break;
          }
          return (
            <Text style={[{
              fontSize: 12,
              color,
              textAlign: 'center',
              marginBottom: 4
            }]}>
              {label}
            </Text>
          );
        }
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Cities" component={CitiesPage} />
      <Tab.Screen name="ChatList" component={ChatListPage} />
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Account" component={AccountPage} />
    </Tab.Navigator>
  );
}