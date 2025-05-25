import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const CaptureIDPhoto = ({ onSave }: { onSave: (encryptedUri: string) => void }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const encryptData = async (data: string) => {
    // هنا يمكنك إضافة تشفير فعلي لو أردت، حالياً نخزنها مشفرة في SecureStore
    // لكن SecureStore بحد ذاته يحفظها مشفرة في الجهاز.
    await SecureStore.setItemAsync('encryptedIDPhoto', data);
    return data;
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('صلاحيات مرفوضة', 'يجب السماح بالوصول إلى الكاميرا.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      // تشفير URI الصورة وتخزينه
      const encryptedUri = await encryptData(uri);
      onSave(encryptedUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>المرحلة 2: التقط صورة من بطاقتك الوطنية</Text>
      <Button title="التقط صورة البطاقة" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.imagePreview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
});

export default CaptureIDPhoto;