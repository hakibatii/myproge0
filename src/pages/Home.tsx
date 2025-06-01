import React, { useRef, useEffect } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStories from '@/components/UserStories';
import CreatePostSection from '@/components/home/CreatePostSection';
import HomeActionButtons from '@/components/home/HomeActionButtons';
import HeroSection from '@/components/home/HeroSection';
import NetworkStatus from '@/components/home/NetworkStatus';
import UserTypePosts from '@/components/home/UserTypePosts';
import { useHomePageState } from '@/hooks/useHomePageState';
import BannerImage from '@/components/home/BannerImage';

const Home = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { currentUser, handleRefresh } = useHomePageState();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userJson = await AsyncStorage.getItem('currentUser');
      if (!userJson) {
        navigation.navigate('Login');
      }
    };
    checkUser();
  }, [navigation]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await handleRefresh();
    setRefreshing(false);
  }, [handleRefresh]);

  return (
    <View style={styles.container}>
      <NetworkStatus />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <HeroSection />
          </View>

          <BannerImage />

          <HomeActionButtons currentUser={currentUser} />

          <View style={styles.section}>
            <UserStories currentUser={currentUser} />
          </View>

          <View style={styles.section}>
            <CreatePostSection currentUser={currentUser} />
          </View>
        </View>

        <View style={styles.postsContainer}>
          <UserTypePosts currentUser={currentUser} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: 16
  },
  section: {
    marginVertical: 16
  },
  postsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 96 // للتأكد من أن المحتوى لا يختفي تحت شريط التنقل
  }
});

export default Home;
