
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { User } from './types';

interface InitialPostFormProps {
  user: User;
  onExpand: () => void;
}

const InitialPostForm = ({ user, onExpand }: InitialPostFormProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        {user.isVerified && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.input}
        onPress={onExpand}
      >
        <Text style={styles.inputText}>شارك تجربتك مع المتابعين...</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.sendButton}
        onPress={onExpand}
      >
        <Feather name="send" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputText: {
    color: '#6B7280',
    textAlign: 'right',
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#00A4A6',
    borderRadius: 20,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InitialPostForm;
