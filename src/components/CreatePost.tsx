
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useToast } from '@/hooks/use-toast';
import { CreatePostProps } from './create-post/types';
import InitialPostForm from './create-post/InitialPostForm';
import ExpandedPostForm from './create-post/ExpandedPostForm';

const CreatePost = ({ user, onPostBoxClick }: CreatePostProps) => {
  const navigation = useNavigation();
  const { toast } = useToast();
  const [showFullForm, setShowFullForm] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVideo(null);
    }
  };

  const handleVideoPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setImage(null);
    }
  };

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    });

    if (result.type === 'success') {
      setFile(result);
    }
  };

  const handleAddHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const clearImage = () => setImage(null);
  const clearVideo = () => setVideo(null);
  const clearFile = () => setFile(null);

  const handleSubmit = () => {
    if (!content.trim() && !image && !video && !file) {
      toast({
        description: 'يجب كتابة محتوى أو إضافة صورة أو فيديو أو ملف للمنشور',
      });
      return;
    }

    // In a real app, send the post data to the server
    console.log('Post:', { content, image, video, file, hashtags });

    toast({
      description: 'تم نشر المنشور بنجاح',
    });

    // Reset form
    setContent('');
    setImage(null);
    setVideo(null);
    setFile(null);
    setHashtags([]);
    setShowFullForm(false);
  };

  return (
    <View style={styles.container}>
      {!showFullForm ? (
        <InitialPostForm user={user} onExpand={() => setShowFullForm(true)} />
      ) : (
        <ExpandedPostForm
          user={user}
          content={content}
          setContent={setContent}
          imagePreview={image}
          videoPreview={video}
          fileName={file?.name}
          hashtags={hashtags}
          newHashtag={newHashtag}
          setNewHashtag={setNewHashtag}
          handleAddHashtag={handleAddHashtag}
          handleRemoveHashtag={handleRemoveHashtag}
          handleImageChange={handleImagePick}
          handleVideoChange={handleVideoPick}
          handleFileChange={handleFilePick}
          clearImage={clearImage}
          clearVideo={clearVideo}
          clearFile={clearFile}
          onCancel={() => setShowFullForm(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default CreatePost;
