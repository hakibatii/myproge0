
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserAvatar } from "./UserAvatar";
import { UserInfo } from "./UserInfo";
import { SocialStats } from "./SocialStats";
import { ActionButtons } from "./ActionButtons";
import { ProfileCompletion } from "./ProfileCompletion";
import { BackgroundControls } from "./BackgroundControls";
import { UserProfileBannerProps } from "./types";

export const UserProfileBanner: React.FC<UserProfileBannerProps> = ({ 
  user: initialUser, 
  onMessage, 
  onFollow, 
  onFollowersClick, 
  onFollowingClick 
}) => {
  const [user, setUser] = useState(initialUser);
  
  const handleBackgroundChange = (newBackground: string) => {
    setUser({
      ...user,
      background: newBackground
    });
  };

  const backgroundStyle = user.background.startsWith('url(') 
    ? { backgroundImage: user.background, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: user.background };

  const isCurrentUser = user.id === "current-user";

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View style={styles.overlay}></View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <UserAvatar 
              avatar={user.avatar} 
              name={user.name} 
              isVerified={user.isVerified} 
              tripCount={user.tripCount} 
            />
          </View>
          <UserInfo 
            name={user.name} 
            city={user.city} 
            isVerified={user.isVerified} 
            rating={user.rating} 
          />
        </View>
        
        <Text style={styles.bio}>{user.bio}</Text>
        
        <View style={styles.statsAndActions}>
          <SocialStats 
            followersCount={user.followersCount} 
            followingCount={user.followingCount}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
          
          <ActionButtons onMessage={onMessage} onFollow={onFollow} />
        </View>
        
        {isCurrentUser && user.completionPercentage !== undefined && (
          <ProfileCompletion completionPercentage={user.completionPercentage} />
        )}
      </View>
      
      <BackgroundControls 
        background={user.background} 
        onBackgroundChange={handleBackgroundChange} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    padding: 20,
    position: 'relative',
    zIndex: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  avatarWrapper: {
    marginRight: 12
  },
  bio: {
    color: '#F3F4F6',
    fontSize: 14,
    marginBottom: 16
  },
  statsAndActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default UserProfileBanner;
