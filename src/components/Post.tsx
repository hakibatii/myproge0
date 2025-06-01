
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Share2, MoreVertical, Check } from 'lucide-react-native';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigation } from '@react-navigation/native';
import PostTranslation from './post/PostTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import CommentButton from './comments/CommentButton';

interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified?: boolean;
  userType?: 'traveler' | 'organizer';
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise';
}

interface PostProps {
  id: string;
  user: User;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags: string[];
  currentUser: {
    id: string;
    isVerified: boolean;
  };
}

const Post = ({
  id,
  user,
  content,
  image,
  video,
  likes,
  comments,
  timestamp,
  hashtags,
  currentUser
}: PostProps) => {
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  // استبدال navigation.navigate بـ navigation من React Navigation
  const navigation = useNavigation();
  
  // تعديل handleUserProfileClick لاستخدام React Navigation
  const handleUserProfileClick = () => {
    navigation.navigate('Profile', { userId: user.id });
  };
  const { t } = useLanguage();

  // Use the translation functionality
  const { isTranslated, currentContent, currentHashtags, translationButton } = PostTranslation({
    originalContent: content,
    hashtags
  });

  const handleLike = () => {
    setLiked(!liked);
    toast({
      description: liked ? "تم إلغاء الإعجاب بالمنشور" : "تم الإعجاب بالمنشور",
      open: true
    });
  };

  const handleShare = () => {
    toast({
      description: "تم نسخ رابط المنشور",
      open: true
    });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
    },
    header: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    userName: {
      fontWeight: '500',
      color: '#000',
    },
    timestamp: {
      color: '#6b7280',
      fontSize: 12,
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    media: {
      width: '100%',
      height: 300,
    },
    actions: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#f3f4f6',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.userInfo} onPress={handleUserProfileClick}>
          <Image 
            source={{ uri: user.avatar }} 
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Translation button and more options */}
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          {translationButton}
          <TouchableOpacity>
            <MoreVertical size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Post Content */}
      <View style={styles.content}>
        <Text>{currentContent}</Text>
        {/* Hashtags rendering */}
      </View>
      
      {/* Post Media */}
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.media}
          resizeMode="cover"
        />
      )}
      
      {/* Post Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Heart 
            size={20} 
            color={liked ? '#ef4444' : '#6b7280'} 
            fill={liked ? '#ef4444' : 'none'}
          />
          <Text style={{marginLeft: 6}}>{likes + (liked ? 1 : 0)}</Text>
        </TouchableOpacity>
        
        <CommentButton 
          contentId={id}
          contentType="post"
          commentsCount={comments}
          title={`منشور ${user.name}`}
          contentPreview={content}
          contentImage={image}
          userName={user.name}
          userAvatar={user.avatar}
          userIsVerified={user.isVerified}
          className="rtl text-gray-600 dark:text-gray-300"
        />
        
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share2 size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
